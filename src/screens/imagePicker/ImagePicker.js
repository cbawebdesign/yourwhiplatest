import React, { useEffect, useState } from 'react';
import { Alert } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import ContainerView from '../../UI/views/ContainerView';
import FooterView from '../../UI/views/footer/FooterView';
import TextButton from '../../UI/buttons/TextButton';
import ImagePickerButton from '../../UI/buttons/ImagePickerButton';
import AlbumButton from '../../UI/buttons/AlbumButton';

import { SIGNUP_STEP_2, COMPOSE, MEDIA } from '../../config/constants';

import styles from '../styles';

const ImagePicker = ({ route, navigation }) => {
  const isProfileImageSelect =
    route.params.fromScreen && route.params.fromScreen === SIGNUP_STEP_2;

  const [albums, setAlbums] = useState(null);
  const [assets, setAssets] = useState(null);
  const [selection, setSelection] = useState([]);

  const getPhotoAlbumPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Sorry, you must provide photo album permissions to select an image!'
      );
    } else {
      openMediaLibrary();
    }
  };

  const openMediaLibrary = async () => {
    try {
      const albumsResult = await MediaLibrary.getAlbumsAsync();

      if (albumsResult.length > 0) {
        setAlbums(albumsResult);
      } else {
        const assetsResult = await MediaLibrary.getAssetsAsync({
          mediaType: [
            MediaLibrary.MediaType.photo,
            MediaLibrary.MediaType.video,
          ],
        });
        if (assetsResult) {
          setAssets(assetsResult.assets);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // NOTE: TO STORE VIDEO FILES, IT'S LOCALURI MUST BE UPLOADED TO SERVER
  // TO STORE IMAGES, IT'S URI CAN BE UPLOADED TO SERVER
  // NOTE 2: WHEN USED TO SELECT PROFILE IMAGE, ONLY IMAGES CAN BE SELECTED
  // AND ONLY ONE IMAGE CAN BE SELECTED AT A TIME
  const handleImagePress = async (index) => {
    const isSelected = selection.some((item) => item.index === index);

    if (!isProfileImageSelect && isSelected) {
      const newSelection = selection.filter((item) => item.index !== index);
      setSelection(newSelection);
    } else {
      const localUri = await (
        await MediaLibrary.getAssetInfoAsync(assets[index])
      ).localUri;

      if (isProfileImageSelect) {
        const selectionCopy = [...selection];
        selectionCopy[0] = {
          index,
          file: assets[index],
          localUri,
        };
        setSelection(selectionCopy);
      } else {
        const newSelection = selection.concat({
          index,
          file: assets[index],
          localUri,
        });
        setSelection(newSelection);
      }
    }
  };

  const handleSelect = () => {
    if (route.params && route.params.fromScreen === SIGNUP_STEP_2) {
      navigation.navigate(SIGNUP_STEP_2, { photo: selection[0] });
    } else {
      navigation.navigate(COMPOSE, { selection });
    }
  };

  const handleGetImages = async (id) => {
    try {
      const assetsResult = await MediaLibrary.getAssetsAsync({
        album: id,
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
      });
      if (assetsResult) {
        navigation.navigate(MEDIA, {
          ...route.params,
          assets: assetsResult.assets,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderAlbums = (items) =>
    items.map((item, index) => (
      <AlbumButton
        key={index.toString()}
        album={item}
        onPress={() => handleGetImages(item.id)}
      />
    ));

  const renderImages = (items) =>
    items.map((item, index) => (
      <ImagePickerButton
        disabled={isProfileImageSelect && item.mediaType === 'video'}
        key={item.id}
        onPress={() => handleImagePress(index)}
        uri={item.uri}
        selected={selection.some((el) => el.index === index)}
        mediaType={item.mediaType}
        videoDuration={item.duration}
      />
    ));

  useEffect(() => {
    getPhotoAlbumPermissions();
  }, []);

  if (!albums && !assets) {
    return <ContainerView hasGradient />;
  }

  return (
    <ContainerView hasGradient headerHeight={route.params.headerHeight}>
      <ScrollView contentContainerStyle={styles.imagePickerContentContainer}>
        {assets ? renderImages(assets) : renderAlbums(albums)}
      </ScrollView>
      {!albums && (
        <FooterView backgroundColor="white">
          <TextButton
            text="Select"
            onPress={handleSelect}
            color="black"
            uppercase
            opacity={1}
            disabled={selection.length === 0}
          />
        </FooterView>
      )}
    </ContainerView>
  );
};

ImagePicker.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImagePicker;
