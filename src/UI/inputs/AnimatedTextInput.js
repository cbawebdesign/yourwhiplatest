import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, Animated, TextInput, TouchableOpacity } from 'react-native';

import { CustomText as Text, BODY_FONT } from '../text/CustomText';

import { authInputOptionsPropType } from '../../config/propTypes';

import { animatedTextInputStyles as styles } from './styles';

// DISPLAYS TEXTINPUT BLOCKS WITH GROW/SHRINK ANIMATION
// Takes the following props:
// onChangeText (used to keep track of text input changes)
// active (triggers the grow/shrink animation)
// if above positioned AnimatedTextInput block is active)
// icon (used to display the input icon)
// placeholder (used to display the placeholder)
// value (sets the value of the TextInput component)
// isPassword (sets input to secret (dots) for password input)
// keyboardType (sets the keyboard type)
// onKeyboardHide (sets the input block to inactive (original) state)

const nameIcon = require('../../../assets/icons/name.png');
const emailIcon = require('../../../assets/icons/email.png');
const passwordIcon = require('../../../assets/icons/password.png');
const birthdayIcon = require('../../../assets/icons/birthday.png');
const genderIcon = require('../../../assets/icons/gender.png');
const locationIcon = require('../../../assets/icons/location.png');

const ANIMATION_DURATION = 300;

const AnimatedTextInput = ({ options }) => {
  const inputRef = useRef(null);
  const containerScale = useRef(new Animated.Value(styles.$containerSmall))
    .current;

  const containerStyles = [
    styles.container,
    {
      transform: [{ scale: containerScale }],
    },
    options.active ? styles.$activeShadow : styles.$inactiveShadow,
  ];

  const renderIcon = (type) => {
    switch (type) {
      case 'FIRST_NAME':
      case 'LAST_NAME':
        return nameIcon;
      case 'EMAIL':
        return emailIcon;
      case 'PASSWORD':
      case 'CODE':
        return passwordIcon;
      case 'BIRTHDAY':
        return birthdayIcon;
      case 'GENDER':
        return genderIcon;
      case 'LOCATION':
        return locationIcon;
      default:
        return null;
    }
  };

  const setToActive = () => {
    Animated.spring(containerScale, {
      toValue: styles.$containerLarge,
      useNativeDriver: true,
    }).start();
  };

  const setToInactive = () => {
    Animated.spring(containerScale, {
      toValue: styles.$containerSmall,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (options.active) {
      setToActive();

      if (!options.hasModalInput) {
        inputRef.current.focus();
      }
    } else {
      setToInactive();
    }
  }, [options]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => options.onPress(options.type)}
    >
      <Animated.View
        style={containerStyles}
        pointerEvents={options.active ? 'auto' : 'none'}
      >
        <Image style={styles.icon} source={renderIcon(options.type)} />
        <Text
          text={options.placeholder}
          style={styles.placeholder}
          fontFamily={BODY_FONT}
        />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={options.value || ''}
          onChangeText={options.onChangeText}
          secureTextEntry={options.isPassword}
          keyboardType={options.keyboardType}
          onSubmitEditing={options.removeKeyboard}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

AnimatedTextInput.propTypes = {
  options: authInputOptionsPropType.isRequired,
};

export default AnimatedTextInput;
