import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeArea } from 'react-native-safe-area-context';

import { footerViewStyles as styles } from './styles';

// DISPLAYS THE FOOTER VIEW
// Takes the following props:
// hasGradient (renders a gradient background color)
// backgroundColor (renders a non-gradient background color)
// keyboardActive (registers whether the keyboard is active
// if the view contains a TextInput child view)

const FooterView = ({
  children,
  hasGradient,
  backgroundColor,
  keyboardActive,
  height,
}) => {
  const paddingBottom = useSafeArea().bottom;

  const HEIGHT = height + (keyboardActive ? 0 : paddingBottom);
  const BG_COLOR = hasGradient
    ? [styles.$gradientColorFrom, styles.$gradientColorTo]
    : [backgroundColor, backgroundColor];

  return (
    <LinearGradient colors={BG_COLOR} start={[0, 0]} end={[1, 1]}>
      <View
        style={{
          height: HEIGHT,
        }}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

FooterView.defaultProps = {
  hasGradient: false,
  backgroundColor: '#020202',
  keyboardActive: false,
  height: 60,
};

FooterView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  hasGradient: PropTypes.bool,
  backgroundColor: PropTypes.string,
  keyboardActive: PropTypes.bool,
  height: PropTypes.number,
};

export default FooterView;
