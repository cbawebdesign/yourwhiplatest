import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, Animated } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import { useKeyboardState } from '../../config/hooks';

import { logoViewStyles as styles } from './styles';

const Logo = require('../../../assets/images/logo.png');

const ANIMATION_DURATION = 300;

const LogoView = ({ title, active }) => {
  const { onKeyboardShow } = useKeyboardState();
  const logoViewScale = useRef(new Animated.Value(styles.$viewScaleLarge))
    .current;

  const scale = logoViewScale.interpolate({
    inputRange: [0, 1],
    outputRange: [styles.$viewScaleLarge, 0.65],
  });

  const keyboardShow = () => {
    if (!active) return;

    Animated.timing(logoViewScale, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const keyboardHide = () => {
    if (!active) return;

    Animated.timing(logoViewScale, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (onKeyboardShow) {
      keyboardShow();
    } else {
      keyboardHide();
    }
  }, [onKeyboardShow]);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text text={title} fontFamily={TITLE_FONT} style={styles.title} />
    </Animated.View>
  );
};

LogoView.defaultProps = {
  active: true,
};

LogoView.prototype = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default LogoView;
