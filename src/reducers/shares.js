import {
  SHARE_POST_PRESS_RESULT,
  SHARE_POST_PRESS_ERROR,
  SHARE_IMAGE_PRESS_RESULT,
  SHARE_IMAGE_PRESS_ERROR,
} from '../actions/shares';

const initialState = {
  error: null,
  success: null,
};

const shareState = (state = initialState, action) => {
  switch (action.type) {
    case SHARE_POST_PRESS_RESULT:
    case SHARE_IMAGE_PRESS_RESULT:
      return {
        ...state,
        success: action.result.success,
        error: null,
      };
    case SHARE_POST_PRESS_ERROR:
    case SHARE_IMAGE_PRESS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default shareState;
