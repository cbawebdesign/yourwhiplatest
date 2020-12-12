import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import EmptyListText from '../../UI/text/EmptyListText';
import PeopleListItem from '../../UI/lists/PeopleListItem';

import { followUserPress } from '../../actions/profile';
import { removeUserPress } from '../../actions/user';

import styles from './styles';

const Recommended = ({
  navigation,
  recommendedFeed,
  currentUser,
  fetching,
}) => {
  const dispatch = useDispatch();

  const handleProfilePress = (user) => {
    navigation.navigate('Profile', {
      user,
    });
  };

  const handleRemovePress = (user) => {
    dispatch(removeUserPress(user));
  };

  const handleFollowPress = (user) => {
    dispatch(followUserPress(user));
  };

  const renderEmptyListText = () => (
    <EmptyListText text="Users are recommended to you based on your interests. Currently, there are no users that share your interests." />
  );

  useEffect(() => {}, [recommendedFeed, currentUser]);

  if (!currentUser) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: useSafeArea().bottom },
        ]}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.Dive
            : AnimationType.None
        }
        focused={!fetching}
        data={recommendedFeed}
        renderItem={({ item }) => (
          <PeopleListItem
            item={item}
            following={currentUser.following.some(
              (user) => user._id.toString() === item._id.toString()
            )}
            onProfilePress={() => handleProfilePress(item)}
            onDeletePress={() => handleRemovePress(item)}
            onFollowPress={() => handleFollowPress(item)}
          />
        )}
        ListEmptyComponent={renderEmptyListText()}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

Recommended.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { recommendedFeed, user, fetching } = state.user;

  return {
    recommendedFeed,
    currentUser: user,
    fetching,
  };
};

export default connect(mapStateToProps)(Recommended);
