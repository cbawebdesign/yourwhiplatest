import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { debounce } from 'throttle-debounce';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';
import OneSignal from 'react-native-onesignal';

import ContainerView from '../../UI/views/ContainerView';
import PhotoModal from '../../UI/modals/PhotoModal';
import ExploreListItem from '../../UI/lists/ExploreListItem';
import ShareModal from '../../UI/modals/ShareModal';
import SelectionModal from '../../UI/modals/SelectionModal';
import EmptyListText from '../../UI/text/EmptyListText';
import { CustomText as Text, BODY_FONT } from '../../UI/text/CustomText';

import {
  onLikePressHelper,
  onLikeSharedImageHelper,
  onNewCommentHelper,
  onSharedImageNewCommentHelper,
  onShareHelper,
  onSocialMediaShare,
  onSharedImageShareHelper,
  onDeleteHelper,
  showOneSignalStatus,
} from '../../helpers/socialHelpers';
import { isCloseToBottom } from '../../helpers/scrollHelpers';

import {
  getHomeFeed,
  deletePost,
  resetDeletePost,
  hidePost,
  hidePostsByUser,
  updateVideoViewCount,
} from '../../actions/posts';
import { reportPost } from '../../actions/flagged';
import { likePostPress, resetNewLikeCheck } from '../../actions/likes';
import { sharePost, shareImage } from '../../actions/shares';
import { likeImagePress } from '../../actions/detail';
import { resetCommentUpdateCheck } from '../../actions/comments';
import { resetDeepLinkSlug } from '../../actions/general';
import {
  updateNotificationSettings,
  displayNotificationsModal,
} from '../../actions/user';

import {
  exploreItemPropType,
  userPropType,
  commentPropType,
} from '../../config/propTypes';
import {
  COMPOSE,
  PAGINATION_LIMIT,
  VIDEO_VIEW_DURATION_FOR_VIEW,
} from '../../config/constants';

import styles from '../styles';

let notificationsEnabled; // NOT GREAT, BUT ONESIGNAL NOT RETURNIG CORRECT VALUES IN SIMULATOR

const Explore = ({
  route,
  navigation,
  homeFeed,
  endOfList,
  currentUser,
  commentsUpdateCheck,
  newLikeCheck,
  deletedPost,
  fetching,
  success,
  deepLinkSlug,
  onesignalConsent,
}) => {
  const dispatch = useDispatch();
  const paddingBottom = useSafeArea().bottom;

  const [feed, setFeed] = useState(null);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageShown, setImageShown] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [shareMessage, setShareMessage] = useState('');
  const [viewableItems, setViewableItems] = useState([]);

  const postOptions = {
    title: 'Post Options',
    body: 'Select one of the options below',
    buttons: [
      {
        title: 'Edit post',
        subtitle: 'Change how this post is displayed to other users',
        onPress: () => {
          navigation.navigate(COMPOSE, {
            editPost: true,
            item: currentItem,
          });
          setShowPostOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id !== currentUser._id,
      },
      {
        title: 'Delete post',
        subtitle: 'The post will no longer be visible to other users',
        onPress: () => {
          const updatedFeed = onDeleteHelper(feed, currentItem);

          setFeed(updatedFeed);
          setShowPostOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id !== currentUser._id,
      },
      {
        title: 'Hide post',
        subtitle: 'The post will no longer show in your feed',
        onPress: () => {
          dispatch(hidePost(currentItem._id));
          setShowPostOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id === currentUser._id,
      },
      {
        title: `Hide all activity by ${
          currentItem && currentItem.createdBy.firstName
        }`,
        subtitle: 'Your feed will hide all activity by this user',
        onPress: () => {
          dispatch(hidePostsByUser(currentItem.createdBy._id));
          setShowPostOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id === currentUser._id,
      },
      {
        title: `Report to admins`,
        subtitle:
          'Flag this post as inappropriate or not folowing community guidelines',
        onPress: () => {
          dispatch(reportPost(currentItem._id));
          setShowPostOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id === currentUser._id,
      },
      {
        title: 'Cancel',
        onPress: () => setShowPostOptions(false),
      },
    ],
  };

  const successModalOptions = {
    title: 'Post Successfully Reported',
    body: success && success.reportPostSuccess ? success.reportPostSuccess : '',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'OK',
        onPress: () => {
          setShowSuccessModal(false);
          dispatch({ type: 'RESET_SUCCESS' });
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

  const handleLikePress = (item, type) => {
    if (type === 'IMAGE') {
      // UPDATE IMAGE LOCAL STATE
      const updatedImage = onLikePressHelper(currentUser._id, item);
      setImageShown(updatedImage);

      // UPDATE FEED LOCAL STATE
      const updatedFeed = onLikeSharedImageHelper(feed, updatedImage[0]);
      setFeed(updatedFeed);

      // DISPATCH TO SERVER
      dispatch(likeImagePress(item._id));
    } else {
      // UPDATE FEED LOCAL STATE
      const updatedFeed = onLikePressHelper(currentUser._id, feed, item);
      setFeed(updatedFeed);

      // DISPATCH TO SERVER
      dispatch(likePostPress({ fromScreen: 'EXPLORE', parentId: item._id }));
    }
  };

  const handleCommentsPress = (item, type = 'POST') => {
    if (type === 'SHARED_IMAGE') {
      setShowImage(false);
    }

    navigation.navigate('Comments', {
      type,
      fromScreen: 'EXPLORE',
      post: item,
    });
  };

  const handleSharePress = async (item) => {
    setShowShareModal(true);
    setCurrentItem(item);
  };

  const handleShareAction = async (type = 'POST') => {
    if (type === 'IMAGE') {
      dispatch(
        shareImage({
          sharedImageId: imageShown[0]._id,
          activityType: 'IN_APP_SHARE',
          description: shareMessage,
        })
      );

      const result = onSharedImageShareHelper(
        currentUser._id,
        feed,
        imageShown[0]
      );
      setFeed(result);
    } else {
      // DISPATCH TO SERVER
      dispatch(
        sharePost({
          parentId: currentItem._id,
          sharedPostId: currentItem._id,
          activityType: 'IN_APP_SHARE',
          description: shareMessage,
        })
      );

      // UPDATE FEED LOCAL STATE
      const result = await onShareHelper(currentUser._id, feed, currentItem);
      setFeed(result);
    }

    setShareMessage('');
    setShowShareModal(false);
  };

  const handleShareOptionsPress = async () => {
    // PROCESS SHARE WITH SOCIAL MEDIA
    // AND UPDATE FEED LOCAL STATE
    const result = await onSocialMediaShare(currentUser._id, feed, currentItem);

    if (result === 'dismissedAction') {
      setShowShareModal(false);

      return;
    }

    if (result.share && result.share.activityType) {
      dispatch(
        sharePost({
          parentId: currentItem._id,
          activityType: result.share.activityType,
        })
      );

      setFeed(result.feed);
    } else if (result.share.action === 'sharedAction') {
      dispatch(
        sharePost({ parentId: currentItem._id, activityType: 'SOCIAL_SHARE' })
      );

      setFeed(result.feed);
    }

    setShowShareModal(false);
  };

  const handlePostOptionsPress = (item) => {
    setCurrentItem(item);
    setShowPostOptions(true);
  };

  const handleDeletePost = (fromScreen) => {
    const deletedPostId = deletedPost ? deletedPost.postId : currentItem._id;

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

  const updateLikeButtonView = () => {
    const updatedFeed = onLikePressHelper(
      currentUser._id,
      feed,
      null,
      newLikeCheck
    );
    setFeed(updatedFeed);

    dispatch(resetNewLikeCheck());
  };

  const updateCommentButtonView = () => {
    // IN CASE OF SHARED iMAGE, UPDATE THE 'SHAREDIMAGE'
    // KEY ON THE FEED ITEM
    if (commentsUpdateCheck.type === 'SHARED_IMAGE') {
      const updatedFeed = onSharedImageNewCommentHelper(
        feed,
        imageShown[0],
        commentsUpdateCheck.comments
      );
      setFeed(updatedFeed);
    } else {
      // ADD NEW COMMENT ON RETURN FROM 'COMMENT'
      const updatedFeed = onNewCommentHelper(
        currentUser._id,
        feed,
        commentsUpdateCheck
      );

      setFeed(updatedFeed);
    }

    dispatch(resetCommentUpdateCheck());
  };

  const onViewRef = useRef((itemsInView) => {
    if (itemsInView.viewableItems !== viewableItems) {
      setViewableItems(itemsInView.viewableItems);
    }
  }).current;
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    .current;

  const handleRefresh = () => {
    dispatch(getHomeFeed(0, PAGINATION_LIMIT));
  };

  const handleLoadMore = (count) => {
    dispatch(getHomeFeed(count, PAGINATION_LIMIT));
  };
  const handleLoadMoreThrottled = useRef(debounce(500, handleLoadMore)).current;

  const getNotificationPermissions = async (updatePermissions) => {
    if (!currentUser) return;

    OneSignal.getPermissionSubscriptionState(async (status) => {
      try {
        const result = await showOneSignalStatus(
          status,
          currentUser,
          updatePermissions
        );

        switch (result) {
          case 'SUBSCRIBED':
          case 'SUBSCRIBED_AFTER_PROMPT':
            if (notificationsEnabled) return;
            dispatch(updateNotificationSettings(true));
            notificationsEnabled = true;
            break;
          case 'ANDROID_INIT_SUBSCRIBED':
          case 'ANDROID_RE_INIT_SUBSCRIBED':
            dispatch(updateNotificationSettings(true));
            notificationsEnabled = true;
            break;
          case 'UNSUBSCRIBED':
          case 'UNSUBSCRIBED_AFTER_PROMPT':
            if (!notificationsEnabled) return;
            dispatch(updateNotificationSettings(false));
            notificationsEnabled = false;
            break;
          case 'RE_PROMPT':
            dispatch(displayNotificationsModal(true));
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('error', error);
      }
    });
  };

  let viewCountUpdated = useRef(false).current;
  const handleUpdateVideoViewCount = (data, item) => {
    if (!viewCountUpdated && data.currentTime >= VIDEO_VIEW_DURATION_FOR_VIEW) {
      dispatch(updateVideoViewCount(item._id));
      viewCountUpdated = true;
    }
  };

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
      onCommentsPress={() => handleCommentsPress(item)}
      onLikePress={() => handleLikePress(item)}
      onSharePress={() => handleSharePress(item)}
      onProfilePress={(type) => handleProfilePress(type, item)}
      onOptionsPress={() => handlePostOptionsPress(item)}
      onDeletePress={() => handleDeletePost('EXPLORE')}
      itemInView={viewableItems.some(
        (viewable) => viewable.item._id === item._id
      )}
      onVideoProgress={(data) => handleUpdateVideoViewCount(data, item)}
      videoViewCount={item.viewCount > 0 ? item.viewCount : null}
    />
  );

  const renderEmptyListText = () => (
    <EmptyListText text="Start following people to see their posts, or disable the 'show posts based on my interest' Setting." />
  );

  const renderListFooterComponent = () => (
    <Text
      text={endOfList && feed.length > 0 ? "That's all folks!" : ''}
      fontFamily={BODY_FONT}
      style={styles.endOfList}
    />
  );

  useEffect(() => {
    if (!currentUser) return;

    // FETCH POSTS ON SCREEN LOAD
    // REFETCH AFTER CURRENTUSER EDITS PROFILE IMAGE
    if (currentUser) {
      dispatch(getHomeFeed(0, PAGINATION_LIMIT));
    }

    // UPDATE NOTIFICATION FROM SETTINGS SCREEN
    if (
      currentUser &&
      currentUser.settings &&
      currentUser.settings.enableNotifications !== notificationsEnabled
    ) {
      if (currentUser.settings.enableNotifications && !onesignalConsent) {
        dispatch(displayNotificationsModal(true));
      }
      getNotificationPermissions(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (onesignalConsent) {
      OneSignal.provideUserConsent(true);
    }
    const timer = setTimeout(() => {
      getNotificationPermissions(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [onesignalConsent]);

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

    // EXPLORE INIT
    setFeed(homeFeed);

    // DO UPDATE CHECK AFTER RETURNING FROM COMMENT SCREEN
    if (
      commentsUpdateCheck !== null &&
      (commentsUpdateCheck.fromScreen === 'EXPLORE' ||
        commentsUpdateCheck.fromScreen === 'EXPLORE_DETAIL' ||
        commentsUpdateCheck.fromScreen === 'PROFILE')
    ) {
      updateCommentButtonView();
    }

    // DO UPDATE CHECK AFTER RETURNING FROM EXPLORE DETAIL SCREEN
    if (
      newLikeCheck !== null &&
      (newLikeCheck.fromScreen === 'EXPLORE_DETAIL' ||
        newLikeCheck.fromScreen === 'PROFILE')
    ) {
      updateLikeButtonView();
    }
  }, [route, homeFeed, commentsUpdateCheck, newLikeCheck]);

  useEffect(() => {
    if (success && success.reportPostSuccess) {
      setShowSuccessModal(success && success.reportPostSuccess.length > 0);
    }
  }, [success]);

  useEffect(() => {
    if (deepLinkSlug) {
      navigation.navigate('ExploreDetail', {
        ...route.params,
        parentId: deepLinkSlug,
      });
    }

    return () => {
      dispatch(resetDeepLinkSlug());
    };
  }, [deepLinkSlug]);

  useEffect(() => {
    getNotificationPermissions(false);
  }, []);

  if (!feed || !currentUser) {
    return <View />;
  }

  return (
    <ContainerView
      touchEnabled={false}
      headerHeight={route.params.headerHeight}
    >
      <SelectionModal
        showModal={showPostOptions}
        onModalDismissPress={() => setShowPostOptions(false)}
        options={postOptions}
      />
      <SelectionModal
        showModal={showSuccessModal}
        onModalDismissPress={() => setShowSuccessModal(false)}
        options={successModalOptions}
      />

      {showShareModal && (
        <ShareModal
          showModal={showShareModal}
          animationType="slide"
          onSharePress={handleShareAction}
          onShareOptionsPress={handleShareOptionsPress}
          onModalDismissPress={() => setShowShareModal(false)}
          onChangeText={(text) => setShareMessage(text)}
          descriptionValue={shareMessage}
        />
      )}
      <PhotoModal
        showModal={showImage}
        showIndex={0}
        items={imageShown}
        currentUser={currentUser}
        onSwipeDown={() => setShowImage(false)}
        onLikePress={(item) => handleLikePress(item, 'IMAGE')}
        onCommentPress={(item) => handleCommentsPress(item, 'SHARED_IMAGE')}
        onDescriptionChange={(text) => setShareMessage(text)}
        onSharePress={(index) => setCurrentItem(imageShown[index])}
        onShare={() => handleShareAction('IMAGE')}
        onShareOptionsPress={handleShareOptionsPress}
        shareDescriptionValue={shareMessage}
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
            handleLoadMoreThrottled(homeFeed.length);
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

Explore.defaultProps = {
  currentUser: null,
  commentsUpdateCheck: null,
  newLikeCheck: null,
  success: null,
  deepLinkSlug: null,
  deletedPost: null,
};

Explore.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: userPropType,
  homeFeed: PropTypes.arrayOf(exploreItemPropType).isRequired,
  endOfList: PropTypes.bool.isRequired,
  commentsUpdateCheck: PropTypes.shape({
    fromScreen: PropTypes.string,
    id: PropTypes.string.isRequired,
    commentId: PropTypes.string,
    type: PropTypes.string,
    action: PropTypes.string,
    comments: PropTypes.arrayOf(commentPropType),
  }),
  newLikeCheck: PropTypes.shape({
    fromScreen: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  deletedPost: PropTypes.shape({
    fromScreen: PropTypes.string,
  }),
  onesignalConsent: PropTypes.bool.isRequired,
  success: PropTypes.shape({
    reportPostSuccess: PropTypes.string,
  }),
  deepLinkSlug: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { homeFeed, endOfList, deletedPost, fetching } = state.posts;
  const { success } = state.flagged;
  const { user, onesignalConsent } = state.user;
  const { commentsUpdateCheck } = state.comments;
  const { newLikeCheck } = state.likes;
  const { deepLinkSlug } = state.general;

  return {
    homeFeed,
    endOfList,
    currentUser: user,
    commentsUpdateCheck,
    newLikeCheck,
    deletedPost,
    fetching,
    success,
    deepLinkSlug,
    onesignalConsent,
  };
};

export default connect(mapStateToProps)(Explore);
