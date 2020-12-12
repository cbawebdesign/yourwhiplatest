import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Keyboard } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import ContainerView from '../UI/views/ContainerView';
import SelectionModal from '../UI/modals/SelectionModal';
import CommentListItem from '../UI/lists/CommentListItem';
import FooterView from '../UI/views/footer/FooterView';
import CommentComposeView from '../UI/views/CommentComposeView';
import EmptyListText from '../UI/text/EmptyListText';

import { onLikePressHelper, onDeleteHelper } from '../helpers/socialHelpers';

import { useKeyboardState } from '../config/hooks';

import {
  getReplyFeed,
  composeNewReply,
  likeReplyPress,
  deleteReply,
} from '../actions/replies';
import { likeCommentPress } from '../actions/comments';

import styles from './styles';

// DISPLAYS THE COMMENTS SCREEN
// Applies the following props:
// route (contains params with all comments items)
// navigation (to navigate to the Profile screen on pressing
// the profile image)

const Replies = ({ route, navigation, replyFeed, currentUser, fetching }) => {
  const dispatch = useDispatch();
  const { keyboardShowing } = useKeyboardState();

  const [comment, setComment] = useState(null);
  const [feed, setFeed] = useState([]);
  const [reply, setReply] = useState('');
  const [showReplyOptions, setShowReplyOptions] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [commentViewHeight, setCommentViewHeight] = useState(60);

  const replyOptions = {
    title: 'Delete reply',
    body: 'Are you sure you want to delete this reply?',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Cancel',
        onPress: () => setShowReplyOptions(false),
      },
      {
        title: 'Delete',
        onPress: () => {
          const updatedFeed = onDeleteHelper(feed, currentItem);

          setFeed(updatedFeed);
          setShowReplyOptions(false);
        },
      },
    ],
  };
  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleProfilePress = ({ createdBy }) => {
    navigation.navigate('Profile', {
      user: createdBy,
    });
  };

  const handleComposePress = () => {
    if (reply.length === 0) {
      return;
    }

    dispatch(
      composeNewReply({
        parentId: route.params.comment._id,
        commentId: route.params.comment._id,
        description: reply,
        photo: null,
      })
    );

    setReply('');
    handleRemoveKeyboard();
  };

  const handleLikePress = (item, type) => {
    if (type === 'COMMENT') {
      dispatch(
        likeCommentPress({ parentId: item._id, commentId: comment._id })
      );
      const updatedFeed = onLikePressHelper(currentUser._id, comment, null)[0];
      setComment(updatedFeed);
    } else if (type === 'REPLY') {
      dispatch(
        likeReplyPress({
          parentId: route.params.comment._id,
          commentId: item._id,
        })
      );
      const updatedFeed = onLikePressHelper(currentUser._id, feed, item);
      setFeed(updatedFeed);
    }
  };

  const handleReplyOptionsPress = (item) => {
    setCurrentItem(item);
    setShowReplyOptions(true);
  };

  const handleDeleteReply = (item) => {
    dispatch(
      deleteReply({
        replyId: item._id,
        commentId: route.params.comment._id,
      })
    );

    // REMOVE COMMENT FROM LOCAL FEED STATE
    const feedCopy = [...feed];
    const updatedFeed = feedCopy.filter(
      (feedItem) => feedItem._id !== currentItem._id
    );
    setFeed(updatedFeed);

    setShowReplyOptions(false);
  };

  const renderHeaderComponent = () => (
    <CommentListItem
      item={comment || route.params.comment}
      currentUser={currentUser}
      onLikePress={() => handleLikePress(route.params.post, 'COMMENT')}
      onReplyPress={() => null}
      onProfilePress={() => handleProfilePress(route.params.comment)}
      onOptionsPress={null} // TODO: ADD COMMENT OPTIONS
      isComment
    />
  );

  const renderEmptyListText = () => (
    <EmptyListText text="Be the first to leave a reply" />
  );

  const handleRefresh = () => {
    dispatch(getReplyFeed({ parentId: route.params.comment._id }));
  };

  useLayoutEffect(() => {
    // UPDATE HEADERTITLE (ALL HEADER TITLES ARE SET INSIDE ROUTES.JS)
    navigation.setParams({
      ...route.params,
      title: `${replyFeed.length} ${
        replyFeed.length === 1 ? 'REPLY' : 'REPLIES'
      }`,
    });
  }, [replyFeed]);

  useEffect(() => {
    dispatch(getReplyFeed({ parentId: route.params.comment._id }));

    return () => dispatch({ type: 'RESET_REPLY_FEED' });
  }, []);

  useEffect(() => {
    setFeed(replyFeed);
    setComment(route.params.comment);
  }, [replyFeed]);

  return (
    <ContainerView
      onPress={handleRemoveKeyboard}
      headerHeight={route.params.headerHeight}
    >
      <SelectionModal
        showModal={showReplyOptions}
        onModalDismissPress={() => setShowReplyOptions(false)}
        options={replyOptions}
      />
      <AnimatedFlatList
        contentContainerStyle={styles.contentContainer}
        data={feed}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.Dive
            : AnimationType.None
        }
        ListHeaderComponent={renderHeaderComponent()}
        renderItem={({ item }) => (
          <CommentListItem
            item={item}
            currentUser={currentUser}
            onLikePress={() => handleLikePress(item, 'REPLY')}
            onReplyPress={() => null}
            onProfilePress={() => handleProfilePress(item)}
            isReply
            onOptionsPress={() => handleReplyOptionsPress(item)}
            onDeletePress={() => handleDeleteReply(item)}
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
          onCommentChange={(text) => setReply(text)}
          commentValue={reply}
          onHeightChange={(height) => setCommentViewHeight(height)}
          editComment={false}
        />
      </FooterView>
    </ContainerView>
  );
};

Replies.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  replyFeed: PropTypes.arrayOf(PropTypes.any).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { replyFeed, fetching } = state.replies;
  const { user } = state.user;

  return {
    fetching,
    replyFeed,
    currentUser: user,
  };
};

export default connect(mapStateToProps)(Replies);
