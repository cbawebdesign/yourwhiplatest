import { put, call, select } from 'redux-saga/effects';

import {
  REPLY_FEED_RESULT,
  REPLY_FEED_ERROR,
  LIKE_REPLY_PRESS_RESULT,
  LIKE_REPLY_PRESS_ERROR,
  NEW_REPLY_RESULT,
  NEW_REPLY_ERROR,
  DELETE_REPLY_RESULT,
  DELETE_REPLY_ERROR,
} from '../actions/replies';

import { API_HOST } from '../config/constants';

const fetchReplyFeed = ({ action, token }) =>
  fetch(`${API_HOST}/get-reply-feed/${action.data.parentId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchLikeReplyPress = ({ action, token }) =>
  fetch(`${API_HOST}/like-reply-press/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.data.parentId,
      commentId: action.data.commentId,
    }),
  });

const fetchCompose = ({ data, token }) =>
  fetch(`${API_HOST}/compose-reply/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });

const fetchDeleteReply = ({ action, token }) =>
  fetch(`${API_HOST}/delete-reply/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.data.commentId,
      commentId: action.data.replyId,
    }),
  });

export function* getReplyFeed(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchReplyFeed, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: REPLY_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: REPLY_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: REPLY_FEED_ERROR, error: e.message });
  }
}

export function* likeReplyPress(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchLikeReplyPress, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: LIKE_REPLY_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: LIKE_REPLY_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: LIKE_REPLY_PRESS_ERROR, error: e.message });
  }
}

export function* composeReply(action) {
  const token = yield select((state) => state.auth.authToken);

  const formData = new FormData();
  formData.append('parentId', action.data.parentId);
  formData.append('commentId', action.data.commentId);
  formData.append('description', action.data.description);
  if (action.data.photo) {
    formData.append('photo', {
      uri: action.data.photo.uri,
      type: 'image/jpg',
      name: 'photo',
    });
  }

  try {
    const response = yield call(fetchCompose, { data: formData, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: NEW_REPLY_ERROR, error: result.error });
    } else {
      yield put({ type: NEW_REPLY_RESULT, result });
    }
  } catch (e) {
    yield put({ type: NEW_REPLY_ERROR, error: e.message });
  }
}

export function* deleteReply(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchDeleteReply, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: DELETE_REPLY_ERROR, error: result.error });
    } else {
      yield put({ type: DELETE_REPLY_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DELETE_REPLY_ERROR, error: e.message });
  }
}
