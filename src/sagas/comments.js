import { put, call, select } from 'redux-saga/effects';

import {
  COMMENT_FEED_RESULT,
  COMMENT_FEED_ERROR,
  LIKE_COMMENT_PRESS_RESULT,
  LIKE_COMMENT_PRESS_ERROR,
  NEW_COMMENT_RESULT,
  NEW_COMMENT_ERROR,
  EDIT_COMMENT_RESULT,
  EDIT_COMMENT_ERROR,
  DELETE_COMMENT_RESULT,
  DELETE_COMMENT_ERROR,
  HIDE_COMMENT_RESULT,
  HIDE_COMMENT_ERROR,
  HIDE_COMMENTS_BY_USER_RESULT,
  HIDE_COMMENTS_BY_USER_ERROR,
} from '../actions/comments';

import { API_HOST } from '../config/constants';

const fetchCommentFeed = ({ action, token }) =>
  fetch(
    `${API_HOST}/get-comment-feed/${action.data.parentId}/${action.data.feedType}`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );

const fetchLikeCommentPress = ({ action, token }) =>
  fetch(`${API_HOST}/like-comment-press/`, {
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
  fetch(`${API_HOST}/compose-comment/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });

const fetchEdit = ({ data, token }) =>
  fetch(`${API_HOST}/edit-comment/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });

const fetchDeleteComment = ({ action, token }) =>
  fetch(`${API_HOST}/delete-comment/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      commentId: action.data.commentId,
      parentId: action.data.postId,
      fromScreen: action.data.fromScreen,
      type: action.data.type,
    }),
  });

const fetchHideComment = ({ action, token }) =>
  fetch(`${API_HOST}/hide-comment/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.data.parentId,
      commentId: action.data.commentId,
      type: action.data.type,
    }),
  });

const fetchHideCommentsByUser = ({ action, token }) =>
  fetch(`${API_HOST}/hide-comments-by-user/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.data.parentId,
      hiddenUserId: action.data.userId,
      type: action.data.type,
    }),
  });

export function* getCommentFeed(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchCommentFeed, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: COMMENT_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: COMMENT_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: COMMENT_FEED_ERROR, error: e.message });
  }
}

export function* likeCommentPress(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchLikeCommentPress, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: LIKE_COMMENT_PRESS_ERROR, error: result.error });
    } else {
      yield put({ type: LIKE_COMMENT_PRESS_RESULT, result });
    }
  } catch (e) {
    yield put({ type: LIKE_COMMENT_PRESS_ERROR, error: e.message });
  }
}

export function* composeComment(action) {
  const token = yield select((state) => state.auth.authToken);

  const formData = new FormData();
  formData.append('fromScreen', action.data.fromScreen);
  formData.append('type', action.data.type);
  formData.append('parentId', action.data.parentId);
  formData.append('description', action.data.description);
  // TODO: ADD COMMENT IMAGE
  // if (action.data.photo) {
  //   formData.append('photo', {
  //     uri: action.data.photo.uri,
  //     type: 'image/jpg',
  //     name: 'photo',
  //   });
  // }

  try {
    const response = yield call(fetchCompose, { data: formData, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: NEW_COMMENT_ERROR, error: result.error });
    } else {
      yield put({ type: NEW_COMMENT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: NEW_COMMENT_ERROR, error: e.message });
  }
}

export function* editComment(action) {
  const token = yield select((state) => state.auth.authToken);

  const formData = new FormData();
  formData.append('commentId', action.data.commentId);
  formData.append('fromScreen', action.data.fromScreen);
  formData.append('type', action.data.type);
  formData.append('parentId', action.data.parentId);
  formData.append('description', action.data.description);
  // TODO: ADD COMMENT IMAGE
  // if (action.data.photo) {
  //   formData.append('photo', {
  //     uri: action.data.photo.uri,
  //     type: 'image/jpg',
  //     name: 'photo',
  //   });
  // }

  try {
    const response = yield call(fetchEdit, { data: formData, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: EDIT_COMMENT_ERROR, error: result.error });
    } else {
      yield put({ type: EDIT_COMMENT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: EDIT_COMMENT_ERROR, error: e.message });
  }
}

export function* deleteComment(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchDeleteComment, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: DELETE_COMMENT_ERROR, error: result.error });
    } else {
      yield put({ type: DELETE_COMMENT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DELETE_COMMENT_ERROR, error: e.message });
  }
}

export function* hideComment(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchHideComment, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: HIDE_COMMENT_ERROR, error: result.error });
    } else {
      yield put({ type: HIDE_COMMENT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: HIDE_COMMENT_ERROR, error: e.message });
  }
}

export function* hideCommentsByUser(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchHideCommentsByUser, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: HIDE_COMMENTS_BY_USER_ERROR, error: result.error });
    } else {
      yield put({ type: HIDE_COMMENTS_BY_USER_RESULT, result });
    }
  } catch (e) {
    yield put({ type: HIDE_COMMENTS_BY_USER_ERROR, error: e.message });
  }
}
