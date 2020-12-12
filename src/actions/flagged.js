export const GET_FLAGGED_POSTS_FEED = 'GET_FLAGGED_POSTS_FEED';
export const GET_FLAGGED_POSTS_FEED_RESULT = 'GET_FLAGGED_POSTS_FEED_RESULT';
export const GET_FLAGGED_POSTS_FEED_ERROR = 'GET_FLAGGED_POSTS_FEED_ERROR';

export const GET_FLAGGED_COMMENTS_FEED = 'GET_FLAGGED_COMMENTS_FEED';
export const GET_FLAGGED_COMMENTS_FEED_RESULT =
  'GET_FLAGGED_COMMENTS_FEED_RESULT';
export const GET_FLAGGED_COMMENTS_FEED_ERROR =
  'GET_FLAGGED_COMMENTS_FEED_ERROR';

export const REPORT_POST = 'REPORT_POST';
export const REPORT_POST_RESULT = 'REPORT_POST_RESULT';
export const REPORT_POST_ERROR = 'REPORT_POST_ERROR';

export const REPORT_COMMENT = 'REPORT_COMMENT';
export const REPORT_COMMENT_RESULT = 'REPORT_COMMENT_RESULT';
export const REPORT_COMMENT_ERROR = 'REPORT_COMMENT_ERROR';

export const UNFLAG_POST = 'UNFLAG_POST';
export const UNFLAG_POST_RESULT = 'UNFLAG_POST_RESULT';
export const UNFLAG_POST_ERROR = 'UNFLAG_POST_ERROR';

export const UNFLAG_COMMENT = 'UNFLAG_COMMENT';
export const UNFLAG_COMMENT_RESULT = 'UNFLAG_COMMENT_RESULT';
export const UNFLAG_COMMENT_ERROR = 'UNFLAG_COMMENT_ERROR';

export const getFlaggedPostsFeed = (skip, limit) => ({
  type: GET_FLAGGED_POSTS_FEED,
  skip,
  limit,
});

export const getFlaggedCommentsFeed = () => ({
  type: GET_FLAGGED_COMMENTS_FEED,
});

export const reportPost = (postId) => ({
  type: REPORT_POST,
  postId,
});

export const reportComment = (commentId) => ({
  type: REPORT_COMMENT,
  commentId,
});

export const unflagPost = (postId) => ({
  type: UNFLAG_POST,
  postId,
});

export const unflagComment = (commentId) => ({
  type: UNFLAG_COMMENT,
  commentId,
});
