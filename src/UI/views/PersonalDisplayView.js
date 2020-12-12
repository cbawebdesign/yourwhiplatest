import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import IconButton from '../buttons/IconButton';

import { personalDisplayViewStyles as styles } from './styles';

const photoIcon = require('../../../assets/icons/photo.png');

const PersonalDisplayView = ({ onPhotoPress, profileImage }) => {
  const hasProfileImage =
    (profileImage &&
      (profileImage.length > 0 ||
        (profileImage && profileImage.uri && profileImage.uri.length > 1))) ||
    (profileImage && profileImage.localUri && profileImage.localUri.length > 1);

  const getUri = () => {
    if (profileImage.uri && profileImage.uri.length > 1) {
      return profileImage.uri;
    }

    if (profileImage.localUri && profileImage.localUri.length > 1) {
      return profileImage.localUri;
    }

    return profileImage;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={styles.innerContainer}>
          {hasProfileImage && (
            <Image
              style={styles.image}
              source={{
                uri: getUri(),
              }}
              resizeMode="cover"
            />
          )}
          <View style={styles.photoButton}>
            <IconButton icon={photoIcon} onPress={onPhotoPress} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

PersonalDisplayView.defaultProps = {
  profilePhoto: {},
};

PersonalDisplayView.prototype = {
  onPhotoPress: PropTypes.func.isRequired,
  profileImage: PropTypes.shape({
    uri: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

export default PersonalDisplayView;
