import { put, call, select } from 'redux-saga/effects';
import * as SecureStore from 'expo-secure-store';

import {
  LOGIN_RESULT,
  LOGIN_ERROR,
  LOGOUT_RESULT,
  LOGOUT_ERROR,
  SIGNUP_STEP1_RESULT,
  SIGNUP_STEP1_ERROR,
  SIGNUP_RESULT,
  SIGNUP_ERROR,
  REQUEST_CODE_RESULT,
  REQUEST_CODE_ERROR,
  VALIDATE_CODE_RESULT,
  VALIDATE_CODE_ERROR,
  RESET_PASSWORD_RESULT,
  RESET_PASSWORD_ERROR,
  DELETE_ACCOUNT_RESULT,
  DELETE_ACCOUNT_ERROR,
} from '../actions/auth';
import { API_HOST, PERSONAL_DESCRIPTION } from '../config/constants';

import { RESET_USER } from '../actions/user';

const fetchLogin = (action) =>
  fetch(`${API_HOST}/login/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: action.email,
      password: action.password,
    }),
  });

const fetchLogout = (token) =>
  fetch(`${API_HOST}/logout/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchSignupStep1 = ({ data }) =>
  fetch(`${API_HOST}/signup-step1/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    }),
  });

const fetchSignupStep2 = (formData) =>
  fetch(`${API_HOST}/signup-step2/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });

const fetchRequestCode = (action) =>
  fetch(`${API_HOST}/request-code/${action.email}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchValidateCode = ({ email, action }) =>
  fetch(`${API_HOST}/validate-code/${email}/${action.code}`, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchResetPassword = ({ email, action }) =>
  fetch(`${API_HOST}/reset-password/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: action.password,
    }),
  });

const fetchDeleteAccount = ({ token, action }) =>
  fetch(`${API_HOST}/delete-account/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: action.userId,
      fromScreen: action.fromScreen,
    }),
  });

export function* login(action) {
  try {
    const response = yield call(fetchLogin, action);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: LOGIN_ERROR, error: result.error });
    } else {
      SecureStore.setItemAsync('token', result.token);

      yield put({ type: LOGIN_RESULT, result });
    }
  } catch (e) {
    yield put({ type: LOGIN_ERROR, error: e.message });
  }
}

export function* logout() {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchLogout, token);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: LOGOUT_ERROR, error: result.error });
    } else {
      SecureStore.deleteItemAsync('token');

      yield put({ type: LOGOUT_RESULT, result });
      yield put({ type: RESET_USER });
    }
  } catch (e) {
    yield put({ type: LOGOUT_ERROR, error: e.message });
  }
}

export function* signupStep1(action) {
  try {
    const response = yield call(fetchSignupStep1, action);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: SIGNUP_STEP1_ERROR, error: result.error });
    } else {
      yield put({ type: SIGNUP_STEP1_RESULT, result });
    }
  } catch (e) {
    yield put({ type: SIGNUP_STEP1_ERROR, error: e.message });
  }
}

export function* signupStep3(action) {
  const {
    firstName,
    lastName,
    signupEmail,
    signupPassword,
    birthday,
    gender,
    location,
    profileImage,
  } = yield select((state) => state.auth.signupData);

  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', signupEmail);
  formData.append('password', signupPassword);
  if (birthday) {
    formData.append('birthday', birthday.toString());
  }
  formData.append('gender', gender);
  formData.append('location', location);
  formData.append('description', PERSONAL_DESCRIPTION);
  if (profileImage && profileImage.uri) {
    formData.append('profileImage', {
      uri: profileImage.uri,
      type: 'image/jpg',
      name: 'profileImage',
    });
  }
  formData.append('onesignalConsent', action.onesignalConsent);

  try {
    const response = yield call(fetchSignupStep2, formData);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: SIGNUP_ERROR, error: result.error });
    } else {
      SecureStore.setItemAsync('token', result.token);

      yield put({ type: SIGNUP_RESULT, result });
    }
  } catch (e) {
    yield put({ type: SIGNUP_ERROR, error: e.message });
  }
}

export function* requestCode(action) {
  try {
    const response = yield call(fetchRequestCode, action);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: REQUEST_CODE_ERROR, error: result.error });
    } else {
      yield put({ type: REQUEST_CODE_RESULT, result });
    }
  } catch (e) {
    yield put({ type: REQUEST_CODE_ERROR, error: e.message });
  }
}

export function* validateCode(action) {
  const email = yield select((state) => state.auth.signupEmail);

  try {
    const response = yield call(fetchValidateCode, { email, action });
    const result = yield response.json();

    if (result.error) {
      yield put({ type: VALIDATE_CODE_ERROR, error: result.error });
    } else {
      yield put({ type: VALIDATE_CODE_RESULT, result });
    }
  } catch (e) {
    yield put({ type: VALIDATE_CODE_ERROR, error: e.message });
  }
}

export function* resetPassword(action) {
  const email = yield select((state) =>
    state.user.user ? state.user.user.email : state.auth.signupEmail
  );

  try {
    const response = yield call(fetchResetPassword, { email, action });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: RESET_PASSWORD_ERROR, error: result.error });
    } else {
      yield put({ type: RESET_PASSWORD_RESULT, result });
    }
  } catch (e) {
    yield put({ type: RESET_PASSWORD_ERROR, error: e.message });
  }
}

export function* deleteAccount(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchDeleteAccount, { token, action });
    const result = yield response.json();

    if (result.error) {
      yield put({ type: DELETE_ACCOUNT_ERROR, error: result.error });
    } else {
      if (result.fromScreen === 'SETTINGS') {
        SecureStore.deleteItemAsync('token');
        SecureStore.deleteItemAsync('walkthroughComplete');
      }

      yield put({ type: DELETE_ACCOUNT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DELETE_ACCOUNT_ERROR, error: e.message });
  }
}
