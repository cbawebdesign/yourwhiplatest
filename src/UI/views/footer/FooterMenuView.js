import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../../text/CustomText';

import { footerMenuViewStyles as styles } from './styles';

const FooterMenuView = ({ onSavePress, onCancelPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSavePress} activeOpacity={0.9}>
        <View style={styles.buttonView}>
          <Text
            text="Save to photo library"
            fontFamily={TITLE_FONT}
            style={styles.buttonTitle}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancelPress} activeOpacity={0.9}>
        <View style={styles.buttonView}>
          <Text
            text="Cancel"
            fontFamily={TITLE_FONT}
            style={styles.buttonTitle}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

FooterMenuView.propTypes = {
  onSavePress: PropTypes.func.isRequired,
  onCancelPress: PropTypes.func.isRequired,
};

export default FooterMenuView;
