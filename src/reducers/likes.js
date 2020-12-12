import {
  LIKE_POST_PRESS_RESULT,
  LIKE_POST_PRESS_ERROR,
  RESET_NEW_LIKE_CHECK,
} from '../actions/likes';

const initialState = {
  error: null,
  success: null,
  newLikeCheck: null,
};

const likeState = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_POST_PRESS_RESULT:
      return {
        ...state,
        success: action.result.success,
        newLikeCheck: {
          ...state.newLikeCheck,
          fromScreen: action.result.fromScreen,
          id: action.result.id,
        },
        error: null,
      };
    case RESET_NEW_LIKE_CHECK:
      return {
        ...state,
        newLikeCheck: null,
      };
    case LIKE_POST_PRESS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default likeState;
