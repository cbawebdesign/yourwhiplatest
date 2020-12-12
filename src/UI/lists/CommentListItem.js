import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import { CustomText as Text, BODY_FONT } from '../text/CustomText';
import HeaderView from '../views/listItemViews/HeaderView';
import CommentSocialView from '../views/listItemViews/CommentSocialView';

import { commentItemPropType } from '../../config/propTypes';

import { commentListItemStyles as styles } from './styles';

// DISPLAYS THE ITEMS INSIDE THE COMMENTS SCREEN
// Takes the following props:
// items (holds all information about user and content)
// onLikePress (processes pressing the 'like' button)
// onProfilePress (to navigate to the Profile screen)
// onReplyPress (handles the reply press action)
// onOptionsPress (handle the post options onPress)
// isComment (renders the list item style as a comment; NOTE, only used
// inside the 'Reply' screen; default: 'false');
// isReply (renders the list item style as a reply; NOTE, only used
// inside the 'Reply' screen; default: 'false')
// onDeletePress (handles the delete press action)

const ANIMATION_DURATION = 500;

const CommentListItem = ({
  item,
  currentUser,
  onLikePress,
  onProfilePress,
  onReplyPress,
  isComment,
  isReply,
  onOptionsPress,
  onDeletePress,
}) => {
  const opacity = new Animated.Value(1);

  const [height, setHeight] = useState(0);

  const handleDeleteItem = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => onDeletePress());
  };

  useEffect(() => {
    if (item.deleted) {
      handleDeleteItem();
    }
  }, [item.deleted]);

  return (
    <Animated.View style={{ opacity }}>
      <ListItemContainerView
        height={height}
        isComment={isComment}
        isReply={isReply}
      >
        <HeaderView
          profileImage={item.profileImage}
          name={`${item.createdBy.firstName} ${item.createdBy.lastName}`}
          dateTime={item.dateTime}
          showName
          onProfilePress={onProfilePress}
          onOptionsPress={onOptionsPress}
        />
        <View
          style={styles.descriptionView}
          onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
        >
          <Text
            text={item.description}
            fontFamily={BODY_FONT}
            style={styles.comment}
          />
        </View>
        <View style={styles.border} />
        <CommentSocialView
          item={item}
          currentUser={currentUser}
          onLikePress={onLikePress}
          onReplyPress={onReplyPress}
          hideReplyButton={isReply}
        />
      </ListItemContainerView>
    </Animated.View>
  );
};

CommentListItem.defaultProps = {
  isComment: false,
  isReply: false,
  onDeletePress: null,
  onOptionsPress: null,
};

CommentListItem.propTypes = {
  item: commentItemPropType.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onReplyPress: PropTypes.func.isRequired,
  onProfilePress: PropTypes.func.isRequired,
  onOptionsPress: PropTypes.func,
  isComment: PropTypes.bool,
  isReply: PropTypes.bool,
  onDeletePress: PropTypes.func,
};

export default CommentListItem;
