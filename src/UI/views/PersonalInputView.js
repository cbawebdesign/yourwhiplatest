import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import AnimatedTextInput from '../inputs/AnimatedTextInput';

import { authInputOptionsPropType } from '../../config/propTypes';

import { personalInputViewStyles as styles } from './styles';

// DISPLAYS THE INPUT BLOCKS FOR SECOND SIGNUP SCREEN
// Takes the following props:
// inputOptions (contains all layout and data props)

const PersonalInputView = ({ inputOptions }) => {
  return (
    <View style={styles.container}>
      {inputOptions.map((options, index) => (
        <AnimatedTextInput key={index.toString()} options={options} />
      ))}
    </View>
  );
};

PersonalInputView.prototype = {
  inputOptions: PropTypes.arrayOf(authInputOptionsPropType).isRequired,
};

export default PersonalInputView;
