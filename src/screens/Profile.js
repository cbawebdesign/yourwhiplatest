import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { debounce } from 'throttle-debounce';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import IconLabelButton from '../UI/buttons/IconLabelButton';
import ContainerView from '../UI/views/ContainerView';
import ProfileImageView from '../UI/views/ProfileImageView';
import ProfileInfoView from '../UI/views/ProfileInfoView';
import ProfileSocialView from '../UI/views/ProfileSocialView';
import FooterView from '../UI/views/footer/FooterView';
import ExploreListItem from '../UI/lists/ExploreListItem';
import SelectionModal from '../UI/modals/SelectionModal';
import TextInputModal from '../UI/modals/TextInputModal';
import ShareModal from '../UI/modals/ShareModal';
import { CustomText as Text, BODY_FONT } from '../UI/text/CustomText';

import {
  onLikePressHelper,
  onNewCommentHelper,
  onDeleteHelper,
  onSharedImageShareHelper,
  onShareHelper,
  onSocialMediaShare,
} from '../helpers/socialHelpers';
import { isCloseToBottom } from '../helpers/scrollHelpers';

import { getProfile, followUserPress } from '../actions/profile';
import { likePostPress } from '../actions/likes';
import { deletePost, resetDeletePost } from '../actions/posts';
import { resetCommentUpdateCheck } from '../actions/comments';
import { editProfile } from '../actions/user';
import { sharePost, shareImage } from '../actions/shares';

import {
  commentPropType,
  userPropType,
  exploreItemPropType,
} from '../config/propTypes';
import { PAGINATION_LIMIT } from '../config/constants';

import styles from './styles';

const checkmarkIcon = require('../../assets/icons/checkmark.png');

const Profile = ({
  route,
  navigation,
  userData,
  socialData,
  currentUser,
  commentsUpdateCheck,
  deletedPost,
  endOfList,
  fetching,
}) => {
  const dispatch = useDispatch();
  const paddingBottom = useSafeArea().bottom;
  const footerButtonRef = useRef(null);

  let following =
    currentUser &&
    currentUser.following.some(
      (item) => item._id.toString() === route.params.user._id.toString()
    );

  const [user, setUser] = useState(null);
  const [feed, setFeed] = useState([]);
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showInputModal, setShowInputModal] = useState(false);
  const [description, setDescription] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [imageShown, setImageShown] = useState([]);
  const [viewableItems, setViewableItems] = useState([]);

  const postOptions = {
    title: 'Delete post',
    body: 'Are you sure you want to delete this post?',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Cancel',
        onPress: () => setShowPostOptions(false),
      },
      {
        title: 'Delete',
        onPress: () => {
          // FEED UPDATED LOCALLY
          const updatedFeed = onDeleteHelper(feed, currentItem);

          setFeed(updatedFeed);
          setShowPostOptions(false);
        },
      },
    ],
  };

  const handlePostPress = (item) => {
    navigation.navigate('ExploreDetail', {
      ...route.params,
      parentId: item._id,
    });
  };

  const handleProfilePress = (item) => {
    let userProfile;

    if (item.sharedImage) {
      userProfile = item.sharedImage.createdBy;
    } else if (item.sharedPost) {
      userProfile = item.sharedPost.createdBy;
    } else {
      userProfile = item.createdBy;
    }

    navigation.navigate('Profile', {
      ...route.params,
      user: userProfile,
    });
  };

  const handleLikePress = (item) => {
    dispatch(likePostPress({ fromScreen: 'PROFILE', parentId: item._id }));

    const updatedFeed = onLikePressHelper(currentUser._id, feed, item);
    setFeed(updatedFeed);
  };

  const handleCommentsPress = (item) => {
    navigation.navigate('Comments', {
      type: 'POST',
      fromScreen: 'PROFILE',
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

    if (result.share.activityType) {
      dispatch(
        sharePost({
          parentId: currentItem._id,
          activityType: result.share.activityType,
        })
      );

      setFeed(result.feed);
    } else if (result.share.action === 'sharedAction') {
      dispatch(sharePost({ parentId: currentItem._id }));

      setFeed(result.feed);
    }

    setShowShareModal(false);
  };

  const handleFollowPress = () => {
    following = !following;
    footerButtonRef.current.setNativeProps({
      style: { opacity: following ? 1 : 0.1 },
    });
    dispatch(followUserPress(user));
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

  const updateCommentButtonView = () => {
    // ADD NEW COMMENT ON RETURN FROM 'COMMENT'
    const updatedFeed = onNewCommentHelper(
      currentUser._id,
      userData.profileFeed,
      commentsUpdateCheck
    );

    dispatch(resetCommentUpdateCheck());
    setFeed(updatedFeed);
  };

  const onViewRef = useRef((itemsInView) => {
    if (itemsInView.viewableItems !== viewableItems) {
      setViewableItems(itemsInView.viewableItems);
    }
  }).current;
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    .current;

  const renderListHeader = () => (
    <View
      style={[
        styles.innerContainer,
        { backgroundColor: styles.$innerBackgroundColor },
      ]}
    >
      <ProfileImageView
        profileImage={user.profileImage}
        name={`${user.firstName} ${user.lastName}`}
        isLarge
        onPressDisabled
      />
      <ProfileInfoView
        name={`${user.firstName} ${user.lastName}`}
        location={user.location}
        email={user.email}
        description={user.description}
        onEditDescription={() => setShowInputModal(true)}
        isCurrentUser={user._id === currentUser._id}
      />
      <ProfileSocialView socialData={socialData} />
    </View>
  );

  const renderListFooterComponent = () => (
    <Text
      text={endOfList && feed.length > 0 ? "That's all folks!" : ''}
      fontFamily={BODY_FONT}
      style={styles.endOfList}
    />
  );

  const handleLoadMore = (count) => {
    dispatch(getProfile(route.params.user, count, PAGINATION_LIMIT));
  };
  const handleLoadMoreThrottled = useRef(debounce(500, handleLoadMore)).current;

  useEffect(() => {
    // PASS ROUTE TO MAKE SURE SCREEN UPDATES WHEN PROVIDED WITH NEW ROUTE PARAMS
    dispatch(getProfile(route.params.user, 0, PAGINATION_LIMIT));

    return () => dispatch({ type: 'RESET_PROFILE' });
  }, [route]);

  useEffect(() => {
    // HANDLE POST DELETE ACTION IN EXPLORE DETAIL SCREEN
    if (deletedPost && deletedPost.fromScreen === 'EXPlORE_DETAIL') {
      handleDeletePost('EXPlORE_DETAIL');
    }

    // RESET GLOBAL STATE 'DELETEDPOST' IN CASE OF NEW POST DELETE ACTION
    dispatch(resetDeletePost());
  }, [deletedPost]);

  useEffect(() => {
    if (userData || (feed && feed.length !== userData.profileFeed.length)) {
      setFeed(userData.profileFeed);
    }

    // DO UPDATE CHECK AFTER RETURNING FROM COMMENT SCREEN
    if (
      commentsUpdateCheck !== null &&
      (commentsUpdateCheck.fromScreen === 'PROFILE' ||
        commentsUpdateCheck.fromScreen === 'EXPLORE_DETAIL')
    ) {
      updateCommentButtonView();
    }

    if (userData) {
      setUser(userData.user);
    }
  }, [userData.profileFeed, commentsUpdateCheck]);

  useEffect(() => {
    // ONLY UPDATE IF DESCRIPTION HAS BEEN SET
    if (description) {
      setUser(currentUser);
    }
  }, [currentUser]);

  if (!feed || !user || !currentUser || !socialData) {
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
      <TextInputModal
        showModal={showInputModal}
        onSavePress={() => {
          dispatch(editProfile({ description }));
          setShowInputModal(false);
        }}
        onCancelPress={() => setShowInputModal(false)}
        onModalDismissPress={() => setShowInputModal(false)}
        onChangeText={(text) => setDescription(text)}
        title="Edit your description"
        body="Tell other users about who you are"
        placeholder="Your description..."
        inputValue={description}
        multiline
      />
      <AnimatedFlatList
        ListHeaderComponent={renderListHeader()}
        contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
        data={feed || []}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.Dive
            : AnimationType.None
        }
        renderItem={({ item }) => (
          <ExploreListItem
            isProfile
            item={item}
            currentUser={currentUser}
            onPress={() => {
              setCurrentItem(item);
              handlePostPress(item);
            }}
            onSharePress={() => handleSharePress(item)}
            onCommentsPress={() => handleCommentsPress(item)}
            onLikePress={() => handleLikePress(item)}
            onProfilePress={() => handleProfilePress(item)}
            onOptionsPress={() => handlePostOptionsPress(item)}
            onDeletePress={() => handleDeletePost('PROFILE')}
            itemInView={viewableItems.some(
              (viewable) => viewable.item._id === item._id
            )}
          />
        )}
        onViewableItemsChanged={onViewRef}
        viewabilityConfig={viewConfigRef}
        ListFooterComponent={renderListFooterComponent()}
        onScroll={({ nativeEvent }) => {
          if (fetching || endOfList) return;

          if (isCloseToBottom(nativeEvent)) {
            handleLoadMoreThrottled(userData.profileFeed.length);
          }
        }}
        keyExtractor={(item) => item._id}
      />
      {currentUser._id !== user._id && (
        <FooterView hasGradient>
          <View
            style={{
              opacity: !following ? 0.1 : 1,
            }}
            ref={footerButtonRef}
          >
            <IconLabelButton
              icon={checkmarkIcon}
              label="FOLLOWING"
              isCentered
              onPress={handleFollowPress}
              disabled={currentUser && user._id === currentUser._id}
            />
          </View>
        </FooterView>
      )}
    </ContainerView>
  );
};

Profile.defaultProps = {
  userData: null,
  commentsUpdateCheck: null,
};

Profile.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  userData: PropTypes.shape({
    profileFeed: PropTypes.arrayOf(exploreItemPropType).isRequired,
    user: userPropType,
  }),
  socialData: PropTypes.shape({
    likesCount: PropTypes.number.isRequired,
    followersCount: PropTypes.number.isRequired,
    postsCount: PropTypes.number.isRequired,
  }).isRequired,
  commentsUpdateCheck: PropTypes.shape({
    commentId: PropTypes.string.isRequired,
    fromScreen: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(commentPropType),
    action: PropTypes.string.isRequired,
  }),
  fetching: PropTypes.bool.isRequired,
  endOfList: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.user;
  const { userData, socialData, endOfList, fetching } = state.profile;
  const { commentsUpdateCheck } = state.comments;
  const { deletedPost } = state.posts;

  return {
    currentUser: user,
    userData,
    socialData,
    fetching,
    endOfList,
    commentsUpdateCheck,
    deletedPost,
  };
};

export default connect(mapStateToProps)(Profile);
