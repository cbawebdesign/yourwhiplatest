import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { View, FlatList, Keyboard } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { debounce } from 'throttle-debounce';

import ContainerView from '../UI/views/ContainerView';
import HeaderSearchBarView from '../UI/views/header/HeaderView';
import SearchListItem from '../UI/lists/SearchListItem';
import EmptyListText from '../UI/text/EmptyListText';

import { search } from '../actions/user';

import styles from './styles';

const Search = ({ route, navigation, userFeed }) => {
  const paddingTop = useSafeArea().top;
  const dispatch = useDispatch();

  const handleSearchThrottled = useRef(
    debounce(500, (text) => dispatch(search(text)))
  ).current;

  const [searchInput, setSearchInput] = useState('');

  const handleUserPress = (item) => {
    navigation.navigate('Profile', {
      ...route.params,
      user: item,
    });
  };

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderEmptyListText = () => (
    <EmptyListText
      text={
        userFeed.length === 0 && searchInput.length > 0
          ? 'Unfortunately, search rendered no results...'
          : 'Search for people by entering a name or username'
      }
    />
  );

  return (
    <ContainerView
      touchEnabled
      headerHeight={paddingTop}
      onPress={handleRemoveKeyboard}
    >
      <HeaderSearchBarView
        onSearchChange={(text) => {
          setSearchInput(text);
          handleSearchThrottled(text);
        }}
        searchValue={searchInput}
        onDeletePress={() => setSearchInput('')}
      />
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={userFeed}
        renderItem={({ item }) => (
          <SearchListItem item={item} onPress={() => handleUserPress(item)} />
        )}
        keyExtractor={(item) => item._id.toString()}
        keyboardShouldPersistTaps="always"
        ListEmptyComponent={renderEmptyListText()}
      />
    </ContainerView>
  );
};

Search.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  userFeed: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => {
  const { usersSearchFeed } = state.user;

  return {
    userFeed: usersSearchFeed,
  };
};

export default connect(mapStateToProps)(Search);
