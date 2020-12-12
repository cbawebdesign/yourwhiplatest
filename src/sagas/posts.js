import { put, call, select } from 'redux-saga/effects';

import {
  HOME_FEED_RESULT,
  HOME_FEED_ERROR,
  NEW_POST_RESULT,
  NEW_POST_ERROR,
  EDIT_POST_RESULT,
  EDIT_POST_ERROR,
  DELETE_POST_RESULT,
  DELETE_POST_ERROR,
  HIDE_POST_RESULT,
  HIDE_POST_ERROR,
  HIDE_POSTS_BY_USER_RESULT,
  HIDE_POSTS_BY_USER_ERROR,
  UPDATE_VIDEO_VIEWCOUNT_RESULT,
  UPDATE_VIDEO_VIEWCOUNT_ERROR,
} from '../actions/posts';
import { API_HOST } from '../config/constants';

const fetchHomeFeed = ({ action, token }) =>
  fetch(`${API_HOST}/get-home-feed/${action.skip}/${action.limit}/`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

const fetchCompose = ({ data, token }) =>
  fetch(`${API_HOST}/compose-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });

const fetchEdit = ({ data, token }) =>
  fetch(`${API_HOST}/edit-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });

const fetchDeletePost = ({ action, token }) =>
  fetch(`${API_HOST}/delete-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: action.data.postId,
      fromScreen: action.data.fromScreen,
    }),
  });

const fetchHidePost = ({ action, token }) =>
  fetch(`${API_HOST}/hide-post/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postId: action.postId,
    }),
  });

const fetchHidePostsByUser = ({ action, token }) =>
  fetch(`${API_HOST}/hide-posts-by-user/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hiddenUserId: action.userId,
    }),
  });

const fetchUpdateVideoViewCount = ({ action, token }) =>
  fetch(`${API_HOST}/update-video-viewcount/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parentId: action.parentId,
    }),
  });

export function* getHomeFeed(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchHomeFeed, {
      action,
      token,
    });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: HOME_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: HOME_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: HOME_FEED_ERROR, error: e.message });
  }
}

export function* composePost(action) {
  const token = yield select((state) => state.auth.authToken);

  const formData = new FormData();

  formData.append('description', action.data.description);
  formData.append('caption', action.data.caption);
  formData.append('parentId', action.data.sharedPostId);
  formData.append('imageId', action.data.sharedImageId);
  formData.append('limit', action.data.limit);

  if (action.data.gallery) {
    formData.append('galleryType', action.data.gallery.type);
    formData.append('galleryName', action.data.gallery.name);
  }

  if (action.data.media && action.data.media.images) {
    action.data.media.images.forEach((item) => {
      // CHECK FILE TYPES
      const ext = item.file.uri.substr(item.file.uri.length - 3).toLowerCase();

      if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
        formData.append('media', {
          uri: item.file.uri,
          type: `image/${ext}`,
          name: 'media',
        });
      } else if (ext === 'mp4' || ext === 'mov') {
        formData.append('media', {
          uri: item.localUri || item.file.uri,
          type: 'video/mp4',
          name: 'media',
        });
      }
    });
  } else if (action.data.media && action.data.media.video) {
    formData.append('media', {
      uri: action.data.media.video.uri,
      type: 'video/mp4',
      name: 'media',
    });
  }

  try {
    const response = yield call(fetchCompose, {
      data: formData,
      token,
    });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: NEW_POST_ERROR, error: result.error });
    } else {
      yield put({ type: NEW_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: NEW_POST_ERROR, error: e.message });
  }
}

export function* editPost(action) {
  const token = yield select((state) => state.auth.authToken);

  const formData = new FormData();

  formData.append('postId', action.data.postId);
  formData.append('description', action.data.description);
  formData.append('caption', action.data.caption);
  formData.append('parentId', action.data.sharedPostId);
  formData.append('imageId', action.data.sharedImageId);
  formData.append('limit', action.data.limit);

  if (action.data.gallery) {
    formData.append('galleryType', action.data.gallery.type);
    formData.append('galleryName', action.data.gallery.name);
  }

  if (action.data.media && action.data.media.images) {
    action.data.media.images.forEach((item) => {
      if (item.file) {
        // CHECK FILE TYPES
        const ext = item.file.uri
          .substr(item.file.uri.length - 3)
          .toLowerCase();

        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
          formData.append('media', {
            uri: item.file.uri,
            type: `image/${ext}`,
            name: 'media',
          });
        } else if (ext === 'mp4' || ext === 'mov') {
          formData.append('media', {
            uri: item.localUri || item.file.uri,
            type: 'video/mp4',
            name: 'media',
          });
        }
      }
    });
  } else if (action.data.media && action.data.media.video) {
    formData.append('media', {
      uri: action.data.media.video.uri,
      type: 'video/mp4',
      name: 'media',
    });
  }

  try {
    const response = yield call(fetchEdit, {
      data: formData,
      token,
    });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: EDIT_POST_ERROR, error: result.error });
    } else {
      yield put({ type: EDIT_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: EDIT_POST_ERROR, error: e.message });
  }
}

export function* deletePost(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchDeletePost, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: DELETE_POST_ERROR, error: result.error });
    } else {
      yield put({ type: DELETE_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DELETE_POST_ERROR, error: e.message });
  }
}

export function* hidePost(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchHidePost, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: HIDE_POST_ERROR, error: result.error });
    } else {
      yield put({ type: HIDE_POST_RESULT, result });
    }
  } catch (e) {
    yield put({ type: HIDE_POST_ERROR, error: e.message });
  }
}

export function* hidePostsByUser(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchHidePostsByUser, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: HIDE_POSTS_BY_USER_ERROR, error: result.error });
    } else {
      yield put({ type: HIDE_POSTS_BY_USER_RESULT, result });
    }
  } catch (e) {
    yield put({ type: HIDE_POSTS_BY_USER_ERROR, error: e.message });
  }
}

export function* updateVideoViewCount(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchUpdateVideoViewCount, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: UPDATE_VIDEO_VIEWCOUNT_ERROR, error: result.error });
    } else {
      yield put({ type: UPDATE_VIDEO_VIEWCOUNT_RESULT, result });
    }
  } catch (e) {
    yield put({ type: UPDATE_VIDEO_VIEWCOUNT_ERROR, error: e.message });
  }
}
