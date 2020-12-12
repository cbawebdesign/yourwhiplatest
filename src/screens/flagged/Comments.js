import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import ContainerView from '../../UI/views/ContainerView';
import SelectionModal from '../../UI/modals/SelectionModal';
import CommentListItem from '../../UI/lists/CommentListItem';
import EmptyListText from '../../UI/text/EmptyListText';

import { onDeleteHelper } from '../../helpers/socialHelpers';

import { deleteComment } from '../../actions/comments';
import { getFlaggedCommentsFeed, unflagComment } from '../../actions/flagged';
import { deleteAccount } from '../../actions/auth';

import styles from '../styles';

// DISPLAYS THE COMMENTS SCREEN
// Applies the following props:
// route (contains params with all comments items)
// navigation (to navigate to the Profile screen on pressing
// the profile image)
// commentFeed (contains a list with all comments)
// updateReplyCheck (contains reply sceen update data)
// currentUser (contains app user data)
// fetching (boolean check for displaying loading view)

const FlaggedComments = ({
  route,
  navigation,
  flaggedCommentsFeed,
  currentUser,
  fetching,
}) => {
  const dispatch = useDispatch();

  // const parentId = route.params.post
  //   ? route.params.post._id
  //   : route.params.image._id;

  const [feed, setFeed] = useState([]);
  const [warningType, setWarningType] = useState({
    deletePost: false,
    deleteUser: false,
  });
  const [showCommentOptions, setShowCommentOptions] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const commentOptions = {
    title: 'Comment Options',
    body: 'Select one of the options below',
    buttons: [
      {
        title: 'Unflag comment',
        subtitle: 'The comment does not break community guidelines',
        onPress: () => {
          dispatch(unflagComment(currentItem._id));
          setShowCommentOptions(false);
        },
      },
      {
        title: 'Delete comment',
        subtitle: 'The comment will no longer be visible to other users',
        onPress: () => {
          setWarningType({ deleteComment: true, deleteUser: false });
          setShowCommentOptions(false);
        },
      },
      {
        title: `Delete user ${currentItem && currentItem.createdBy.firstName}`,
        subtitle: 'The user account will be removed from app',
        onPress: () => {
          setWarningType({ deleteComment: false, deleteUser: true });
          setShowCommentOptions(false);
        },
      },
      {
        title: 'Cancel',
        onPress: () => setShowCommentOptions(false),
      },
    ],
  };

  const warningModalOptions = {
    title: warningType.deleteComment
      ? 'Delete Comment'
      : warningType.deleteUser
      ? 'Delete User'
      : '',
    body: 'Are you sure you want to perform this action?',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Cancel',
        onPress: () => {
          setWarningType({ deleteComment: false, deleteUser: false });
        },
      },
      {
        title: 'OK',
        onPress: () => {
          if (warningType.deleteComment) {
            const updatedFeed = onDeleteHelper(feed, currentItem);
            setFeed(updatedFeed);
          } else if (warningType.deleteUser) {
            dispatch(deleteAccount(currentItem.createdBy._id, 'FLAGGED'));
          }
          setWarningType({ deleteComment: false, deleteUser: false });
        },
      },
    ],
  };

  const handleProfilePress = ({ createdBy }) => {
    navigation.navigate('Profile', {
      ...route.params,
      user: createdBy,
    });
  };

  const handleCommentOptionsPress = (item) => {
    setCurrentItem(item);
    setShowCommentOptions(true);
  };

  const handleDeleteComment = () => {
    dispatch(
      deleteComment({
        fromScreen: 'FLAGGED',
        commentId: currentItem._id,
        postId: currentItem.post._id,
        // TODO: ADD TYPE TO COMMENT MODEL
        type: currentItem.comment
          ? 'REPLY'
          : currentItem.image
          ? 'IMAGE_COMMENT'
          : 'POST',
      })
    );

    // REMOVE COMMENT FROM LOCAL FEED STATE
    const feedCopy = [...feed];
    const updatedFeed = feedCopy.filter((item) => item._id !== currentItem._id);
    setFeed(updatedFeed);

    setShowCommentOptions(false);
  };

  const handleRefresh = () => {
    dispatch(getFlaggedCommentsFeed());
  };

  const renderEmptyListText = () => (
    <EmptyListText text="There are no flagged comments at this moment." />
  );

  useEffect(() => {
    dispatch(getFlaggedCommentsFeed());

    return () => dispatch({ type: 'RESET_COMMENT_FEED' });
  }, []);

  useEffect(() => {
    setFeed(flaggedCommentsFeed);
  }, [flaggedCommentsFeed]);

  if (!currentUser) {
    return <View />;
  }

  return (
    <ContainerView touchEnabled={false}>
      <SelectionModal
        showModal={showCommentOptions}
        onModalDismissPress={() => setShowCommentOptions(false)}
        options={commentOptions}
      />
      <SelectionModal
        showModal={warningType.deleteComment || warningType.deleteUser}
        onModalDismissPress={() =>
          setWarningType({ deletePost: false, deleteUser: false })
        }
        options={warningModalOptions}
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
            onLikePress={() => null}
            onReplyPress={() => null}
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
    </ContainerView>
  );
};

FlaggedComments.defaultProps = {
  updateReplyCheck: null,
};

FlaggedComments.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  flaggedCommentsFeed: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateReplyCheck: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { flaggedCommentsFeed, fetching } = state.flagged;
  const { updateReplyCheck } = state.replies;
  const { user } = state.user;

  return {
    flaggedCommentsFeed,
    updateReplyCheck,
    currentUser: user,
    fetching,
  };
};

export default connect(mapStateToProps)(FlaggedComments);
