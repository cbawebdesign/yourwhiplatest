import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { CustomText as Text, BODY_FONT, TITLE_FONT } from './CustomText';

import styles from './styles';

const EmptyListText = ({ text }) => (
  <View style={styles.container}>
    <Text
      text="Nothing to see here"
      fontFamily={TITLE_FONT}
      style={styles.title}
    />
    <Text text={text} fontFamily={BODY_FONT} style={styles.body} />
  </View>
);

EmptyListText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EmptyListText;
