export const GET_DETAIL_POST = 'GET_DETAIL_POST';
export const DETAIL_POST_RESULT = 'DETAIL_POST_RESULT';
export const DETAIL_POST_ERROR = 'DETAIL_POST_ERROR';

export const LIKE_IMAGE_PRESS = 'LIKE_IMAGE_PRESS';
export const LIKE_IMAGE_PRESS_RESULT = 'LIKE_IMAGE_PRESS_RESULT';
export const LIKE_IMAGE_PRESS_ERROR = 'LIKE_IMAGE_PRESS_ERROR';

export const getDetailPost = (parentId) => ({
  type: GET_DETAIL_POST,
  parentId,
});

export const likeImagePress = (imageId) => ({
  type: LIKE_IMAGE_PRESS,
  imageId,
});
