import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import * as Font from 'expo-font';

const MontserratRegular = require('../../../assets/fonts/Montserrat-Regular.ttf');
const ChivoRegular = require('../../../assets/fonts/Chivo-Regular.ttf');

// DISPLAYS THE CUSTOM FONTS USED THROUGHOUT THE APP
// Takes the following props:
// text (renders the text string)
// style (renders additional text styling)
// fontFamily (renders one of 3 custom fonts)

export const TITLE_FONT = 'Montserrat-Regular';
export const BODY_FONT = 'Chivo-Regular';

export const CustomText = ({ text, style, fontFamily, numberOfLines }) => {
  let mounted = true;

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      switch (fontFamily) {
        case TITLE_FONT:
          await Font.loadAsync({
            'Montserrat-Regular': MontserratRegular,
          });
          break;
        case BODY_FONT:
          await Font.loadAsync({
            'Chivo-Regular': ChivoRegular,
          });
          break;
        default:
          break;
      }

      if (mounted) {
        setFontLoaded(true);
      }
    };

    loadFont();

    return () => {
      mounted = false;
    };
  }, []);

  if (!fontLoaded) {
    return null;
  }

  switch (fontFamily) {
    case TITLE_FONT:
      return (
        <Text
          style={[{ fontFamily: TITLE_FONT, letterSpacing: 3 }, style]}
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
      );
    case BODY_FONT:
      return (
        <Text
          style={[{ fontFamily: BODY_FONT }, style]}
          numberOfLines={numberOfLines}
        >
          {text}
        </Text>
      );
    default:
      return <Text>{text}</Text>;
  }
};

CustomText.defaultProps = {
  style: {},
  numberOfLines: 0,
  text: '',
};

CustomText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontFamily: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  numberOfLines: PropTypes.number,
};

export default { CustomText, TITLE_FONT, BODY_FONT };
