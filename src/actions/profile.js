export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_RESULT = 'PROFILE_RESULT';
export const PROFILE_ERROR = 'PROFILE_ERROR';

export const FOLLOW_USER_PRESS = 'FOLLOW_USER_PRESS';
export const FOLLOW_USER_PRESS_RESULT = 'FOLLOW_USER_PRESS_RESULT';
export const FOLLOW_USER_PRESS_ERROR = 'FOLLOW_USER_PRESS_ERROR';

export const getProfile = (user, skip, limit) => ({
  type: GET_PROFILE,
  user,
  skip,
  limit,
});

export const followUserPress = (user) => ({
  type: FOLLOW_USER_PRESS,
  user,
});
