import {
  COMMENT_FEED_RESULT,
  COMMENT_FEED_ERROR,
  LIKE_COMMENT_PRESS_RESULT,
  LIKE_COMMENT_PRESS_ERROR,
  NEW_COMMENT_RESULT,
  NEW_COMMENT_ERROR,
  EDIT_COMMENT_RESULT,
  EDIT_COMMENT_ERROR,
  RESET_COMMENT_UPDATE_CHECK,
  GET_COMMENT_FEED,
  DELETE_COMMENT_RESULT,
  DELETE_COMMENT_ERROR,
  HIDE_COMMENT_RESULT,
  HIDE_COMMENT_ERROR,
  HIDE_COMMENTS_BY_USER_RESULT,
  HIDE_COMMENTS_BY_USER_ERROR,
} from '../actions/comments';

const initialState = {
  error: null,
  success: null,
  fetching: false,
  parentId: '',
  commentFeed: [],
  commentsUpdateCheck: null,
};

const commentState = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_FEED: {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'RESET_COMMENT_FEED':
      return {
        ...state,
        commentFeed: [],
      };
    case COMMENT_FEED_RESULT:
      return {
        ...state,
        commentFeed: action.result,
        fetching: false,
        error: null,
      };
    case NEW_COMMENT_RESULT:
      return {
        ...state,
        commentFeed: action.result.comments,
        success: action.result.success,
        commentsUpdateCheck: {
          ...state.commentsUpdateCheck,
          id: action.result.id,
          commentId: action.result.commentId,
          fromScreen: action.result.fromScreen,
          type: action.result.type,
          comments: action.result.comments,
          action: action.result.action,
        },
        error: null,
      };
    case EDIT_COMMENT_RESULT:
      return {
        ...state,
        commentFeed: action.result.comments,
        success: action.result.success,
        error: null,
      };
    case RESET_COMMENT_UPDATE_CHECK:
      return {
        ...state,
        commentsUpdateCheck: null,
      };
    case LIKE_COMMENT_PRESS_RESULT:
      return {
        ...state,
        success: action.result.success,
        commentFeed: action.result.comments,
        error: null,
      };
    case DELETE_COMMENT_RESULT:
      return {
        ...state,
        success: action.result.success,
        commentsUpdateCheck: {
          ...state.commentsUpdateCheck,
          id: action.result.id,
          commentId: action.result.commentId,
          action: action.result.action,
          fromScreen: action.result.fromScreen,
          type: action.result.type,
          comments: action.result.comments,
        },
        commentFeed: action.result.comments,
      };
    case HIDE_COMMENT_RESULT:
      return {
        ...state,
        commentFeed: action.result,
        error: null,
      };
    case HIDE_COMMENTS_BY_USER_RESULT:
      return {
        ...state,
        commentFeed: action.result,
        error: null,
      };
    case COMMENT_FEED_ERROR:
    case LIKE_COMMENT_PRESS_ERROR:
    case NEW_COMMENT_ERROR:
    case DELETE_COMMENT_ERROR:
    case HIDE_COMMENT_ERROR:
    case HIDE_COMMENTS_BY_USER_ERROR:
    case EDIT_COMMENT_ERROR:
      return {
        ...state,
        error: action.error,
        fetching: false,
      };
    default:
      return state;
  }
};

export default commentState;
