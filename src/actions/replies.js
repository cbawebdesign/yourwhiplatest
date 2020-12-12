export const GET_REPLY_FEED = 'GET_REPLY_FEED';
export const REPLY_FEED_RESULT = 'REPLY_FEED_RESULT';
export const REPLY_FEED_ERROR = 'REPLY_FEED_ERROR';

export const COMPOSE_NEW_REPLY = 'COMPOSE_NEW_REPLY';
export const NEW_REPLY_RESULT = 'NEW_REPLY_RESULT';
export const NEW_REPLY_ERROR = 'NEW_REPLY_ERROR';

export const LIKE_REPLY_PRESS = 'LIKE_REPLY_PRESS';
export const LIKE_REPLY_PRESS_RESULT = 'LIKE_REPLY_PRESS_RESULT';
export const LIKE_REPLY_PRESS_ERROR = 'LIKE_REPLY_PRESS_ERROR';

export const DELETE_REPLY = 'DELETE_REPLY';
export const DELETE_REPLY_RESULT = 'DELETE_REPLY_RESULT';
export const DELETE_REPLY_ERROR = 'DELETE_REPLY_ERROR';
export const getReplyFeed = (data) => ({
  type: GET_REPLY_FEED,
  data,
});

export const composeNewReply = (data) => ({
  type: COMPOSE_NEW_REPLY,
  data,
});

export const likeReplyPress = (data) => ({
  type: LIKE_REPLY_PRESS,
  data,
});

export const deleteReply = (data) => ({
  type: DELETE_REPLY,
  data,
});
