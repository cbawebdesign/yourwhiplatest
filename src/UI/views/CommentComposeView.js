import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';
import IconButton from '../buttons/IconButton';
import { commentComposeViewStyles as styles } from './styles';

// DISPLAYS THE INPUT VIEW USED TO COMPOSE NEW COMMENTS.
// Takes the following props:
// onComposePress (to create the new comment)
// onCommentChange (transfers comment string to Comment parent screen)
// commentValue (controls the value of the comment TextInput)

const composeIcon = require('../../../assets/icons/compose.png');

const CommentComposeView = ({
  onComposePress,
  onCommentChange,
  commentValue,
  onHeightChange,
  editComment,
}) => {
  return (
    <>
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) => {
          onHeightChange(nativeEvent.layout.height);
        }}
      >
        <View style={styles.commentView}>
          {editComment && (
            <Text
              text="Edit Comment"
              fontFamily={TITLE_FONT}
              style={styles.editTitle}
            />
          )}
          <TextInput
            placeholder="Write something..."
            style={styles.input}
            onChangeText={onCommentChange}
            value={commentValue}
            multiline
          />
        </View>
        <IconButton icon={composeIcon} onPress={onComposePress} />
      </View>
    </>
  );
};

CommentComposeView.propTypes = {
  onComposePress: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  commentValue: PropTypes.string.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  editComment: PropTypes.bool.isRequired,
};

export default CommentComposeView;
