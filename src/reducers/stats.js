import {
  STATS_FOR_MONTH_RESULT,
  STATS_FOR_MONTH_ERROR,
  GET_STATS_FOR_MONTH,
} from '../actions/stats';

const initialState = {
  fetching: false,
  error: null,
  stats: {
    likesCount: 0,
    followersCount: 0,
    likesGrowth: 0,
    followersGrowth: 0,
    dailyLikesList: [],
    dailyFollowersList: [],
  },
};

const statsState = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATS_FOR_MONTH:
      return {
        ...state,
        fetching: true,
      };
    case STATS_FOR_MONTH_RESULT:
      return {
        ...state,
        fetching: false,
        stats: {
          ...state.statsForMonthFeed,
          likesCount: action.result.likesCount,
          followersCount: action.result.followersCount,
          likesGrowth: action.result.likesGrowth,
          followersGrowth: action.result.followersGrowth,
          dailyLikesList: action.result.dailyLikesList,
          dailyFollowersList: action.result.dailyFollowersList,
        },
        error: null,
      };
    case STATS_FOR_MONTH_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default statsState;
