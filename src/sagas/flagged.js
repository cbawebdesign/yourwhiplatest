import { put, call, select } from 'redux-saga/effects';

import {
  GET_FLAGGED_POSTS_FEED_RESULT,
  GET_FLAGGED_POSTS_FEED_ERROR,
  GET_FLAGGED_COMMENTS_FEED_RESULT,
  GET_FLAGGED_COMMENTS_FEED_ERROR,
  REPORT_POST_RESULT,
  REPORT_POST_ERROR,
  UNFLAG_POST_RESULT,
  UNFLAG_POST_ERROR,
  UNFLAG_COMMENT_RESULT,
  UNFLAG_COMMENT_ERROR,
  REPORT_COMMENT_RESULT,
  REPORT_COMMENT_ERROR,
} from '../actions/flagged';
import { API_HOST } from '../config/constants';

const fetchFlaggedPostsFeed = ({ action, token }) =>
  fetch(`${API_HOST}/get-flagged-posts-feed/${action.skip}/${action.limit}/`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchFlaggedCommentsFeed = (token) =>
  fetch(`${API_HOST}/get-flagged-comments-feed/`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchReportPost = ({ action, token }) =>
  fetch(`${API_HOST}/report-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.postId,
    }),
  });

const fetchUnflagPost = ({ action, token }) =>
  fetch(`${API_HOST}/unflag-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.postId,
    }),
  });

const fetchUnflagComment = ({ action, token }) =>
  fetch(`${API_HOST}/unflag-comment/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentId: action.commentId,
    }),
  });

const fetchReportComment = ({ action, token }) =>
  fetch(`${API_HOST}/report-comment/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentId: action.commentId,
    }),
  });

export function* getFlaggedPostsFeed(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchFlaggedPostsFeed, {
      action,
      token,
    });
    const result = yield response.json();

    if (result.error) {
      yield put({ type: GET_FLAGGED_POSTS_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: GET_FLAGGED_POSTS_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: GET_FLAGGED_POSTS_FEED_ERROR, error: e.message });
  }
}

export function* getFlaggedCommentsFeed() {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchFlaggedCommentsFeed, token);
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: GET_FLAGGED_COMMENTS_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: GET_FLAGGED_COMMENTS_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: GET_FLAGGED_COMMENTS_FEED_ERROR, error: e.message });
  }
}

export function* reportPost(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchReportPost, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: REPORT_POST_ERROR, error: result.error });
    } else {
      yield put({ type: REPORT_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: REPORT_POST_ERROR, error: e.message });
  }
}

export function* unflagPost(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchUnflagPost, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: UNFLAG_POST_ERROR, error: result.error });
    } else {
      yield put({ type: UNFLAG_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: UNFLAG_POST_ERROR, error: e.message });
  }
}

export function* unflagComment(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchUnflagComment, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: UNFLAG_COMMENT_ERROR, error: result.error });
    } else {
      yield put({ type: UNFLAG_COMMENT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: UNFLAG_COMMENT_ERROR, error: e.message });
  }
}

export function* reportComment(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchReportComment, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: REPORT_COMMENT_ERROR, error: result.error });
    } else {
      yield put({ type: REPORT_COMMENT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: REPORT_COMMENT_ERROR, error: e.message });
  }
}
