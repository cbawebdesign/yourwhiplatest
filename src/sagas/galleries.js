import { put, call, select } from 'redux-saga/effects';

import {
  GALLERY_FEED_RESULT,
  GALLERY_FEED_ERROR,
  DELETE_GALLERY_RESULT,
  DELETE_GALLERY_ERROR,
} from '../actions/galleries';

import { API_HOST } from '../config/constants';

const fetchGalleryFeed = (token) =>
  fetch(`${API_HOST}/get-gallery-feed/`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export function* getGalleryFeed() {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchGalleryFeed, token);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: GALLERY_FEED_ERROR, error: result.error });
    } else {
      yield put({ type: GALLERY_FEED_RESULT, result });
    }
  } catch (e) {
    yield put({ type: GALLERY_FEED_ERROR, error: e.message });
  }
}

const fetchDeleteGallery = ({ action, token }) =>
  fetch(`${API_HOST}/delete-gallery/`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      galleryId: action.galleryId,
    }),
  });

export function* deleteGallery(action) {
  const token = yield select((state) => state.auth.authToken);

  try {
    const response = yield call(fetchDeleteGallery, { action, token });
    const result = yield response.json();

    if (result.error) {
      if (result.type === 'INVALID_TOKEN') {
        yield put({ type: 'INVALID_TOKEN' });
      }
      yield put({ type: DELETE_GALLERY_ERROR, error: result.error });
    } else {
      yield put({ type: DELETE_GALLERY_RESULT, result });
    }
  } catch (e) {
    yield put({ type: DELETE_GALLERY_ERROR, error: e.message });
  }
}
