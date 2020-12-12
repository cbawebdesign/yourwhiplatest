import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../../text/CustomText';

import { ENABLE_LIKE_YOURSELF } from '../../../config/constants';

import { commentSocialViewStyles as styles } from './styles';

// DISPLAYS LIKES & REPLIES VIEW IN THE COMMENT SCREEN
// Takes the following props:
// items (holds all information about user and content)
// onLikePress (processes pressing the 'like' button)
// hideReplyButton (removes the 'Reply' button; default: 'false')
// hideAllButtons (removes 'Like' and 'Reply' buttons; default: 'false')

const CommentSocialView = ({
  item,
  onLikePress,
  onReplyPress,
  hideReplyButton,
  hideAllButtons,
  currentUser,
}) => (
  <View style={styles.container}>
    {!hideAllButtons && (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={onLikePress}
        activeOpacity={0.9}
        disabled={
          !ENABLE_LIKE_YOURSELF && item.createdBy._id === currentUser._id
        }
      >
        <View style={styles.buttonView}>
          <Text
            text={item.likes.length === 0 ? '' : item.likes.length.toString()}
            fontFamily={TITLE_FONT}
            style={styles.number}
          />
          <Text
            text={item.likes.length > 1 ? 'LIKES' : 'LIKE'}
            fontFamily={TITLE_FONT}
            style={styles.label}
          />
        </View>
      </TouchableOpacity>
    )}
    {!hideReplyButton && !hideAllButtons && (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={onReplyPress}
        activeOpacity={0.9}
      >
        <View style={styles.buttonView}>
          <Text
            text={
              item.replies.length === 0 ? '' : item.replies.length.toString()
            }
            fontFamily={TITLE_FONT}
            style={styles.number}
          />
          <Text
            text={item.replies.length > 1 ? 'REPLIES' : 'REPLY'}
            fontFamily={TITLE_FONT}
            style={styles.label}
          />
        </View>
      </TouchableOpacity>
    )}
  </View>
);

CommentSocialView.defaultProps = {
  hideReplyButton: false,
  hideAllButtons: false,
  onReplyPress: () => null,
};

CommentSocialView.propTypes = {
  onLikePress: PropTypes.func.isRequired,
  onReplyPress: PropTypes.func,
  hideReplyButton: PropTypes.bool,
  hideAllButtons: PropTypes.bool,
};

export default CommentSocialView;
