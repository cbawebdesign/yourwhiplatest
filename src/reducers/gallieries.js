import {
  GALLERY_FEED_RESULT,
  GALLERY_FEED_ERROR,
  GET_GALLERY_FEED,
  DELETE_GALLERY_RESULT,
  DELETE_GALLERY_ERROR,
} from '../actions/galleries';

const initialState = {
  fetching: false,
  error: null,
  success: null,
  galleryFeed: [],
};

const galleryState = (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY_FEED:
      return {
        ...state,
        fetching: true,
      };
    case GALLERY_FEED_RESULT:
      return {
        ...state,
        fetching: false,
        galleryFeed: action.result.galleries,
        error: null,
      };
    case DELETE_GALLERY_RESULT:
      return {
        ...state,
        fetching: false,
        error: null,
        galleryFeed: action.result.galleries,
      };
    case GALLERY_FEED_ERROR:
    case DELETE_GALLERY_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default galleryState;
