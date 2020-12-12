import * as SecureStore from 'expo-secure-store';

import {
  USER_INFO_RESULT,
  UPDATE_INTERESTS_RESULT,
  UPDATE_INTERESTS_ERROR,
  UPDATE_SETTINGS_RESULT,
  UPDATE_SETTINGS_ERROR,
  WALKTHROUGH_COMPLETE,
  RECOMMENDED_USERS_RESULT,
  RECOMMENDED_USERS_ERROR,
  REMOVE_USER_PRESS_RESULT,
  REMOVE_USER_PRESS_ERROR,
  EDIT_PROFILE_RESULT,
  EDIT_PROFILE_ERROR,
  SEARCH_RESULT,
  SEARCH_ERROR,
  EDIT_PROFILE,
  GET_RECOMMENDED_USERS,
  SHOW_NOTIFICATIONS_MODAL,
  SET_ONESIGNAL_CONSENT_RESULT,
  SET_ONESIGNAL_CONSENT_ERROR,
} from '../actions/user';
import { RESET_MESSAGES } from '../actions/auth';
import { FOLLOW_USER_PRESS_RESULT } from '../actions/profile';

const initialState = {
  fetching: false,
  error: null,
  success: null,
  editProfileFetching: false,
  user: null,
  appSettings: null,
  walkthroughComplete: false,
  recommendedFeed: [],
  usersSearchFeed: [],
  showNotificationsModal: false,
  onesignalConsent: false,
};

const userState = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        editProfileFetching: true,
      };
    case UPDATE_SETTINGS_RESULT:
      return {
        ...state,
        user: {
          ...state.user,
          settings: action.result,
        },
      };
    case GET_RECOMMENDED_USERS:
      return {
        ...state,
        fetching: true,
      };
    case RESET_MESSAGES: {
      return {
        ...state,
        error: null,
        success: null,
      };
    }
    case USER_INFO_RESULT:
      return {
        ...state,
        user: action.result.user,
        appSettings: action.result.app,
        onesignalConsent: action.result.user.onesignalConsent,
      };
    case UPDATE_INTERESTS_RESULT:
      return {
        ...state,
        user: {
          ...state.user,
          interests: action.result,
        },
      };
    case WALKTHROUGH_COMPLETE:
      SecureStore.setItemAsync('walkthroughComplete', 'true');

      return {
        ...state,
        walkthroughComplete: true,
      };
    case FOLLOW_USER_PRESS_RESULT:
      return {
        ...state,
        user: action.result,
      };
    case REMOVE_USER_PRESS_RESULT:
      return {
        ...state,
        recommendedFeed: action.result,
      };
    case RECOMMENDED_USERS_RESULT:
      return {
        ...state,
        fetching: false,
        recommendedFeed: action.result,
        error: null,
      };
    case SEARCH_RESULT:
      return {
        ...state,
        usersSearchFeed: action.result.users,
        error: null,
      };
    case SET_ONESIGNAL_CONSENT_RESULT:
      return {
        ...state,
        onesignalConsent: action.result,
      };
    case SHOW_NOTIFICATIONS_MODAL:
      return {
        ...state,
        showNotificationsModal: action.showModal,
      };
    case 'RESET_USER':
      return {
        ...state,
        user: null,
      };
    case 'RESET_PROFILE':
      return {
        ...state,
        success: null,
        error: null,
      };
    case 'REMOVE_WALKTHROUGH_COMPLETE':
      return {
        ...state,
        walkthroughComplete: false,
      };
    case EDIT_PROFILE_RESULT:
      return {
        ...state,
        success: {
          ...state.success,
          editProfileSuccess: action.result.success,
        },
        editProfileFetching: false,
        user: action.result.user,
      };
    case UPDATE_INTERESTS_ERROR:
    case UPDATE_SETTINGS_ERROR:
    case RECOMMENDED_USERS_ERROR:
    case REMOVE_USER_PRESS_ERROR:
    case EDIT_PROFILE_ERROR:
    case SEARCH_ERROR:
    case SET_ONESIGNAL_CONSENT_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
        usersSearchFeed: [],
      };
    default:
      return state;
  }
};

export default userState;
