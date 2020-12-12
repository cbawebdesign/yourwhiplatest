import { RESET_NEW_COMMENT_CHECK } from './comments';

export const LIKE_POST_PRESS = 'LIKE_POST_PRESS';
export const LIKE_POST_PRESS_RESULT = 'LIKE_POST_PRESS_RESULT';
export const LIKE_POST_PRESS_ERROR = 'LIKE_POST_PRESS_ERROR';

export const RESET_NEW_LIKE_CHECK = 'RESET_NEW_LIKE_CHECK';

export const likePostPress = (data) => ({
  type: LIKE_POST_PRESS,
  data,
});

export const resetNewLikeCheck = () => ({
  type: RESET_NEW_LIKE_CHECK,
});
