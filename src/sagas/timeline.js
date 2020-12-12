import { put, call, select } from 'redux-saga/effects';

import { TIMELINE_FEED_RESULT, TIMELINE_FEED_ERROR } from '../actions/timeline';
import { API_HOST } from '../config/constants';

const fetchTimelineFeed = ({ action, token }) =>
  fetch(`${API_HOST}/get-timeline-feed/${action.skip}/${action.limit}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export function* getTimelineFeed(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchTimelineFeed, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: TIMELINE_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: TIMELINE_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: TIMELINE_FEED_ERROR, error: e.message });
  }
}

export default { getTimelineFeed };
