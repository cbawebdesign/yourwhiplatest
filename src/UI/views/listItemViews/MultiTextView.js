import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { CustomText, BODY_FONT } from '../../text/CustomText';

import { multiTextViewStyles as styles } from './styles';

// DISPLAYS A LIST OF STRINGS THAT CAN BE RENDERED IN
// VARYING COLORS AND/OR STYLES
// Takes the following props:
// items (an array of strings)

const MultiTextView = ({ items }) => (
  <View>
    <Text>
      {items.map((item, index) => (
        <CustomText
          key={index.toString()}
          text={`${item.text} `}
          fontFamily={BODY_FONT}
          style={[styles.text, { opacity: item.isLink ? 1 : 0.5 }]}
        />
      ))}
    </Text>
  </View>
);

MultiTextView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      isLink: PropTypes.bool.isRequired,
      navigateTo: PropTypes.string,
    })
  ).isRequired,
};

export default MultiTextView;
