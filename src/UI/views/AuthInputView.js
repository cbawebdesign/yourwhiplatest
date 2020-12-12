import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import AnimatedTextInput from '../inputs/AnimatedTextInput';

import { authInputOptionsPropType } from '../../config/propTypes';

import { authViewStyles as styles } from './styles';

// DISPLAYS THE INPUT BLOCKS FOR LOGIN + SIGNUP SCREENS
// Takes the following props:
// onStartPress (handles the 'next' button action)
// onInputPress (handles the input block press action)
// onInputChange (handles the text input changes)
// onKeyboardHide (sets the input block to inactive (original) state)
// isHelp (hides the password input block)
// inputOptions (array with all input data per block)

const AuthInputView = ({ inputOptions }) => (
  <View style={styles.container}>
    {inputOptions.map((options, index) => (
      <AnimatedTextInput key={index.toString()} options={options} />
    ))}
  </View>
);

AuthInputView.defaultProps = {
  signup: false,
  isHelp: false,
  isCode: false,
};

AuthInputView.prototype = {
  nputOptions: PropTypes.arrayOf(authInputOptionsPropType).isRequired,
};

export default AuthInputView;
