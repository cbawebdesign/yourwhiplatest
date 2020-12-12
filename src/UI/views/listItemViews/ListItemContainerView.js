import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';

import { listItemContainerViewStyles as styles } from './styles';

// DISPLAYS THE OUTER VIEW OF ALL LIST ITEMS
// Takes the following props:
// height (renders container height)
// onPress (to navigate to item's Detail screen if required)
// backgroundColor (renders background color of the innerContainer)
// row (renders children components aligned horzontally)
// marginTop (sets the top margin of the listItem container)
// marginBottom (sets the bottom margin of the listItem container)
// disabled (disables the onPress visual feedback)
// isComment (renders the list item style as a comment; NOTE, only used
// inside the 'Reply' screen; default: 'false');
// isReply (renders the list item style as a reply; NOTE, only used
// inside the 'Reply' screen; default: 'false')

const ListItemContainerView = ({
  children,
  height,
  onPress,
  backgroundColor,
  row,
  marginTop,
  marginBottom,
  disabled,
  isComment,
  isReply,
  getListItemViewHeight,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.9}
    style={{ flex: 1 }}
    disabled={disabled}
  >
    <View
      style={[
        styles.container,
        {
          minHeight: height,
          marginTop,
          marginBottom,
          marginLeft: isReply ? 12 : isComment ? -12 : 0,
        },
      ]}
      onLayout={(event) =>
        getListItemViewHeight &&
        getListItemViewHeight(event.nativeEvent.layout.height)
      }
    >
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor,
          },
          row && styles.$contentInRow,
        ]}
      >
        {children}
      </View>
    </View>
  </TouchableOpacity>
);

ListItemContainerView.defaultProps = {
  height: 0,
  onPress: () => null,
  backgroundColor: 'white',
  row: false,
  marginTop: 12,
  marginBottom: 12,
  disabled: false,
  isComment: false,
  isReply: false,
};

ListItemContainerView.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  height: PropTypes.number,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  row: PropTypes.bool,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  disabled: PropTypes.bool,
  isComment: PropTypes.bool,
  isReply: PropTypes.bool,
};

export default ListItemContainerView;
