import { put, call, select } from 'redux-saga/effects';

import {
  STATS_FOR_MONTH_RESULT,
  STATS_FOR_MONTH_ERROR,
} from '../actions/stats';
import { API_HOST } from '../config/constants';

const fetchStatsForMonth = ({ action, token }) =>
  fetch(
    `${API_HOST}/get-stats-for-month/${new Date(action.date).getFullYear()}/${
      new Date(action.date).getMonth() + 1
    }`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

export function* getStatsForMonth(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchStatsForMonth, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: STATS_FOR_MONTH_ERROR, error: result.error });
    } else {
      yield put({ type: STATS_FOR_MONTH_RESULT, result });
    }
  } catch (e) {
    yield put({ type: STATS_FOR_MONTH_ERROR, error: e.message });
  }
}

export default { getStatsForMonth };
