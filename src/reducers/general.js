import { SET_DEEP_LINK_SLUG, RESET_DEEP_LINK_SLUG } from '../actions/general';

const initialState = {
  deepLinkSlug: null,
  error: null,
  success: null,
};

const generalState = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEEP_LINK_SLUG:
      return {
        ...state,
        deepLinkSlug: action.slug,
      };
    case RESET_DEEP_LINK_SLUG:
      return {
        ...state,
        deepLinkSlug: null,
      };
    default:
      return state;
  }
};

export default generalState;
