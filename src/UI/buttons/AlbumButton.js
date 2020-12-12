import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import { albumButtonStyles as styles } from './styles';

const AlbumButton = ({ album, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <View style={styles.container}>
      <Text
        text={album.title}
        fontFamily={TITLE_FONT}
        numberOfLines={1}
        style={styles.title}
      />
      <Text
        text={album.assetCount}
        fontFamily={TITLE_FONT}
        style={styles.assetCount}
      />
    </View>
  </TouchableOpacity>
);

AlbumButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  album: PropTypes.instanceOf(Object).isRequired,
};

export default AlbumButton;
