import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';
import { blockButtonStyles as styles } from './styles';

const BlockButton = ({ onPress, text, fontSize, color }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradientView}
        colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <Text
          text={text}
          fontFamily={TITLE_FONT}
          style={[styles.title, { fontSize, color }]}
        />
      </LinearGradient>
    </View>
  </TouchableOpacity>
);

BlockButton.defaultProps = {
  fontSize: 10,
  color: '#020202',
};

BlockButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string,
};

export default BlockButton;
