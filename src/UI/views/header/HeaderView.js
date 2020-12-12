import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

// DISPLAYS CUSTOM HEADER SEARCHBAR VIEW USED IN THE SEARCH SCREEN
// Takes the following props:
// onSearchChange (handles the TextInput change in the search bar)
// searchValue (controls the search input value)
// onDeletePress (handles the emptying of the search TextInput action)

const searchIcon = require('../../../../assets/icons/search.png');
const deleteIcon = require('../../../../assets/icons/close.png');

const HeaderSearchBarView = ({
  onSearchChange,
  searchValue,
  onDeletePress,
}) => {
  const inputRef = useRef();

  return (
    <View style={styles.container}>
      <Image source={searchIcon} style={styles.searchIcon} />
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={searchValue}
        onChangeText={onSearchChange}
        placeholder="Search"
        autoFocus
        placeholderTextColor={styles.$placeholderColor}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDeletePress}
        activeOpacity={0.9}
      >
        <View style={styles.deleteButtonView}>
          <Image source={deleteIcon} style={styles.deleteIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

HeaderSearchBarView.defaultProps = {
  searchValue: '',
  onDeletePress: () => null,
  onSearchChange: () => null,
};

HeaderSearchBarView.propTypes = {
  searchValue: PropTypes.string,
  onDeletePress: PropTypes.func,
  onSearchChange: PropTypes.func,
};

export default HeaderSearchBarView;
