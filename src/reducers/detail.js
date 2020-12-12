import {
  DETAIL_POST_RESULT,
  DETAIL_POST_ERROR,
  LIKE_IMAGE_PRESS_RESULT,
  LIKE_IMAGE_PRESS_ERROR,
} from '../actions/detail';

const initialState = {
  error: null,
  success: null,
  detailPost: null,
};

const homeState = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_POST_RESULT:
      return {
        ...state,
        detailPost: action.result,
        error: null,
      };
    case 'RESET_DETAILPOST':
      return {
        ...state,
        detailPost: null,
      };
    case LIKE_IMAGE_PRESS_RESULT:
      return {
        ...state,
        success: action.result.success,
        error: null,
      };
    case DETAIL_POST_ERROR:
    case LIKE_IMAGE_PRESS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default homeState;
