import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import IconButton from '../buttons/IconButton';
import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { profileInfoViewStyles as styles } from './styles';

// USED FOR FUTURE UPDATE WITH PRIVATE CHAT FEATURE
// const chatIcon = require('../../../assets/icons/comments.png');
const locationIcon = require('../../../assets/icons/location.png');
const editIcon = require('../../../assets/icons/edit.png');

const ProfileInfoView = ({
  name,
  location,
  email,
  description,
  onEditDescription,
  isCurrentUser,
}) => (
  <View style={styles.container}>
    <View style={styles.headerView}>
      <Text text={name} fontFamily={TITLE_FONT} style={styles.name} />
    </View>
    <View style={styles.descriptionView}>
      <Text
        text={description}
        fontFamily={BODY_FONT}
        style={styles.description}
      />
      {isCurrentUser && (
        <View style={styles.editIcon}>
          <IconButton icon={editIcon} onPress={onEditDescription} size={14} />
        </View>
      )}
    </View>
    <View style={styles.doubleLabelView}>
      <View style={[styles.labelItem, styles.locationView]}>
        <Image source={locationIcon} style={styles.locationIcon} />
        <Text
          text={location || 'Nowhereland'}
          fontFamily={TITLE_FONT}
          style={styles.label}
        />
      </View>
      <View style={[styles.labelItem, styles.emailView]}>
        <Text text="@" fontFamily={TITLE_FONT} style={styles.emailIcon} />
        <Text
          text={email}
          fontFamily={TITLE_FONT}
          numberOfLines={2}
          style={[styles.label, styles.email]}
        />
      </View>
    </View>
  </View>
);

ProfileInfoView.defaultProps = {
  location: 'None provided',
  description: '',
};

ProfileInfoView.prototype = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string,
  email: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ProfileInfoView;
