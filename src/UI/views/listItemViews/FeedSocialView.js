import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

import { CustomText as Text, TITLE_FONT } from '../../text/CustomText';

import {
  ENABLE_LIKE_ANIMATION_1,
  ENABLE_LIKE_ANIMATION_2,
  ENABLE_LIKE_YOURSELF,
} from '../../../config/constants';

import { feedSocialViewStyles as styles } from './styles';

const commentsIcon = require('../../../../assets/icons/comments.png');
const shareIcon = require('../../../../assets/icons/share.png');
const likeIcon = require('../../../../assets/icons/like.png');
const heartAnimation1 = require('../../../../assets/animations/hearts.json');
const heartAnimation2 = require('../../../../assets/animations/hearts_2.json');

// DISPLAYS LIKES, COMMENTS & SHARES VIEW IN THE EXPLORE SCREEN
// Takes the following props:
// items (holds all information about user and content)
// onLikePress (processes pressing the 'like' button)
// onCommentPress (to navigate to the Comments screen)

const FeedSocialView = ({
  item,
  currentUser,
  onCommentsPress,
  onLikePress,
  onSharePress,
}) => {
  const lottieRef =
    ENABLE_LIKE_ANIMATION_1 || ENABLE_LIKE_ANIMATION_2 ? useRef(null) : null;

  const [likePressed, setLikePressed] = useState(false);

  const itemCreatedById = item.createdBy._id || item.createdBy;
  const showSocialView = !item.sharedPost && !item.sharedImage;

  const hasBeenLiked = item.likes.some(
    (like) => like.createdBy.toString() === currentUser._id.toString()
  );
  const hasBeenCommented = item.comments.some((comment) => {
    if (comment.createdBy._id) {
      return comment.createdBy._id.toString() === currentUser._id.toString();
    }
    return comment.createdBy.toString() === currentUser._id.toString();
  });
  const hasBeenShared = item.shares.some(
    (share) => share.createdBy.toString() === currentUser._id.toString()
  );

  useEffect(() => {
    if (lottieRef && likePressed && hasBeenLiked) {
      if (ENABLE_LIKE_ANIMATION_1) {
        lottieRef.current.play(22, 91);
      } else if (ENABLE_LIKE_ANIMATION_2) {
        // lottieRef.current.play(22, 100);
        lottieRef.current.play(0, 100);
      }
    }
  }, [hasBeenLiked]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setLikePressed(true);
          onLikePress();
        }}
        style={styles.$fixLikesPosition}
        disabled={!ENABLE_LIKE_YOURSELF && itemCreatedById === currentUser._id}
        activeOpacity={0.9}
      >
        <View style={styles.socialView}>
          {ENABLE_LIKE_ANIMATION_1 || ENABLE_LIKE_ANIMATION_2 ? (
            <View style={styles.lottieView}>
              <LottieView
                ref={lottieRef}
                loop={false}
                style={[styles.lottie, hasBeenLiked && styles.$active]}
                source={
                  ENABLE_LIKE_ANIMATION_1 ? heartAnimation1 : heartAnimation2
                }
              />
              <Text
                text={item.likes.length}
                fontFamily={TITLE_FONT}
                style={styles.socialText}
              />
            </View>
          ) : (
            <>
              <Image
                source={likeIcon}
                style={[styles.socialIcon, !item.isLiked && styles.$inactive]}
              />
              <Text
                text={item.likes.length}
                fontFamily={TITLE_FONT}
                style={styles.socialText}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onCommentsPress}
        style={styles.$fixCommentsPosition}
        activeOpacity={0.9}
      >
        <View style={styles.socialView}>
          <Image
            source={commentsIcon}
            style={[styles.socialIcon, hasBeenCommented && styles.$active]}
          />
          <Text
            text={item.comments.length}
            fontFamily={TITLE_FONT}
            style={styles.socialText}
          />
        </View>
      </TouchableOpacity>
      {showSocialView && (
        <TouchableOpacity
          onPress={onSharePress}
          disabled={itemCreatedById === currentUser._id}
          activeOpacity={0.9}
        >
          <View style={styles.socialView}>
            <Image
              source={shareIcon}
              style={[styles.socialIcon, hasBeenShared && styles.$active]}
            />
            <Text
              text={item.shares.length}
              fontFamily={TITLE_FONT}
              style={styles.socialText}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

FeedSocialView.propTypes = {
  item: PropTypes.shape({
    likes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    shares: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    comments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  }).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onSharePress: PropTypes.func.isRequired,
};

export default FeedSocialView;
