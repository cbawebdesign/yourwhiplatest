import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { debounce } from 'throttle-debounce';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import ContainerView from '../../UI/views/ContainerView';
import PhotoModal from '../../UI/modals/PhotoModal';
import ExploreListItem from '../../UI/lists/ExploreListItem';
import SelectionModal from '../../UI/modals/SelectionModal';
import EmptyListText from '../../UI/text/EmptyListText';
import { CustomText as Text, BODY_FONT } from '../../UI/text/CustomText';

import { onDeleteHelper } from '../../helpers/socialHelpers';
import { isCloseToBottom } from '../../helpers/scrollHelpers';

import { deletePost, resetDeletePost } from '../../actions/posts';
import { getFlaggedPostsFeed, unflagPost } from '../../actions/flagged';
import { deleteAccount } from '../../actions/auth';

import { exploreItemPropType, userPropType } from '../../config/propTypes';
import { PAGINATION_LIMIT } from '../../config/constants';

import styles from '../styles';

// DISPLAYS THE FLAGGED SCREEN
// Applies the following props:
// route (contains params with all the 'compose' information
// created in the Compose screen)
// navigation (to navigate to the Profile screen on pressing
// the profile image)
// currentUser (contains all data of loged-in user)
// homeFeed (list of feed items ('posts'))
// commentsUpdateCheck (contains post ID if a comment was added
// inside the Comment screen, else 'null')

const FlaggedPosts = ({
  route,
  navigation,
  flaggedPostsFeed,
  endOfList,
  currentUser,
  commentsUpdateCheck,
  newLikeCheck,
  deletedPost,
  fetching,
}) => {
  const dispatch = useDispatch();
  const paddingBottom = useSafeArea().bottom;

  const [feed, setFeed] = useState(null);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [warningType, setWarningType] = useState({
    deletePost: false,
    deleteUser: false,
  });
  const [showImage, setShowImage] = useState(false);
  const [imageShown, setImageShown] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [viewableItems, setViewableItems] = useState([]);

  const postOptions = {
    title: 'Post Options',
    body: 'Select one of the options below',
    buttons: [
      {
        title: 'Unflag post',
        subtitle: 'The post does not break community guidelines',
        onPress: () => {
          dispatch(unflagPost(currentItem._id));
          setShowPostOptions(false);
        },
      },
      {
        title: 'Delete post',
        subtitle: 'The post will no longer be visible to other users',
        onPress: () => {
          setWarningType({ deletePost: true, deleteUser: false });
          setShowPostOptions(false);
        },
      },
      {
        title: `Delete user ${currentItem && currentItem.createdBy.firstName}`,
        subtitle: 'The user account will be removed from app',
        onPress: () => {
          setWarningType({ deletePost: false, deleteUser: true });
          setShowPostOptions(false);
        },
      },
      {
        title: 'Cancel',
        onPress: () => setShowPostOptions(false),
      },
    ],
  };

  const warningModalOptions = {
    title: warningType.deletePost
      ? 'Delete Post'
      : warningType.deleteUser
      ? 'Delete User'
      : '',
    body: 'Are you sure you want to perform this action?',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Cancel',
        onPress: () => {
          setWarningType({ deletePost: false, deleteUser: false });
        },
      },
      {
        title: 'OK',
        onPress: () => {
          if (warningType.deletePost) {
            const updatedFeed = onDeleteHelper(feed, currentItem);
            setFeed(updatedFeed);
          } else if (warningType.deleteUser) {
            dispatch(deleteAccount(currentItem.createdBy._id, 'FLAGGED'));
          }
          setWarningType({ deletePost: false, deleteUser: false });
        },
      },
    ],
  };

  const handlePress = (item) => {
    navigation.navigate('ExploreDetail', {
      ...route.params,
      parentId: item._id,
    });
  };

  const handleProfilePress = (type, item) => {
    let user;

    if (type === 'SHARED_ITEM_USER' && item.sharedImage) {
      user = item.sharedImage.createdBy;
    } else if (type === 'SHARED_ITEM_USER' && item.sharedPost) {
      user = item.sharedPost.createdBy;
    } else {
      user = item.createdBy;
    }

    navigation.navigate('Profile', {
      ...route.params,
      user,
    });
  };

  const handlePostOptionsPress = (item) => {
    setCurrentItem(item);
    setShowPostOptions(true);
  };

  const handleDeletePost = (fromScreen) => {
    const deletedPostId =
      deletedPost && currentItem ? deletedPost.postId : currentItem._id;

    // DISPATCH 'DELETEPOST' ONLY FOR THIS SCREEN
    // DETAIL SCREEN HANDLES ITS OWN DISPATCH 'DELETEPOST'
    if (fromScreen !== 'EXPLORE_DETAIL') {
      dispatch(deletePost({ postId: deletedPostId, fromScreen }));
    }

    // REMOVE POST FROM LOCAL FEED STATE
    const feedCopy = [...feed];
    const updatedFeed = feedCopy.filter((item) => item._id !== deletedPostId);
    setFeed(updatedFeed);

    setShowPostOptions(false);
  };

  const onViewRef = useRef((itemsInView) => {
    if (itemsInView.viewableItems !== viewableItems) {
      setViewableItems(itemsInView.viewableItems);
    }
  }).current;
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    .current;

  const handleRefresh = () => {
    dispatch(getFlaggedPostsFeed(0, PAGINATION_LIMIT));
  };

  const handleLoadMore = (count) => {
    dispatch(getFlaggedPostsFeed(count, PAGINATION_LIMIT));
  };
  const handleLoadMoreThrottled = useRef(debounce(500, handleLoadMore)).current;

  const renderItem = ({ item }) => (
    <ExploreListItem
      item={item}
      currentUser={currentUser}
      onPress={() => {
        if (item.sharedImage) {
          // SHOW IMAGE MODAL FOR SHARED IMAGES
          setCurrentItem(item.sharedImage);
          setShowImage(true);
          setImageShown([item.sharedImage]);
        } else {
          handlePress(item.sharedPost || item);
        }
      }}
      onCommentsPress={() => null}
      onLikePress={() => null}
      onSharePress={() => null}
      onProfilePress={(type) => handleProfilePress(type, item)}
      onOptionsPress={() => handlePostOptionsPress(item)}
      onDeletePress={() => handleDeletePost('EXPLORE')}
      itemInView={viewableItems.some(
        (viewable) => viewable.item._id === item._id
      )}
    />
  );

  const renderEmptyListText = () => (
    <EmptyListText text="There are no flagged posts at this moment." />
  );

  const renderListFooterComponent = () => (
    <Text
      text={endOfList && feed.length > 0 ? "That's all folks!" : ''}
      fontFamily={BODY_FONT}
      style={styles.endOfList}
    />
  );

  useEffect(() => {
    // FETCH POSTS ON SCREEN LOAD
    dispatch(getFlaggedPostsFeed(0, PAGINATION_LIMIT));
  }, [currentUser]);

  useEffect(() => {
    // HANDLE POST DELETE ACTION IN EXPLORE DETAIL SCREEN
    if (
      deletedPost &&
      (deletedPost.fromScreen === 'EXPLORE_DETAIL' ||
        deletedPost.fromScreen === 'PROFILE')
    ) {
      handleDeletePost('EXPLORE_DETAIL');
    }

    // RESET GLOBAL STATE 'DELETEDPOST' IN CASE OF NEW POST DELETE ACTION
    dispatch(resetDeletePost());
  }, [deletedPost]);

  useEffect(() => {
    if (deletedPost) {
      return;
    }

    setFeed(flaggedPostsFeed);
  }, [route, flaggedPostsFeed, commentsUpdateCheck, newLikeCheck]);

  if (!feed || !currentUser) {
    return <View />;
  }

  return (
    <ContainerView touchEnabled={false}>
      <SelectionModal
        showModal={showPostOptions}
        onModalDismissPress={() => setShowPostOptions(false)}
        options={postOptions}
      />
      <SelectionModal
        showModal={warningType.deletePost || warningType.deleteUser}
        onModalDismissPress={() =>
          setWarningType({ deletePost: false, deleteUser: false })
        }
        options={warningModalOptions}
      />
      <PhotoModal
        showModal={showImage}
        showIndex={0}
        items={imageShown}
        currentUser={currentUser}
        onSwipeDown={() => setShowImage(false)}
        onLikePress={() => null}
        onCommentPress={() => null}
        onSharePress={() => null}
        onShareOptionsPress={() => null}
      />
      <AnimatedFlatList
        contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
        data={feed}
        renderItem={renderItem}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.Dive
            : AnimationType.None
        }
        scrollIndicatorInsets={{ right: 1 }}
        onScroll={({ nativeEvent }) => {
          if (fetching || endOfList) return;

          if (isCloseToBottom(nativeEvent)) {
            handleLoadMoreThrottled(flaggedPostsFeed.length);
          }
        }}
        ListEmptyComponent={renderEmptyListText()}
        ListFooterComponent={renderListFooterComponent()}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef}
        onRefresh={handleRefresh}
        refreshing={fetching}
        keyExtractor={(item) => item._id}
      />
    </ContainerView>
  );
};

FlaggedPosts.defaultProps = {
  currentUser: null,
};

FlaggedPosts.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: userPropType,
  flaggedPostsFeed: PropTypes.arrayOf(exploreItemPropType).isRequired,
  endOfList: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { deletedPost } = state.posts;
  const { flaggedPostsFeed, endOfList, fetching } = state.flagged;
  const { user } = state.user;
  const { commentsUpdateCheck } = state.comments;
  const { newLikeCheck } = state.likes;

  return {
    flaggedPostsFeed,
    endOfList,
    currentUser: user,
    commentsUpdateCheck,
    newLikeCheck,
    deletedPost,
    fetching,
  };
};

export default connect(mapStateToProps)(FlaggedPosts);
