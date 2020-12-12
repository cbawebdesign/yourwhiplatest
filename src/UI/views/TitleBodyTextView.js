import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { titleBodyTextViewStyles as styles } from './styles';

// DISPLAYS A TITLE WITH BODY TEXT
// Takes the following props:
// title (displays the title)
// body (displays the body text)

const TitleBodyTextView = ({ title, body }) => (
  <View style={styles.container}>
    <Text text={title} fontFamily={TITLE_FONT} style={styles.title} />
    <Text text={body} fontFamily={BODY_FONT} style={styles.body} />
  </View>
);

TitleBodyTextView.prototype = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default TitleBodyTextView;
