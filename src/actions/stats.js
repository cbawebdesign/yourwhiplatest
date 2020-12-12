export const GET_STATS_FOR_MONTH = 'GET_STATS_FOR_MONTH';
export const STATS_FOR_MONTH_RESULT = 'STATS_FOR_MONTH_RESULT';
export const STATS_FOR_MONTH_ERROR = 'STATS_FOR_MONTH_ERROR';

export const getStatsForMonth = (date) => ({
  type: GET_STATS_FOR_MONTH,
  date,
});
