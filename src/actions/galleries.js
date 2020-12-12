export const GET_GALLERY_FEED = 'GET_GALLERY_FEED';
export const GALLERY_FEED_RESULT = 'GALLERY_FEED_RESULT';
export const GALLERY_FEED_ERROR = 'GALLERY_FEED_ERROR';

export const DELETE_GALLERY = 'DELETE_GALLERY';
export const DELETE_GALLERY_RESULT = 'DELETE_GALLERY_RESULT';
export const DELETE_GALLERY_ERROR = 'DELETE_GALLERY_ERROR';

export const getGalleryFeed = () => ({
  type: GET_GALLERY_FEED,
});

export const deleteGallery = (galleryId) => ({
  type: DELETE_GALLERY,
  galleryId,
});
