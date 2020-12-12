export const LOGIN = 'LOGIN';
export const LOGIN_RESULT = 'LOGIN_RESULT';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_RESULT = 'LOGOUT_RESULT';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const SIGNUP_STEP1 = 'SIGNUP_STEP1';
export const SIGNUP_STEP1_RESULT = 'SIGNUP_STEP1_RESULT';
export const SIGNUP_STEP1_ERROR = 'SIGNUP_STEP1_ERROR';

export const SIGNUP_STEP2 = 'SIGNUP_STEP2';

export const SIGNUP_STEP3 = 'SIGNUP_STEP3';
export const SIGNUP_RESULT = 'SIGNUP_RESULT';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const STORE_TOKEN = 'STORE_TOKEN';

export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const REQUEST_CODE = 'REQUEST_CODE';
export const REQUEST_CODE_RESULT = 'REQUEST_CODE_RESULT';
export const REQUEST_CODE_ERROR = 'REQUEST_CODE_ERROR';

export const VALIDATE_CODE = 'VALIDATE_CODE';
export const VALIDATE_CODE_RESULT = 'VALIDATE_CODE_RESULT';
export const VALIDATE_CODE_ERROR = 'VALIDATE_CODE_ERROR';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_RESULT = 'RESET_PASSWORD_RESULT';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';

export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const DELETE_ACCOUNT_RESULT = 'DELETE_ACCOUNT_RESULT';
export const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR';

export const RESET_MESSAGES = 'RESET_MESSAGES';
export const ROUTE_CHECKS_COMPLETE = 'ROUTE_CHECKS_COMPLETE';

export const login = (email, password) => ({
  type: LOGIN,
  email,
  password,
});

export const logout = () => ({
  type: LOGOUT,
});

export const signupStep1 = (data) => ({
  type: SIGNUP_STEP1,
  data,
});

export const signupStep2 = (userInfo) => ({
  type: SIGNUP_STEP2,
  userInfo,
});

export const signupStep3 = (onesignalConsent) => ({
  type: SIGNUP_STEP3,
  onesignalConsent,
});

export const storeToken = (token) => ({
  type: STORE_TOKEN,
  token,
});

export const requestCode = (email) => ({
  type: REQUEST_CODE,
  email,
});

export const validateCode = (code) => ({
  type: VALIDATE_CODE,
  code,
});

export const resetPassword = (password) => ({
  type: RESET_PASSWORD,
  password,
});

export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

export const routeChecksComplete = () => ({
  type: ROUTE_CHECKS_COMPLETE,
});

export const deleteAccount = (userId, fromScreen) => ({
  type: DELETE_ACCOUNT,
  userId,
  fromScreen,
});
