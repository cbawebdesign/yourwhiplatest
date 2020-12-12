import { Share, Platform, Alert } from 'react-native';
import OneSignal from 'react-native-onesignal';

export const onLikePressHelper = (
  userId,
  feed,
  postOrMedia,
  newLikeCheck = null
) => {
  const feedCopy = Array.isArray(feed) ? [...feed] : [{ ...feed }];
  let index;

  if (postOrMedia) {
    index = feedCopy.findIndex((item) => item._id === postOrMedia._id);
  } else if (newLikeCheck) {
    index = feedCopy.findIndex((item) => item._id === newLikeCheck.id);
  } else {
    index = 0;
  }

  if (
    feedCopy[index].likes.some((like) => like.createdBy.toString() === userId)
  ) {
    feedCopy[index].likes = feedCopy[index].likes.filter(
      (like) => like.createdBy.toString() !== userId
    );
  } else {
    feedCopy[index].likes.push({
      _id: Math.floor(Math.random() * 100).toString(),
      createdBy: userId,
    });
  }

  return feedCopy;
};

export const onLikeSharedImageHelper = (feed, sharedImage) => {
  const feedCopy = [...feed];

  const index = feedCopy.findIndex(
    (item) => item.sharedImage && item.sharedImage._id === sharedImage._id
  );
  feedCopy[index].sharedImage = sharedImage;

  return feedCopy;
};

export const onNewCommentHelper = (
  userId,
  feed,
  commentsUpdateCheck,
  isReply = false
) => {
  const feedCopy = Array.isArray(feed) ? [...feed] : [{ ...feed }];
  const type = isReply ? 'replies' : 'comments';
  const itemId = isReply
    ? commentsUpdateCheck.replyId
    : commentsUpdateCheck.commentId;

  feedCopy.forEach((item, index) => {
    if (commentsUpdateCheck.id === item._id) {
      if (
        commentsUpdateCheck.action === 'DELETE_COMMENT' ||
        commentsUpdateCheck.action === 'DELETE_REPLY'
      ) {
        feedCopy[index][type] = feedCopy[index][type].filter(
          (el) => (el._id ? el._id : el) !== itemId
        );
      } else {
        feedCopy[index][type].push({
          _id: itemId,
          createdBy: userId,
        });
      }
    }
  });

  return feedCopy;
};

export const onSharedImageNewCommentHelper = (feed, sharedImage, comments) => {
  const feedCopy = [...feed];

  const index = feedCopy.findIndex(
    (item) => item.sharedImage && item.sharedImage._id === sharedImage._id
  );

  feedCopy[index].sharedImage.comments = comments;

  return feedCopy;
};

export const onSocialMediaShare = async (userId, feed, postOrImage) => {
  let text = postOrImage.description ? postOrImage.description : '';

  const redirectUrl = `https://yourwhip.app.link/detail/?slug=${postOrImage._id}`;

  if (Platform.OS === 'android') text = text.concat(` ${redirectUrl}`);

  try {
    const result = await Share.share(
      {
        subject: 'Check out this post',
        title: 'YOURWHIP.COM',
        message: text,
        url: redirectUrl,
      },
      {
        dialogTitle: 'Share ReactNativeShare App',
        excludedActivityTypes: [],
      }
    );

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        const updatedFeed = onShareHelper(userId, feed, postOrImage);

        return { share: result, feed: updatedFeed };
      }

      const updatedFeed = onShareHelper(userId, feed, postOrImage);
      return { share: result, feed: updatedFeed };
    }

    if (result.action === Share.dismissedAction) {
      return result.action;
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};

export const onShareHelper = (userId, feed, post) => {
  const feedCopy = post ? [...feed] : [{ ...feed }];
  let index;

  if (post) {
    index = feedCopy.findIndex((item) => item._id === post._id);
  } else {
    index = 0;
  }

  feedCopy[index].shares.push({
    _id: Math.floor(Math.random() * 100).toString(),
    createdBy: userId,
    post: post ? post._id : feedCopy[index]._id,
    dateTime: Date.now().toString(),
  });

  return feedCopy;
};

export const onSharedImageShareHelper = (userId, feed, sharedImage) => {
  const feedCopy = [...feed];

  const index = feedCopy.findIndex(
    (item) => item.sharedImage && item.sharedImage._id === sharedImage._id
  );

  feedCopy[index].sharedImage.shares.push({
    _id: Math.floor(Math.random() * 100),
    createdBy: userId,
  });

  return feedCopy;
};

export const onDeleteHelper = (feed, deletedItem) => {
  const feedCopy = [...feed];

  feedCopy.forEach((item, index) => {
    if (item._id === deletedItem._id) {
      feedCopy[index].deleted = true;
    }
  });

  return feedCopy;
};

export const showOneSignalStatus = async (
  status,
  currentUser,
  updatePermissions
) => {
  if (Platform.OS === 'ios' && !status.hasPrompted) {
    // SHOW PROMPT ON FIRST OPEN
    const handlePrompt = () =>
      new Promise((resolve) => {
        OneSignal.promptForPushNotificationsWithUserResponse(
          (hasPermission) => {
            if (hasPermission) {
              OneSignal.registerForPushNotifications();
              setOneSignalExternalUserId(currentUser._id);
              resolve('SUBSCRIBED_AFTER_PROMPT');
            } else {
              resolve('UNSUBSCRIBED_AFTER_PROMPT');
            }
          }
        );
      });

    const promptResult = await handlePrompt();
    return promptResult;
  }

  if (Platform.OS === 'android' && !updatePermissions) {
    OneSignal.registerForPushNotifications();
    setOneSignalExternalUserId(currentUser._id);

    return 'ANDROID_INIT_SUBSCRIBED';
  }

  // SHOW PROMPT IF PREVIOUS PROMPT HAS BEEN DECLINED
  if (
    !status.notificationsEnabled &&
    currentUser.settings.enableNotifications
  ) {
    return 'RE_PROMPT';
  }

  // UPDATE SETTINGS IF SOMETHING CHANGES
  if (updatePermissions) {
    if (currentUser.settings.enableNotifications) {
      setOneSignalExternalUserId(currentUser._id);
      return 'SUBSCRIBED';
    }

    removeOneSignalExternalUserId();
    return 'UNSUBSCRIBED';
  }

  return status.notificationsEnabled ? 'SUBSCRIBED' : 'UNSUBSCRIBED';
};

export const setOneSignalExternalUserId = (userId) => {
  OneSignal.setExternalUserId(userId, (result) => {
    if (result && result.push && result.push.success) {
      console.log('Subscribing to notifications', result.push);
      OneSignal.setSubscription(true);
    }
  });
};

export const removeOneSignalExternalUserId = () => {
  OneSignal.removeExternalUserId((result) => {
    if (result && result.push && result.push.success) {
      console.log('Unsubscribing from notifications', result.push);
      OneSignal.setSubscription(false);
    }
  });
};
