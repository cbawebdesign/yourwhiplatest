import { put, call, select } from 'redux-saga/effects';

import {
  SHARE_POST_PRESS_RESULT,
  SHARE_POST_PRESS_ERROR,
  SHARE_IMAGE_PRESS_RESULT,
  SHARE_IMAGE_PRESS_ERROR,
} from '../actions/shares';
import { API_HOST } from '../config/constants';

import { composePost } from './posts';

const fetchSharePost = ({ action, token }) =>
  fetch(`${API_HOST}/share-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.data.parentId,
      activityType: action.data.activityType,
    }),
  });

const fetchShareImage = ({ action, token }) =>
  fetch(`${API_HOST}/share-image/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageId: action.data.sharedImageId,
      activityType: action.data.activityType,
    }),
  });

export function* sharePost(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchSharePost, { action, token });

    // WAIT FOR 'FETCHSHAREPOST' CALL TO COMPLETE BEFORE COMPOSING
    // NEW POST. OTHERWISE NEW POST LIST BEING RETURNED BY CALL
    // WILL NOT INCLUDE 'SHARE' RESULT
    if (action.data.activityType === 'IN_APP_SHARE') {
      yield call(composePost, action);
    }

    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: SHARE_POST_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: SHARE_POST_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: SHARE_POST_PRESS_ERROR, error: e.message });
  }
}

export function* shareImage(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchShareImage, { action, token });

    // WAIT FOR 'FETCHSHAREIMAGE' CALL TO COMPLETE BEFORE COMPOSING
    // NEW POST. OTHERWISE NEW POST LIST BEING RETURNED BY CALL
    // WILL NOT INCLUDE 'SHARE' RESULT
    yield call(composePost, action);

    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: SHARE_IMAGE_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: SHARE_IMAGE_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: SHARE_IMAGE_PRESS_ERROR, error: e.message });
  }
}

export default { sharePost, fetchShareImage };
