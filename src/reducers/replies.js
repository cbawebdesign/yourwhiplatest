import {
  GET_REPLY_FEED,
  REPLY_FEED_RESULT,
  REPLY_FEED_ERROR,
  LIKE_REPLY_PRESS_RESULT,
  LIKE_REPLY_PRESS_ERROR,
  NEW_REPLY_RESULT,
  NEW_REPLY_ERROR,
  DELETE_REPLY_RESULT,
  DELETE_REPLY_ERROR,
} from '../actions/replies';

const initialState = {
  error: null,
  success: null,
  fetching: false,
  replyFeed: [],
  updateReplyCheck: null,
};

const replyState = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPLY_FEED:
      return {
        ...state,
        fetching: true,
      };
    case 'RESET_REPLY_FEED':
      return {
        ...state,
        replyFeed: [],
      };
    case REPLY_FEED_RESULT:
      return {
        ...state,
        fetching: false,
        replyFeed: action.result,
        error: null,
      };
    case NEW_REPLY_RESULT:
      return {
        ...state,
        replyFeed: action.result.replies,
        success: action.result.success,
        updateReplyCheck: {
          ...state.updateReplyCheck,
          id: action.result.id,
          replyId: action.result.replyId,
        },
        error: null,
      };
    case 'RESET_UPDATE_REPLY_CHECK':
      return {
        ...state,
        updateReplyCheck: null,
      };
    case LIKE_REPLY_PRESS_RESULT:
      return {
        ...state,
        success: action.result.success,
        error: null,
      };
    case DELETE_REPLY_RESULT:
      return {
        ...state,
        success: action.result.success,
        replyFeed: action.result.replies,
        updateReplyCheck: {
          ...state.newCommentCheck,
          id: action.result.id,
          replyId: action.result.replyId,
          action: action.result.action,
        },
        error: null,
      };
    case REPLY_FEED_ERROR:
    case LIKE_REPLY_PRESS_ERROR:
    case NEW_REPLY_ERROR:
    case DELETE_REPLY_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default replyState;
