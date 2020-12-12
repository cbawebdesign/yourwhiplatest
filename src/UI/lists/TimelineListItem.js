import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import { CustomText as Text, BODY_FONT } from '../text/CustomText';
import ProfileImageView from '../views/ProfileImageView';
import MultiTextView from '../views/listItemViews/MultiTextView';

import { getTimeHelper } from '../../helpers/dateTimeHelper';

import { timeLinePropType } from '../../config/propTypes';

import { timelineListItemStyles as styles } from './styles';

const likeIcon = require('../../../assets/icons/like.png');
const shareIcon = require('../../../assets/icons/share.png');
const commentIcon = require('../../../assets/icons/comments.png');
const followIcon = require('../../../assets/icons/follow.png');
const timeIcon = require('../../../assets/icons/time.png');
const repliesIcon = require('../../../assets/icons/replies.png');
const likeCommentIcon = require('../../../assets/icons/like_comment.png');
const photoLikeIcon = require('../../../assets/icons/photo_like.png');
const replyLikeIcon = require('../../../assets/icons/reply_like.png');

const TimelineListItem = ({ item, currentUser, onProfilePress }) => {
  const getIcon = () => {
    switch (item.activity) {
      case 'LIKE_POST':
        return likeIcon;
      case 'SHARE_POST':
        return shareIcon;
      case 'LIKE_COMMENT':
        return likeCommentIcon;
      case 'LIKE_IMAGE':
        return photoLikeIcon;
      case 'follow':
        return followIcon;
      case 'share':
        return shareIcon;
      case 'POST_COMMENT':
      case 'IMAGE_COMMENT':
        return commentIcon;
      case 'REPLY':
        return repliesIcon;
      case 'LIKE_REPLY':
        return replyLikeIcon;
      case 'SHARE_IMAGE':
        return shareIcon;
      case 'FOLLOW':
        return followIcon;
      default:
        return null;
    }
  };

  const getActionText = () => {
    switch (item.activity) {
      case 'LIKE_POST':
        return 'liked your post';
      case 'SHARE_POST':
        return 'shared your post';
      case 'LIKE_COMMENT':
        return 'liked your comment';
      case 'LIKE_IMAGE':
        return 'liked your photo';
      case 'FOLLOW':
        return 'started following you';
      case 'SHARE_IMAGE':
        return 'shared one of your images';
      case 'POST_COMMENT':
        return 'commented on your post';
      case 'IMAGE_COMMENT':
        return 'commented on your image';
      case 'REPLY':
        return 'replied to your comment';
      case 'LIKE_REPLY':
        return 'liked your reply';
      default:
        return null;
    }
  };

  const getName = () => {
    if (item.user_action._id === currentUser._id) {
      return 'You';
    }

    return `${item.user_action.firstName} ${item.user_action.lastName}`;
  };

  return (
    <ListItemContainerView height={styles.$containerHeight} row>
      <LinearGradient
        style={styles.gradientView}
        colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <Image source={getIcon()} style={styles.socialIcon} />
      </LinearGradient>
      <View style={styles.infoView}>
        <View style={styles.headerView}>
          <View style={styles.timeView}>
            <Image source={timeIcon} style={styles.timeIcon} />
            <Text
              text={getTimeHelper(item.dateTime, true)}
              fontFamily={BODY_FONT}
              style={styles.time}
            />
          </View>
          <ProfileImageView
            name={`${item.user_action.firstName} ${item.user_action.lastName}`}
            profileImage={item.user_action.profileImage}
            onPress={onProfilePress}
          />
        </View>
        <View style={styles.bodyView}>
          <MultiTextView
            items={[
              {
                text: getName(),
                isLink: true,
              },
              { text: getActionText(), isLink: false },
            ]}
          />
        </View>
      </View>
    </ListItemContainerView>
  );
};

TimelineListItem.propTypes = {
  item: timeLinePropType.isRequired,
  onProfilePress: PropTypes.func.isRequired,
};

export default TimelineListItem;
