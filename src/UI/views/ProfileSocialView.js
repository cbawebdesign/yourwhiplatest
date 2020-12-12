import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import { profileSocialViewStyles as styles } from './styles';

const ProfileSocialView = ({ socialData }) => (
  <View style={styles.container}>
    <View style={styles.labelValueView}>
      <Text text="LIKES" fontFamily={TITLE_FONT} style={styles.label} />
      <Text
        text={socialData.likesCount || 0}
        fontFamily={TITLE_FONT}
        style={styles.value}
      />
    </View>
    <View style={styles.labelValueView}>
      <Text text="FOLLOWERS" fontFamily={TITLE_FONT} style={styles.label} />
      <Text
        text={socialData.followersCount || 0}
        fontFamily={TITLE_FONT}
        style={styles.value}
      />
    </View>
    <View style={styles.labelValueView}>
      <Text text="POSTS" fontFamily={TITLE_FONT} style={styles.label} />
      <Text
        text={socialData.postsCount || 0}
        fontFamily={TITLE_FONT}
        style={styles.value}
      />
    </View>
  </View>
);

ProfileSocialView.propTypes = {
  socialData: PropTypes.shape({
    likesCount: PropTypes.number.isRequired,
    followersCount: PropTypes.number.isRequired,
    postsCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfileSocialView;
