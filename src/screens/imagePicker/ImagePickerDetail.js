import React, { useState } from 'react';
import { Alert } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import ContainerView from '../../UI/views/ContainerView';
import FooterView from '../../UI/views/footer/FooterView';
import TextButton from '../../UI/buttons/TextButton';
import ImagePickerButton from '../../UI/buttons/ImagePickerButton';

import { SIGNUP_STEP_2, COMPOSE } from '../../config/constants';

import styles from '../styles';

const ImagePickerDetail = ({ route, navigation }) => {
  const { assets } = route.params;
  const isProfileImageSelect =
    route.params.fromScreen && route.params.fromScreen === SIGNUP_STEP_2;

  const [selection, setSelection] = useState([]);

  // NOTE: TO STORE VIDEO FILES, IT'S LOCALURI MUST BE UPLOADED TO SERVER
  // TO STORE IMAGES, IT'S URI CAN BE UPLOADED TO SERVER
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

  return (
    <ContainerView hasGradient headerHeight={route.params.headerHeight}>
      <ScrollView contentContainerStyle={styles.imagePickerContentContainer}>
        {assets.map((item, index) => (
          <ImagePickerButton
            key={item.id}
            disabled={isProfileImageSelect && item.mediaType === 'video'}
            onPress={() => handleImagePress(index)}
            uri={item.uri}
            selected={selection.some((el) => el.index === index)}
            mediaType={item.mediaType}
            videoDuration={item.duration}
          />
        ))}
      </ScrollView>
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
    </ContainerView>
  );
};

ImagePickerDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImagePickerDetail;
