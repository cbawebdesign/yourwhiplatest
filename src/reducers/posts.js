import {
  CREATE_NEW_POST,
  HOME_FEED_RESULT,
  HOME_FEED_ERROR,
  NEW_POST_RESULT,
  NEW_POST_ERROR,
  EDIT_POST,
  EDIT_POST_RESULT,
  EDIT_POST_ERROR,
  DELETE_POST_RESULT,
  DELETE_POST_ERROR,
  RESET_DELETE_POST,
  HIDE_POST_RESULT,
  HIDE_POST_ERROR,
  HIDE_POSTS_BY_USER_RESULT,
  HIDE_POSTS_BY_USER_ERROR,
} from '../actions/posts';
import { LOGOUT_RESULT, DELETE_ACCOUNT_RESULT } from '../actions/auth';

import { PAGINATION_LIMIT } from '../config/constants';

const initialState = {
  error: null,
  success: null,
  fetching: true,
  homeFeed: [],
  endOfList: false,
  deletedPost: null,
};

const homeState = (state = initialState, action) => {
  switch (action.type) {
    case HOME_FEED_RESULT:
      return {
        ...state,
        homeFeed:
          action.result.skip === '0'
            ? action.result.homeFeed
            : [...state.homeFeed, ...action.result.homeFeed],
        endOfList: action.result.homeFeed.length < PAGINATION_LIMIT,
        fetching: false,
        error: null,
      };
    case CREATE_NEW_POST:
    case EDIT_POST:
      return {
        ...state,
        fetching: true,
      };
    case NEW_POST_RESULT:
      return {
        ...state,
        homeFeed: action.result,
        fetching: false,
        error: null,
      };
    case EDIT_POST_RESULT:
      return {
        ...state,
        homeFeed: action.result,
        fetching: false,
        error: null,
      };
    case DELETE_POST_RESULT:
      return {
        ...state,
        deletedPost: {
          ...state.deletedPost,
          postId: action.result.postId,
          fromScreen: action.result.fromScreen,
        },
        homeFeed: state.homeFeed.filter(
          (item) => item._id !== action.result.postId
        ),
      };
    case DELETE_ACCOUNT_RESULT:
      return {
        ...state,
        homeFeed: state.homeFeed.filter(
          (item) => item.createdBy._id !== action.result.deletedUserId
        ),
      };
    case HIDE_POST_RESULT:
      return {
        ...state,
        homeFeed: action.result,
        error: null,
      };
    case HIDE_POSTS_BY_USER_RESULT:
      return {
        ...state,
        homeFeed: action.result,
        error: null,
      };
    case RESET_DELETE_POST:
      return {
        ...state,
        deletedPost: null,
      };
    case LOGOUT_RESULT:
      return {
        ...state,
        homeFeed: [],
      };
    case NEW_POST_ERROR:
    case EDIT_POST_ERROR:
    case HOME_FEED_ERROR:
    case DELETE_POST_ERROR:
    case HIDE_POST_ERROR:
    case HIDE_POSTS_BY_USER_ERROR:
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

export default homeState;
