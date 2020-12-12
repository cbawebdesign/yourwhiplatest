import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import ContainerView from '../UI/views/ContainerView';
import SelectionModal from '../UI/modals/SelectionModal';
import CommentListItem from '../UI/lists/CommentListItem';
import FooterView from '../UI/views/footer/FooterView';
import CommentComposeView from '../UI/views/CommentComposeView';
import EmptyListText from '../UI/text/EmptyListText';

import {
  onLikePressHelper,
  onNewCommentHelper,
  onDeleteHelper,
} from '../helpers/socialHelpers';
import { useKeyboardState } from '../config/hooks';

import {
  getCommentFeed,
  likeCommentPress,
  composeNewComment,
  editComment,
  deleteComment,
  hideComment,
  hideCommentsByUser,
} from '../actions/comments';
import { reportComment } from '../actions/flagged';

import styles from './styles';

// DISPLAYS THE COMMENTS SCREEN
// Applies the following props:
// route (contains params with all comments items)
// navigation (to navigate to the Profile screen on pressing
// the profile image)
// commentFeed (contains a list with all comments)
// updateReplyCheck (contains reply sceen update data)
// currentUser (contains app user data)
// fetching (boolean check for displaying loading view)

const Comments = ({
  route,
  navigation,
  commentFeed,
  updateReplyCheck,
  currentUser,
  fetching,
  success,
}) => {
  const dispatch = useDispatch();
  const { keyboardShowing } = useKeyboardState();

  const parentId = route.params.post
    ? route.params.post._id
    : route.params.image._id;

  const [feed, setFeed] = useState([]);
  const [comment, setComment] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [commentViewHeight, setCommentViewHeight] = useState(60);
  const [editingComment, setEditingComment] = useState(false);

  const commentOptions = {
    title: 'Comment Options',
    body: 'Select one of the options below',
    buttons: [
      {
        title: 'Edit comment',
        subtitle: 'Change how this comment is displayed to other users',
        onPress: () => {
          setComment(currentItem.description);
          setEditingComment(true);
          setShowCommentOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id !== currentUser._id,
      },
      {
        title: 'Delete comment',
        subtitle: 'The comment will no longer be visible to other users',
        onPress: () => {
          const updatedFeed = onDeleteHelper(feed, currentItem);

          setFeed(updatedFeed);
          setShowCommentOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id !== currentUser._id,
      },
      {
        title: 'Hide comment',
        subtitle: 'The comment will no longer show in your feed',
        onPress: () => {
          dispatch(
            hideComment({ parentId, commentId: currentItem._id, type: 'POST' })
          );
          setShowCommentOptions(false);
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
          dispatch(
            hideCommentsByUser({
              parentId,
              userId: currentItem.createdBy._id,
              type: 'POST',
            })
          );
          setShowCommentOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id === currentUser._id,
      },
      {
        title: `Report to admins`,
        subtitle:
          'Flag this comment as inappropriate or not folowing community guidelines',
        onPress: () => {
          dispatch(reportComment(currentItem._id));
          setShowCommentOptions(false);
        },
        hide:
          currentItem &&
          currentUser &&
          currentItem.createdBy._id === currentUser._id,
      },
      {
        title: 'Cancel',
        onPress: () => setShowCommentOptions(false),
      },
    ],
  };

  const successModalOptions = {
    title: 'Comment Successfully Reported',
    body:
      success && success.reportCommentSuccess
        ? success.reportCommentSuccess
        : '',
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

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleProfilePress = ({ createdBy }) => {
    navigation.navigate('Profile', {
      ...route.params,
      user: createdBy,
    });
  };

  const handleComposePress = () => {
    if (comment.length === 0) {
      return;
    }

    if (editingComment) {
      dispatch(
        editComment({
          type: route.params.type,
          fromScreen: route.params.fromScreen,
          commentId: currentItem._id,
          parentId,
          description: comment,
        })
      );
      setEditingComment(false);
    } else {
      dispatch(
        composeNewComment({
          type: route.params.type,
          fromScreen: route.params.fromScreen,
          parentId,
          description: comment,
        })
      );
    }

    setComment('');
    handleRemoveKeyboard();
  };

  const handleLikePress = (item) => {
    dispatch(likeCommentPress({ parentId, commentId: item._id }));

    const updatedFeed = onLikePressHelper(currentUser._id, feed, item);
    setFeed(updatedFeed);
  };

  const handleReplyPress = (item) => {
    navigation.navigate('Replies', {
      comment: item,
      post: route.params.post,
    });
  };

  const handleCommentOptionsPress = (item) => {
    setCurrentItem(item);
    setShowCommentOptions(true);
  };

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({
        fromScreen: route.params.fromScreen,
        commentId: currentItem._id,
        postId: parentId,
        type: route.params.type,
      })
    );

    // REMOVE COMMENT FROM LOCAL FEED STATE
    const feedCopy = [...feed];
    const updatedFeed = feedCopy.filter((item) => item._id !== currentItem._id);
    setFeed(updatedFeed);

    setShowCommentOptions(false);
  };

  const updateReplyButtonView = () => {
    // UPDATE REPLY COUNT ON RETURN FROM 'REPLIES'
    const updatedFeed = onNewCommentHelper(
      currentUser._id,
      commentFeed,
      updateReplyCheck,
      true
    );

    dispatch({ type: 'RESET_UPDATE_REPLY_CHECK' });
    setFeed(updatedFeed);
  };

  const handleRefresh = () => {
    dispatch(
      getCommentFeed({
        parentId,
        feedType: route.params.type,
      })
    );
  };

  const renderEmptyListText = () => (
    <EmptyListText text="Be the first to leave a comment" />
  );

  useLayoutEffect(() => {
    // UPDATE HEADERTITLE (ALL HEADER TITLES ARE SET INSIDE ROUTES.JS)
    navigation.setParams({
      ...route.params,
      title: `${commentFeed.length} ${
        commentFeed.length === 1 ? 'COMMENT' : 'COMMENTS'
      }`,
    });
  }, [commentFeed]);

  useEffect(() => {
    dispatch(
      getCommentFeed({
        parentId,
        feedType: route.params.type,
      })
    );

    return () => {
      dispatch({ type: 'RESET_SUCCESS' });
      dispatch({ type: 'RESET_COMMENT_FEED' });
    };
  }, []);

  useEffect(() => {
    setFeed(commentFeed);

    // DO UPDATE CHECK AFTER RETURNING FROM COMMENT SCREEN
    if (updateReplyCheck !== null) {
      updateReplyButtonView();
    }
  }, [commentFeed, updateReplyCheck]);

  useEffect(() => {
    if (success && success.reportCommentSuccess) {
      setShowSuccessModal(success && success.reportCommentSuccess.length > 0);
    }
  }, [success]);

  if (!currentUser) {
    return <View />;
  }

  return (
    <ContainerView
      onPress={handleRemoveKeyboard}
      headerHeight={route.params.headerHeight}
    >
      <SelectionModal
        showModal={showCommentOptions}
        onModalDismissPress={() => setShowCommentOptions(false)}
        options={commentOptions}
      />
      <SelectionModal
        showModal={showSuccessModal}
        onModalDismissPress={() => setShowSuccessModal(false)}
        options={successModalOptions}
      />
      <AnimatedFlatList
        contentContainerStyle={styles.contentContainer}
        data={feed}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.Dive
            : AnimationType.None
        }
        renderItem={({ item }) => (
          <CommentListItem
            item={item}
            currentUser={currentUser}
            onLikePress={() => handleLikePress(item)}
            onReplyPress={() => handleReplyPress(item)}
            onProfilePress={() => handleProfilePress(item)}
            onOptionsPress={() => handleCommentOptionsPress(item)}
            onDeletePress={() => handleDeleteComment()}
          />
        )}
        ListEmptyComponent={renderEmptyListText()}
        onRefresh={handleRefresh}
        refreshing={fetching}
        keyExtractor={(item) => item._id}
      />
      <FooterView
        color="transparent"
        hasGradient
        keyboardActive={keyboardShowing}
        height={commentViewHeight > 60 ? commentViewHeight : 60}
      >
        <CommentComposeView
          onComposePress={handleComposePress}
          onCommentChange={(text) => setComment(text)}
          commentValue={comment}
          onHeightChange={(height) => setCommentViewHeight(height)}
          editComment={editingComment}
        />
      </FooterView>
    </ContainerView>
  );
};

Comments.defaultProps = {
  updateReplyCheck: null,
  success: null,
};

Comments.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  commentFeed: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateReplyCheck: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetching: PropTypes.bool.isRequired,
  success: PropTypes.shape({
    reportCommentSuccess: PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  const { commentFeed, fetching } = state.comments;
  const { updateReplyCheck } = state.replies;
  const { success } = state.flagged;
  const { user } = state.user;

  return {
    commentFeed,
    updateReplyCheck,
    currentUser: user,
    fetching,
    success,
  };
};

export default connect(mapStateToProps)(Comments);
