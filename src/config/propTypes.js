import PropTypes from 'prop-types';

export const authInputOptionsPropType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  keyboardType: PropTypes.string,
  isPassword: PropTypes.bool,
  hasModalInput: PropTypes.bool,
});

export const userPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  birthday: PropTypes.string,
  location: PropTypes.string,
  gender: PropTypes.string,
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      _id: PropTypes.string.isR,
    })
  ).isRequired,
  following: PropTypes.oneOfType([PropTypes.string, PropTypes.any]).isRequired,
  removed: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateTime: PropTypes.string.isRequired,
});

export const userSettingsPropType = PropTypes.shape({
  enableSuggestions: PropTypes.bool.isRequired,
  enableIntroAnimations: PropTypes.bool.isRequired,
  enableNotifications: PropTypes.bool.isRequired,
});

// SOCIAL
export const likePropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdBy: PropTypes.oneOfType([PropTypes.string, userPropType]).isRequired,
  image: PropTypes.string,
  dateTime: PropTypes.string,
});

export const commentPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdBy: PropTypes.oneOfType([PropTypes.string, userPropType]).isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  likes: PropTypes.arrayOf(
    PropTypes.oneOfType([likePropType, PropTypes.string])
  ),
  replies: PropTypes.arrayOf(PropTypes.string),
});

export const sharePropType = PropTypes.oneOfType([
  PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    dateTime: PropTypes.string.isRequired,
    post: PropTypes.string,
    image: PropTypes.string,
  }),
  PropTypes.string,
]);

// MEDIA
export const libraryImagePropType = PropTypes.shape({
  file: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  localUri: PropTypes.string.isRequired,
});

export const photoPropType = PropTypes.shape({
  file: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    uri: PropTypes.string.isRequired,
  }),
});

export const composeMediaPropType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([libraryImagePropType, photoPropType])
  ),
  video: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }),
});

export const imagePropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdBy: PropTypes.oneOfType([userPropType, PropTypes.string]).isRequired,
  dateTime: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(likePropType).isRequired,
  comments: PropTypes.arrayOf(commentPropType).isRequired,
  shares: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, sharePropType])
  ).isRequired,
});

// LIST ITEMS
export const exploreItemPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  createdBy: PropTypes.oneOfType([
    userPropType.isRequired,
    PropTypes.string.isRequired,
  ]),
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(imagePropType).isRequired,
  likes: PropTypes.arrayOf(likePropType).isRequired,
  comments: PropTypes.arrayOf(commentPropType).isRequired,
  shares: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, sharePropType])
  ),
});

export const commentItemPropType = PropTypes.shape({
  createdBy: userPropType,
  dateTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.any).isRequired,
  post: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  comment: PropTypes.string,
  image: PropTypes.string,
  replies: PropTypes.arrayOf(PropTypes.any).isRequired,
  _id: PropTypes.string.isRequired,
});

export const galleryItemPropType = PropTypes.shape({
  createdBy: userPropType.isRequired,
  dateTime: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(imagePropType).isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
});

export const timeLinePropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  user_action: userPropType.isRequired,
  user_receiver: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  post: PropTypes.string,
  dateTime: PropTypes.string.isRequired,
});

export const imageItemPropType = PropTypes.shape({
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

// STATS
export const statsPropType = PropTypes.shape({
  dailyFollowersList: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      followersCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  dailyLikesList: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.number.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  followersCount: PropTypes.number.isRequired,
  followersGrowth: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  likesGrowth: PropTypes.number.isRequired,
});
