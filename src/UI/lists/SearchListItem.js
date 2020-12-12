import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import { searchListItemStyles as styles } from './styles';

const searchIcon = require('../../../assets/icons/search.png');

const SearchListItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
    <View style={styles.container}>
      <Image source={searchIcon} style={styles.icon} />
      <Text
        text={item.name.toUpperCase()}
        fontFamily={TITLE_FONT}
        style={styles.title}
      />
    </View>
  </TouchableOpacity>
);

SearchListItem.propTypes = {
  item: shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default SearchListItem;
