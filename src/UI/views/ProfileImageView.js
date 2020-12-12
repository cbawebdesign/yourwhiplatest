import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { API_HOST } from '../../config/constants';
import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import { profileImageViewStyles as styles } from './styles';

// DISPLAYS THE PROFILE IMAGE
// Takes the following props:
// onPress (to navigate to user profile screen)
// profileImage (sets the profile image)
// name (sets the initials if no profileImage provided)
// number (sets the photo count in gallery screen)
// isLarge (renders a large image view in the Profile screen)
// onPressDisabled (to disable navigation to Profile screen)

const ProfileImageView = ({
  onPress,
  profileImage,
  name,
  number,
  isLarge,
  onPressDisabled,
}) => {
  const getInitials = (nameString) => {
    const names = nameString.split(' ');
    let initials = nameString[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={onPressDisabled}
      activeOpacity={0.6}
    >
      <LinearGradient
        style={[styles.gradientView, isLarge && styles.$largeGradientView]}
        colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
        start={[0, 0]}
        end={[1, 1]}
      >
        {profileImage ? (
          <Image
            style={[styles.profileImage, isLarge && styles.$largeImage]}
            source={profileImage && { uri: profileImage }}
          />
        ) : (
          <Text
            text={name ? getInitials(name) : number}
            fontFamily={TITLE_FONT}
            style={[styles.initials, isLarge && styles.$largeInitials]}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

ProfileImageView.defaultProps = {
  profileImage: null,
  onPress: () => null,
  number: '',
  isLarge: false,
  onPressDisabled: false,
};

ProfileImageView.propTypes = {
  onPress: PropTypes.func,
  profileImage: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
  isLarge: PropTypes.bool,
  onPressDisabled: PropTypes.bool,
};

export default ProfileImageView;
