import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import EmptyListText from '../../UI/text/EmptyListText';
import PeopleListItem from '../../UI/lists/PeopleListItem';

import { followUserPress } from '../../actions/profile';

import styles from './styles';

const Following = ({ navigation, currentUser }) => {
  const dispatch = useDispatch();

  const handleProfilePress = (user) => {
    navigation.navigate('Profile', {
      user,
    });
  };

  const handleFollowPress = (user) => {
    dispatch(followUserPress(user));
  };

  const renderEmptyListText = () => (
    <EmptyListText text="You are currently not following anyone." />
  );

  useEffect(() => {}, [currentUser]);

  if (!currentUser) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        contentContainerStyle={{ paddingBottom: useSafeArea().bottom }}
        data={currentUser.following}
        animationType={AnimationType.Dive}
        renderItem={({ item }) => (
          <PeopleListItem
            disableSwipe
            item={item}
            onProfilePress={() => handleProfilePress(item)}
            onFollowPress={() => handleFollowPress(item)}
          />
        )}
        ListEmptyComponent={renderEmptyListText()}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

Following.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.user;

  return {
    currentUser: user,
  };
};

export default connect(mapStateToProps)(Following);
