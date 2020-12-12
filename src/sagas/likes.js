import { put, call, select } from 'redux-saga/effects';

import {
  LIKE_POST_PRESS_RESULT,
  LIKE_POST_PRESS_ERROR,
} from '../actions/likes';
import { API_HOST } from '../config/constants';

const fetchLikePostPress = ({ action, token }) =>
  fetch(`${API_HOST}/like-post-press/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fromScreen: action.data.fromScreen,
      parentId: action.data.parentId,
    }),
  });

export function* likePostPress(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchLikePostPress, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: LIKE_POST_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: LIKE_POST_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: LIKE_POST_PRESS_ERROR, error: e.message });
  }
}

export default { likePostPress };
