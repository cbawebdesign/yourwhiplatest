export const GET_HOME_FEED = 'GET_HOME_FEED';
export const HOME_FEED_RESULT = 'HOME_FEED_RESULT';
export const HOME_FEED_ERROR = 'HOME_FEED_ERROR';

export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const NEW_POST_RESULT = 'NEW_POST_RESULT';
export const NEW_POST_ERROR = 'NEW_POST_ERROR';

export const EDIT_POST = 'EDIT_POST';
export const EDIT_POST_RESULT = 'EDIT_POST_RESULT';
export const EDIT_POST_ERROR = 'EDIT_POST_ERROR';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_RESULT = 'DELETE_POST_RESULT';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

export const HIDE_POST = 'HIDE_POST';
export const HIDE_POST_RESULT = 'HIDE_POST_RESULT';
export const HIDE_POST_ERROR = 'HIDE_POST_ERROR';

export const HIDE_POSTS_BY_USER = 'HIDE_POSTS_BY_USER';
export const HIDE_POSTS_BY_USER_RESULT = 'HIDE_POSTS_BY_USER_RESULT';
export const HIDE_POSTS_BY_USER_ERROR = 'HIDE_POSTS_BY_USER_ERROR';

export const UPDATE_VIDEO_VIEWCOUNT = 'UPDATE_VIDEO_VIEWCOUNT';
export const UPDATE_VIDEO_VIEWCOUNT_RESULT = 'UPDATE_VIDEO_VIEWCOUNT_RESULT';
export const UPDATE_VIDEO_VIEWCOUNT_ERROR = 'UPDATE_VIDEO_VIEWCOUNT_ERROR';

export const RESET_DELETE_POST = 'RESET_DELETE_POST';

export const getHomeFeed = (skip, limit) => ({
  type: GET_HOME_FEED,
  skip,
  limit,
});

export const composePost = (data) => ({
  type: CREATE_NEW_POST,
  data,
});

export const editPost = (data) => ({
  type: EDIT_POST,
  data,
});

export const deletePost = (data) => ({
  type: DELETE_POST,
  data,
});

export const hidePost = (postId) => ({
  type: HIDE_POST,
  postId,
});

export const hidePostsByUser = (userId) => ({
  type: HIDE_POSTS_BY_USER,
  userId,
});

export const resetDeletePost = () => ({
  type: RESET_DELETE_POST,
});

export const updateVideoViewCount = (parentId) => ({
  type: UPDATE_VIDEO_VIEWCOUNT,
  parentId,
});
