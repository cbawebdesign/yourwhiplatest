import * as SecureStore from 'expo-secure-store';

import {
  LOGIN,
  LOGIN_RESULT,
  LOGIN_ERROR,
  LOGOUT_RESULT,
  LOGOUT_ERROR,
  SIGNUP_STEP1,
  SIGNUP_STEP1_RESULT,
  SIGNUP_STEP1_ERROR,
  SIGNUP_STEP2,
  SIGNUP_RESULT,
  SIGNUP_ERROR,
  STORE_TOKEN,
  REQUEST_CODE,
  REQUEST_CODE_RESULT,
  REQUEST_CODE_ERROR,
  VALIDATE_CODE_RESULT,
  VALIDATE_CODE_ERROR,
  RESET_PASSWORD_RESULT,
  RESET_PASSWORD_ERROR,
  DELETE_ACCOUNT_RESULT,
  DELETE_ACCOUNT_ERROR,
  RESET_MESSAGES,
  RESET_PASSWORD,
  VALIDATE_CODE,
  LOGOUT,
  DELETE_ACCOUNT,
  ROUTE_CHECKS_COMPLETE,
} from '../actions/auth';
import { USER_INFO_ERROR } from '../actions/user';

const initialState = {
  fetching: true,
  error: null,
  success: null,
  signupData: null,
  firstName: '',
  lastName: '',
  signupEmail: '',
  signupPassword: '',
  authToken: null,
  user: null,
};

const signoutUser = async () => {
  await SecureStore.deleteItemAsync('token');
};

const authState = (state = initialState, action) => {
  switch (action.type) {
    case ROUTE_CHECKS_COMPLETE:
      return {
        ...state,
        fetching: false,
      };
    case STORE_TOKEN:
      return {
        ...state,
        authToken: action.token,
      };
    case LOGIN:
    case LOGOUT:
    case DELETE_ACCOUNT:
    case REQUEST_CODE:
    case RESET_PASSWORD:
    case VALIDATE_CODE:
      return {
        ...state,
        fetching: true,
      };
    case LOGIN_RESULT:
      return {
        ...state,
        fetching: false,
        error: null,
        authToken: action.result.token,
        user: action.result.user,
      };
    case LOGOUT_RESULT:
      return {
        ...state,
        fetching: false,
        authToken: null,
        error: null,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
        user: null,
      };
    case SIGNUP_STEP1:
      return {
        ...state,
        fetching: true,
        signupData: {
          ...state.signupData,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signupEmail: action.data.email,
          signupPassword: action.data.password,
        },
        firstName: action.data.firstName,
        lastName: action.data.lastName,
        signupEmail: action.data.email,
        signupPassword: action.data.password,
      };
    case SIGNUP_STEP1_RESULT:
      return {
        ...state,
        fetching: false,
        success: {
          ...state.success,
          signupStep1Success: action.result.success,
        },
        error: null,
      };
    case SIGNUP_STEP2:
      return {
        ...state,
        fetching: false,
        signupData: {
          ...state.signupData,
          birthday: action.userInfo.birthday,
          gender: action.userInfo.gender,
          location: action.userInfo.location,
          profileImage: action.userInfo.profileImage,
        },
      };
    case SIGNUP_RESULT:
      return {
        ...state,
        fetching: false,
        authToken: action.result.token,
        user: action.result.user,
        success: {
          ...state.success,
          signupSuccess: action.result.success,
        },
        error: null,
      };
    case REQUEST_CODE_RESULT:
      return {
        ...state,
        fetching: false,
        signupEmail: action.result.email,
        success: {
          ...state.success,
          requestCodeSuccess: action.result.success,
        },
        error: null,
      };
    case VALIDATE_CODE_RESULT:
      return {
        ...state,
        fetching: false,
        success: {
          ...state.success,
          validateCodeSuccess: action.result.success,
        },
        error: null,
      };
    case RESET_PASSWORD_RESULT:
      return {
        ...state,
        fetching: false,
        success: {
          ...state.success,
          passwordUpdateSuccess: action.result.success,
          authToken: action.result.token,
        },
        user: action.result.user,
        error: null,
      };
    case DELETE_ACCOUNT_RESULT:
      return {
        ...state,
        fetching: false,
        success: {
          ...state.success,
          accountDeleteSuccess: action.result.success,
        },
        authToken:
          action.result.fromScreen === 'SETTINGS' ? null : state.authToken,
        error: null,
      };
    case RESET_MESSAGES:
      return {
        ...state,
        success: null,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          loginError: action.error,
        },
      };
    case SIGNUP_STEP1_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          signupStep1Error: action.error,
        },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          signupError: action.error,
        },
      };
    case REQUEST_CODE_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          requestCodeError: action.error,
        },
      };
    case VALIDATE_CODE_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          validateCodeError: action.error,
        },
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          resetPasswordError: action.error,
        },
      };
    case DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        fetching: false,
        error: {
          ...state.error,
          deleteError: action.error,
        },
      };
    case USER_INFO_ERROR:
      SecureStore.deleteItemAsync('token');

      return {
        ...state,
        error: action.error,
        token: null,
      };
    case 'INVALID_TOKEN':
      signoutUser(state);

      return {
        ...state,
        error: {
          ...state.error,
          invalidToken: true,
        },
        authToken: null,
      };
    case 'RESET_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authState;
