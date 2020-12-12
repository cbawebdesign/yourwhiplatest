import { put, call, select } from 'redux-saga/effects';

import {
  PROFILE_RESULT,
  PROFILE_ERROR,
  FOLLOW_USER_PRESS_RESULT,
  FOLLOW_USER_PRESS_ERROR,
} from '../actions/profile';
import { API_HOST } from '../config/constants';

const fetchProfile = ({ action, token }) =>
  fetch(
    `${API_HOST}/get-profile/${action.user._id}/${action.skip}/${action.limit}`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

const fetchFollowUserPress = ({ action, token }) =>
  fetch(`${API_HOST}/follow-user-press/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: action.user,
    }),
  });

export function* getProfile(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchProfile, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: PROFILE_ERROR, error: result.error });
    } else {
      yield put({ type: PROFILE_RESULT, result });
    }
  } catch (e) {
    yield put({ type: PROFILE_ERROR, error: e.message });
  }
}

export function* followUserPress(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchFollowUserPress, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: FOLLOW_USER_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: FOLLOW_USER_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: FOLLOW_USER_PRESS_ERROR, error: e.message });
  }
}

export default { getProfile, followUserPress };
