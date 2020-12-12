export const GET_TIMELINE_FEED = 'GET_TIMELINE_FEED';
export const TIMELINE_FEED_RESULT = 'TIMELINE_FEED_RESULT';
export const TIMELINE_FEED_ERROR = 'TIMELINE_FEED_ERROR';

export const getTimelineFeed = (skip, limit) => ({
  type: GET_TIMELINE_FEED,
  skip,
  limit,
});
