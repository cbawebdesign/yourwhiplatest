import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import HeaderView from '../views/listItemViews/HeaderView';
import { CustomText as Text, BODY_FONT } from '../text/CustomText';
import FeedSocialView from '../views/listItemViews/FeedSocialView';
import MediaView from '../views/listItemViews/MediaView';
import { exploreItemPropType, userPropType } from '../../config/propTypes';

import { exploreListItemStyles as styles } from './styles';

// DISPLAYS THE ITEMS INSIDE THE EXPLORE SCREEN
// Takes the following props:
// item (holds all information about post content)
// onPress (to navigate to the item's Detail screen)
// onCommentsPress (to navigate to the Comments screen)
// onLikePress (to process pressing the 'like' button)
// onSharePress (handles the share press action)
// onOptionsPress (handle the post options onPress)
// hideHeader (hides the HeaderView if true)
// hideMediaView (hides the images / video display view)
// onDeletePress (handles the delete press action)

const ANIMATION_DURATION = 600;

const ExploreListItem = ({
  item,
  currentUser,
  onPress,
  onCommentsPress,
  onLikePress,
  onSharePress,
  onProfilePress,
  onOptionsPress,
  hideHeader,
  hideMediaView,
  isProfile,
  getListItemViewHeight,
  onDeletePress,
  itemInView,
  onVideoProgress,
  videoViewCount,
}) => {
  const opacity = new Animated.Value(1);

  const { sharedPost, sharedImage } = item;
  const postHasMedia =
    (item.images && item.images.length > 0) || item.video !== undefined;
  const sharedPostHasMedia =
    (sharedPost && (sharedPost.image || sharedPost.images)) ||
    (sharedPost && sharedPost.video !== undefined);
  const hasVideo =
    item.images[0] &&
    (item.images[0].image.toLowerCase().includes('mp4') ||
      item.images[0].image.toLowerCase().includes('mov'));
  const hasDescription = item.description && item.description.length > 0;
  const sharedPostHasVideo =
    sharedPost &&
    sharedPost.images[0] &&
    (sharedPost.images[0].image.toLowerCase().includes('mp4') ||
      sharedPost.images[0].image.toLowerCase().includes('mov'));

  const handleDeleteItem = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => onDeletePress());
  };

  const renderHeaderView = () => (
    <>
      <HeaderView
        profileImage={item.createdBy.profileImage}
        name={`${item.createdBy.firstName} ${item.createdBy.lastName}`}
        dateTime={item.dateTime}
        onProfilePress={onProfilePress}
        onOptionsPress={onOptionsPress}
        onPressDisabled={!onProfilePress}
        videoViewCount={videoViewCount}
      />
    </>
  );

  const renderSharedView = () => {
    const sharedItem = sharedPost || sharedImage;
    const sharedItemHasMedia =
      sharedItem.image !== undefined ||
      (sharedItem.images !== undefined && sharedItem.images.length > 0) ||
      sharedItem.video !== undefined;

    return (
      <View
        style={[
          styles.sharedPostView,
          { marginTop: !hasDescription && isProfile ? -12 : 0 },
        ]}
      >
        <HeaderView
          profileImage={sharedItem.createdBy.profileImage}
          name={`${sharedItem.createdBy.firstName} ${sharedItem.createdBy.lastName}`}
          dateTime={sharedItem.dateTime}
          onProfilePress={() => onProfilePress('SHARED_ITEM_USER')}
          isSharedItem
        />
        {sharedItem.description !== undefined &&
          sharedItem.description.length > 0 && (
            <View style={styles.bodyTextView}>
              <Text
                text={sharedItem.description}
                fontFamily={BODY_FONT}
                style={styles.bodyText}
              />
            </View>
          )}
        {sharedItemHasMedia && (
          <MediaView
            media={
              sharedItem.images ||
              sharedItem.video || [{ image: sharedItem.image }]
            }
            caption={sharedItem.caption}
            itemInView={itemInView}
            onProgress={onVideoProgress}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    if (item.deleted) {
      handleDeleteItem();
    }
  }, [item.deleted]);

  return (
    <Animated.View style={{ opacity }}>
      <ListItemContainerView
        onPress={onPress}
        getListItemViewHeight={getListItemViewHeight}
        disabled={
          (!postHasMedia && !sharedPost && !sharedImage) ||
          (!postHasMedia && !sharedPostHasMedia && !sharedImage) ||
          hasVideo ||
          hideMediaView ||
          sharedPostHasVideo
        }
      >
        {!hideHeader ? renderHeaderView() : <View style={{ height: 12 }} />}

        {hasDescription ? (
          <View style={styles.bodyTextView}>
            <Text
              text={item.description}
              fontFamily={BODY_FONT}
              style={[
                styles.bodyText,
                !postHasMedia &&
                  !sharedPost &&
                  !sharedImage && { marginBottom: 25 },
              ]}
            />
          </View>
        ) : (
          <View style={styles.emptyBodyView} />
        )}

        {(sharedPost || sharedImage) && renderSharedView()}

        {!hideMediaView && postHasMedia && (
          <MediaView
            media={item.video || item.images}
            caption={item.caption}
            itemInView={itemInView}
            onProgress={onVideoProgress}
          />
        )}

        <FeedSocialView
          item={item}
          currentUser={currentUser}
          onCommentsPress={onCommentsPress}
          onLikePress={onLikePress}
          onSharePress={onSharePress}
        />
      </ListItemContainerView>
    </Animated.View>
  );
};

ExploreListItem.defaultProps = {
  onPress: null,
  onProfilePress: null,
  hideHeader: false,
  hideMediaView: false,
  isProfile: false,
  getListItemViewHeight: null,
  onDeletePress: null,
  videoViewCount: null,
};

ExploreListItem.propTypes = {
  item: exploreItemPropType.isRequired,
  currentUser: userPropType.isRequired,
  onPress: PropTypes.func,
  onCommentsPress: PropTypes.func.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onSharePress: PropTypes.func.isRequired,
  onProfilePress: PropTypes.func,
  onOptionsPress: PropTypes.func.isRequired,
  hideHeader: PropTypes.bool,
  hideMediaView: PropTypes.bool,
  isProfile: PropTypes.bool,
  getListItemViewHeight: PropTypes.func,
  onDeletePress: PropTypes.func,
  videoViewCount: PropTypes.number,
};

export default ExploreListItem;
