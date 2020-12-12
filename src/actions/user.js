import { showOneSignalStatus } from '../helpers/socialHelpers';

export const GET_USER_INFO = 'GET_USER_INFO';
export const USER_INFO_RESULT = 'USER_INFO_RESULT';
export const USER_INFO_ERROR = 'USER_INFO_ERROR';

export const UPDATE_INTERESTS = 'UPDATE_INTERESTS';
export const UPDATE_INTERESTS_RESULT = 'UPDATE_INTERESTS_RESULT';
export const UPDATE_INTERESTS_ERROR = 'UPDATE_INTERESTS_ERROR';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_SETTINGS_RESULT = 'UPDATE_SETTINGS_RESULT';
export const UPDATE_SETTINGS_ERROR = 'UPDATE_SETTINGS_ERROR';

export const WALKTHROUGH_COMPLETE = 'WALKTHROUGH_COMPLETE';

export const GET_RECOMMENDED_USERS = 'GET_RECOMMENDED_USERS';
export const RECOMMENDED_USERS_RESULT = 'RECOMMENDED_USERS_RESULT';
export const RECOMMENDED_USERS_ERROR = 'RECOMMENDED_USERS_ERROR';

export const REMOVE_USER_PRESS = 'REMOVE_USER_PRESS';
export const REMOVE_USER_PRESS_RESULT = 'REMOVE_USER_PRESS_RESULT';
export const REMOVE_USER_PRESS_ERROR = 'REMOVE_USER_PRESS_ERROR';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_RESULT = 'EDIT_PROFILE_RESULT';
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR';

export const SEARCH = 'SEARCH';
export const SEARCH_RESULT = 'SEARCH_RESULT';
export const SEARCH_ERROR = 'SEARCH_ERROR';

export const SET_ONESIGNAL_CONSENT = 'SET_ONESIGNAL_CONSENT';
export const SET_ONESIGNAL_CONSENT_RESULT = 'SET_ONESIGNAL_CONSENT_RESULT';
export const SET_ONESIGNAL_CONSENT_ERROR = 'SET_ONESIGNAL_CONSENT_ERROR';

export const RESET_USER = 'RESET_USER';

export const UPDATE_NOTIFICATION_SETTINGS = 'UPDATE_NOTIFICATION_SETTINGS';

export const SHOW_NOTIFICATIONS_MODAL = 'SHOW_NOTIFICATIONS_MODAL';

export const getUserInfo = (token) => ({
  type: GET_USER_INFO,
  token,
});

export const updateInterests = (interests) => ({
  type: UPDATE_INTERESTS,
  interests,
});

export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  settings,
});

export const setWalkthroughComplete = () => ({
  type: WALKTHROUGH_COMPLETE,
});

export const getRecommendedUsers = () => ({
  type: GET_RECOMMENDED_USERS,
});

export const removeUserPress = (user) => ({
  type: REMOVE_USER_PRESS,
  user,
});

export const editProfile = (userInfo) => ({
  type: EDIT_PROFILE,
  userInfo,
});

export const resetUser = () => ({
  type: RESET_USER,
});

export const search = (input) => ({
  type: SEARCH,
  input,
});

export const updateNotificationSettings = (enableNotifications) => ({
  type: UPDATE_NOTIFICATION_SETTINGS,
  enableNotifications,
});

export const displayNotificationsModal = (showModal) => ({
  type: SHOW_NOTIFICATIONS_MODAL,
  showModal,
});

export const setOnesignalConsent = (consent) => ({
  type: SET_ONESIGNAL_CONSENT,
  consent,
});
