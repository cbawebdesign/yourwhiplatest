export const SHARE_POST_PRESS = 'SHARE_POST_PRESS';
export const SHARE_POST_PRESS_RESULT = 'SHARE_POST_PRESS_RESULT';
export const SHARE_POST_PRESS_ERROR = 'SHARE_POST_PRESS_ERROR';

export const SHARE_IMAGE_PRESS = 'SHARE_IMAGE_PRESS';
export const SHARE_IMAGE_PRESS_RESULT = 'SHARE_IMAGE_PRESS_RESULT';
export const SHARE_IMAGE_PRESS_ERROR = 'SHARE_IMAGE_PRESS_ERROR';

export const sharePost = (data) => ({
  type: SHARE_POST_PRESS,
  data,
});

export const shareImage = (data) => ({
  type: SHARE_IMAGE_PRESS,
  data,
});
