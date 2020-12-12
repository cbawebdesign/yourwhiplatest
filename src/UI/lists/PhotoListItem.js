import React from 'react';
import PropTypes from 'prop-types';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import FeedSocialView from '../views/listItemViews/FeedSocialView';
import MediaView from '../views/listItemViews/MediaView';

import { imageItemPropType } from '../../config/propTypes';

import { photoListItemStyles as styles } from './styles';

const PhotoListItem = ({
  item,
  currentUser,
  onPress,
  onLikePress,
  onCommentPress,
  onSharePress,
}) => {
  const hasVideo = item.image && item.image.includes('mp4');

  return (
    <ListItemContainerView
      height={styles.$containerHeight}
      onPress={onPress}
      disabled={hasVideo}
    >
      <MediaView media={[item]} />
      <FeedSocialView
        item={item}
        currentUser={currentUser}
        onPress={onPress}
        onCommentsPress={onCommentPress}
        onLikePress={onLikePress}
        onSharePress={onSharePress}
      />
    </ListItemContainerView>
  );
};

PhotoListItem.propTypes = {
  item: imageItemPropType.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  onPress: PropTypes.func.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onCommentPress: PropTypes.func.isRequired,
  onSharePress: PropTypes.func.isRequired,
};

export default PhotoListItem;
