import {
  GET_FLAGGED_POSTS_FEED_RESULT,
  GET_FLAGGED_POSTS_FEED_ERROR,
  GET_FLAGGED_COMMENTS_FEED_RESULT,
  GET_FLAGGED_COMMENTS_FEED_ERROR,
  REPORT_POST_RESULT,
  REPORT_POST_ERROR,
  UNFLAG_POST_RESULT,
  UNFLAG_POST_ERROR,
  UNFLAG_COMMENT_RESULT,
  UNFLAG_COMMENT_ERROR,
  REPORT_COMMENT_RESULT,
  REPORT_COMMENT_ERROR,
} from '../actions/flagged';
import { DELETE_POST_RESULT } from '../actions/posts';
import { DELETE_ACCOUNT_RESULT } from '../actions/auth';

import { PAGINATION_LIMIT } from '../config/constants';

const initialState = {
  error: null,
  success: null,
  fetching: true,
  endOfList: false,
  flaggedPostsFeed: [],
  flaggedCommentsFeed: [],
};

const flaggedState = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLAGGED_POSTS_FEED_RESULT:
      return {
        ...state,
        ...state,
        flaggedPostsFeed:
          action.result.skip === '0'
            ? action.result.flaggedPostsFeed
            : [...state.flaggedPostsFeed, ...action.result.flaggedPostsFeed],
        endOfList: action.result.flaggedPostsFeed.length < PAGINATION_LIMIT,
        fetching: false,
        error: null,
      };
    case GET_FLAGGED_COMMENTS_FEED_RESULT:
      return {
        ...state,
        flaggedCommentsFeed: action.result.flaggedCommentsFeed,
        fetching: false,
        error: null,
      };
    case REPORT_POST_RESULT:
      return {
        ...state,
        flaggedPostsFeed: action.result.flaggedFeed,
        success: {
          ...state.success,
          reportPostSuccess: action.result.success,
        },
      };
    case REPORT_COMMENT_RESULT:
      return {
        ...state,
        flaggedCommentsFeed: action.result.flaggedCommentsFeed,
        success: {
          ...state.success,
          reportCommentSuccess: action.result.success,
        },
      };
    case UNFLAG_POST_RESULT:
      return {
        ...state,
        flaggedPostsFeed: state.flaggedPostsFeed.filter(
          (post) => post._id.toString() !== action.result.postId.toString()
        ),
      };
    case UNFLAG_COMMENT_RESULT:
      return {
        ...state,
        flaggedCommentsFeed: state.flaggedCommentsFeed.filter(
          (comment) =>
            comment._id.toString() !== action.result.commentId.toString()
        ),
      };
    case DELETE_POST_RESULT:
      return {
        ...state,
        flaggedPostsFeed: state.flaggedPostsFeed.filter(
          (item) => item._id !== action.result.postId
        ),
      };
    case DELETE_ACCOUNT_RESULT:
      return {
        ...state,
        flaggedPostsFeed: state.flaggedPostsFeed.filter(
          (item) => item.createdBy._id !== action.result.deletedUserId
        ),
        flaggedCommentsFeed: state.flaggedCommentsFeed.filter(
          (item) => item.createdBy._id !== action.result.deletedUserId
        ),
      };
    case 'RESET_SUCCESS':
      return {
        ...state,
        success: null,
      };
    case GET_FLAGGED_POSTS_FEED_ERROR:
    case GET_FLAGGED_COMMENTS_FEED_ERROR:
    case REPORT_POST_ERROR:
    case REPORT_COMMENT_ERROR:
    case UNFLAG_POST_ERROR:
    case UNFLAG_COMMENT_ERROR:
      return {
        ...state,
        error: action.error,
        success: null,
        fetching: false,
      };
    default:
      return state;
  }
};

export default flaggedState;
