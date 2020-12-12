import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import { textButtonStyles as styles } from './styles';

// DISPLAYS A TEXT BUTTON
// Takes the following props:
// onPress (handles the button press action)
// text (sets the button title)
// fontSize (sets the title font size)
// color (sets the title color)
// uppercase (displays the title in uppercase; default 'false')
// textShadow (shows / hides the text backdrop shadow; default 'false')

const TextButton = ({
  onPress,
  text,
  fontSize,
  color,
  uppercase,
  opacity,
  textShadow,
  disabled,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8} disabled={disabled}>
    <View style={styles.container}>
      <Text
        text={text}
        fontFamily={TITLE_FONT}
        style={[
          styles.title,
          {
            fontSize,
            color,
            textTransform: uppercase ? 'uppercase' : 'none',
            opacity: disabled ? 0.2 : opacity || 0.5,
            textShadowColor: textShadow
              ? 'rgba(0, 0, 0, 1)'
              : 'rgba(0, 0, 0, 0)',
          },
        ]}
      />
    </View>
  </TouchableOpacity>
);

TextButton.defaultProps = {
  fontSize: 12,
  color: '#fff',
  uppercase: false,
  opacity: 0.5,
  textShadow: false,
};

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string,
  uppercase: PropTypes.bool,
  opacity: PropTypes.number,
  textShadow: PropTypes.bool,
};

export default TextButton;
