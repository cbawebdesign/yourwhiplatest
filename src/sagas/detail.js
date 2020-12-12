import { put, call, select } from 'redux-saga/effects';

import {
  DETAIL_POST_RESULT,
  DETAIL_POST_ERROR,
  LIKE_IMAGE_PRESS_RESULT,
  LIKE_IMAGE_PRESS_ERROR,
} from '../actions/detail';
import { API_HOST } from '../config/constants';

const fetchOnePost = ({ action, token }) =>
  fetch(`${API_HOST}/get-detail-post/${action.parentId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchLikeImagePress = ({ action, token }) =>
  fetch(`${API_HOST}/like-image-press/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageId: action.imageId,
    }),
  });

export function* getOnePost(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchOnePost, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: DETAIL_POST_ERROR, error: result.error });
    } else {
      yield put({ type: DETAIL_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DETAIL_POST_ERROR, error: e.message });
  }
}

export function* likeImagePress(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchLikeImagePress, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: LIKE_IMAGE_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: LIKE_IMAGE_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: LIKE_IMAGE_PRESS_ERROR, error: e.message });
  }
}

export default { getOnePost, likeImagePress };
