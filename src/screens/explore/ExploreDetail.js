import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import ContainerView from '../../UI/views/ContainerView';
import PhotoListItem from '../../UI/lists/PhotoListItem';
import PhotoModal from '../../UI/modals/PhotoModal';
import ExploreListItem from '../../UI/lists/ExploreListItem';
import ShareModal from '../../UI/modals/ShareModal';
import SelectionModal from '../../UI/modals/SelectionModal';

import {
  onLikePressHelper,
  onNewCommentHelper,
  onShareHelper,
  onSocialMediaShare,
} from '../../helpers/socialHelpers';

import { likePostPress } from '../../actions/likes';
import { likeImagePress, getDetailPost } from '../../actions/detail';
import { sharePost, shareImage } from '../../actions/shares';
import { deletePost } from '../../actions/posts';
import { resetCommentUpdateCheck } from '../../actions/comments';
import { resetDeepLinkSlug } from '../../actions/general';

import styles from '../styles';

const ExploreDetail = ({
  route,
  navigation,
  currentUser,
  commentsUpdateCheck,
  detailPost,
  deepLinkSlug,
}) => {
  const dispatch = useDispatch();

  const paddingBottom = useSafeArea().bottom;

  const [showPostOptions, setShowPostOptions] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [shareMessage, setShareMessage] = useState('');

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
        onPress: () => handleDeletePost(),
      },
    ],
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', {
      user: post.createdBy,
    });
  };

  const handlePress = (index) => {
    setImageIndex(index);
    setShowImages(true);
  };

  const handleLikePress = (item, type) => {
    if (type === 'POST') {
      dispatch(
        likePostPress({
          fromScreen: 'EXPLORE_DETAIL',
          parentId: post._id,
        })
      );

      const updatedPost = onLikePressHelper(currentUser._id, post)[0];
      setPost(updatedPost);
    } else {
      dispatch(likeImagePress(item._id));
      setFeed((feedList) => onLikePressHelper(currentUser._id, feedList, item));
    }
  };

  const handleCommentPress = (item, type) => {
    setShowImages(false);

    navigation.navigate('Comments', {
      type,
      fromScreen: 'EXPLORE_DETAIL',
      image: item,
      createdBy: currentUser,
    });
  };

  const handleSharePress = async (item, type) => {
    setShowShareModal(true);
    setCurrentItem({ item, type });
  };

  const handleShareAction = async () => {
    if (currentItem.type === 'IMAGE') {
      dispatch(
        shareImage({
          sharedImageId: currentItem.item._id,
          activityType: 'IN_APP_SHARE',
          description: shareMessage,
        })
      );

      const result = await onShareHelper(
        currentUser._id,
        feed,
        currentItem.item
      );
      setFeed(result);
    } else {
      dispatch(
        sharePost({
          parentId: currentItem.item._id,
          sharedPostId: currentItem.item._id,
          activityType: 'IN_APP_SHARE',
          description: shareMessage,
        })
      );
      const updatedPost = await onShareHelper(
        currentUser._id,
        currentItem.item
      )[0];
      setPost(updatedPost);
    }
    setShareMessage('');
    setShowShareModal(false);
  };

  const handleShareOptionsPress = async () => {
    // PROCESS SHARE WITH SOCIAL MEDIA
    // AND UPDATE FEED LOCAL STATE
    const result = await onSocialMediaShare(
      currentUser._id,
      feed,
      currentItem.item
    );

    if (result.share.activityType) {
      dispatch(
        shareImage({
          imageId: currentItem.item._id,
          activityType: result.share.activityType,
        })
      );
      setFeed(result.feed);
    } else if (result.share.action === 'sharedAction') {
      dispatch(sharePost({ parentId: currentItem.item._id }));
      setFeed(result.feed);
    }
  };

  const handleDeletePost = () => {
    dispatch(deletePost({ postId: post._id, fromScreen: 'EXPLORE_DETAIL' }));

    setShowPostOptions(false);
    navigation.goBack();
  };

  const updateCommentButtonView = () => {
    // ADD NEW COMMENT ON RETURN FROM 'COMMENT'
    if (commentsUpdateCheck.type === 'POST') {
      const updatedPost = onNewCommentHelper(
        currentUser._id,
        post,
        commentsUpdateCheck
      )[0];

      setPost(updatedPost);
    } else {
      const updatedImageFeed = onNewCommentHelper(
        currentUser._id,
        feed,
        commentsUpdateCheck
      );

      setFeed(updatedImageFeed);
    }

    dispatch(resetCommentUpdateCheck());
  };

  // PREVENT CREATING NEW EXPLORELISTITEM COMPONENT ON EACH RERENDER
  // BY CALLING THE COMPONENT FROM A FUNCTION
  // THIS PREVENTS A FLICKERING OF COMPONENT ON BUTTON PRESS
  const renderHeader = () => (
    <ExploreListItem
      item={post}
      currentUser={currentUser}
      onCommentsPress={() => handleCommentPress(post, 'POST')}
      onLikePress={() => handleLikePress(post, 'POST')}
      onProfilePress={handleProfilePress}
      onSharePress={() => handleSharePress(post, 'POST')}
      hideMediaView
      onOptionsPress={() => setShowPostOptions(true)}
    />
  );

  useLayoutEffect(() => {
    let captionText;

    if (!detailPost) {
      captionText = '';
    } else if (detailPost.caption.length === 0) {
      captionText = 'Without Caption';
    } else {
      captionText = detailPost.caption;
    }

    navigation.setParams({
      ...route.params,
      title: captionText,
    });
  }, [detailPost]);

  useEffect(() => {
    dispatch(getDetailPost(route.params.parentId));

    return () => {
      if (deepLinkSlug) {
        dispatch(resetDeepLinkSlug());
      }
      dispatch({ type: 'RESET_DETAILPOST' });
    };
  }, []);

  useEffect(() => {
    if (!detailPost) return;

    if (!post || post._id !== detailPost._id) {
      setPost(detailPost);
      setFeed(detailPost.images);
    }

    // DO UPDATE CHECK AFTER RETURNING FROM COMMENT SCREEN
    if (
      commentsUpdateCheck !== null &&
      commentsUpdateCheck.fromScreen === 'EXPLORE_DETAIL'
    ) {
      updateCommentButtonView();
    }
  }, [route, detailPost, commentsUpdateCheck]);

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
        />
      )}
      <PhotoModal
        showModal={showImages}
        showIndex={imageIndex}
        items={feed}
        currentUser={currentUser}
        onSwipeDown={() => setShowImages(false)}
        onLikePress={(item) => handleLikePress(item, 'IMAGE')}
        onCommentPress={(item) => handleCommentPress(item, 'IMAGE')}
        onDescriptionChange={(text) => setShareMessage(text)}
        onSharePress={(index) =>
          setCurrentItem({ item: feed[index], type: 'IMAGE' })
        }
        onShare={handleShareAction}
        shareDescriptionValue={shareMessage}
        onShareOptionsPress={handleShareOptionsPress}
      />
      <FlatList
        contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
        ListHeaderComponent={post ? renderHeader() : null}
        data={feed}
        renderItem={({ item, index }) => (
          <PhotoListItem
            item={item}
            currentUser={currentUser}
            onPress={() => handlePress(index)}
            onLikePress={() => handleLikePress(item, 'IMAGE')}
            onCommentPress={() =>
              handleCommentPress(
                item,
                route.params.type === 'SHARED_IMAGE' ? 'SHARED_IMAGE' : 'IMAGE'
              )
            }
            onSharePress={() => handleSharePress(item, 'IMAGE')}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </ContainerView>
  );
};

ExploreDetail.defaultProps = {
  commentsUpdateCheck: null,
  deepLinkSlug: null,
};

ExploreDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  commentsUpdateCheck: PropTypes.shape({
    fromScreen: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  deepLinkSlug: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { user } = state.user;
  const { commentsUpdateCheck } = state.comments;
  const { detailPost } = state.detail;
  const { deepLinkSlug } = state.general;

  return {
    currentUser: user,
    commentsUpdateCheck,
    detailPost,
    deepLinkSlug,
  };
};

export default connect(mapStateToProps)(ExploreDetail);
