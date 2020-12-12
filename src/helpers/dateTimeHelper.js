export const getMonthHelper = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getWeeksHelper = () => {
  const weeksList = [];
  for (let i = 0; i <= 51; i++) {
    weeksList.push(i.toString());
  }

  return weeksList;
};

export const getDaysHelper = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getPeriodsHelper = (type, date, i) => {
  const periodsList = [];

  const currentYear = new Date(Date.now()).getFullYear();
  const currentMonth = new Date(Date.now()).getMonth();
  const startingYear = new Date(date).getFullYear();
  const startingMonth = new Date(date).getMonth();
  const currentWeek = getWeek(Date.now());
  const startingWeek = getWeek(date);

  const items = type === 'month' ? getMonthHelper : getWeeksHelper();

  for (let index = 0; index < items.length; index++) {
    const startingPeriod = type === 'month' ? startingMonth : startingWeek;
    const currentPeriod = type === 'month' ? currentMonth : currentWeek;

    if (
      i === startingYear &&
      startingYear === currentYear &&
      index >= startingPeriod &&
      index <= currentPeriod
    ) {
      periodsList.push(items[index]);
    }

    if (
      i === startingYear &&
      startingYear !== currentYear &&
      index >= startingPeriod
    ) {
      periodsList.push(items[index]);
    }

    if (i > startingYear && i < currentYear) {
      periodsList.push(items[index]);
    }

    if (
      i === currentYear &&
      startingYear !== currentYear &&
      index <= currentPeriod
    ) {
      periodsList.push(items[index]);
    }
  }

  return periodsList;
};

export const getTimeHelper = (dateTime, showTime = false) => {
  const timeOfPost = new Date(dateTime);
  const now = new Date().getTime();
  const minute = 60000;
  const timeDifference = now - timeOfPost.getTime();
  const differenceInHours = Math.round(timeDifference / (minute * 60));
  const differenceInDays = Math.round(timeDifference / (minute * 1440));
  const differenceInMonths = Math.round(timeDifference / (minute * 43200));

  if (timeDifference < minute * 5) {
    return 'Just now';
  }

  if (showTime) {
    const minutes = new Date(timeOfPost).getMinutes();

    return `${new Date(timeOfPost).getHours()}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  }

  if (timeDifference < minute * 60) {
    return `${Math.ceil(timeDifference / (minute * 60) / 5) * 5} minutes`;
  }

  if (differenceInHours > 0 && differenceInHours < 24) {
    return `${
      differenceInHours === 1
        ? `${differenceInHours} hour`
        : `${differenceInHours} hours`
    }`;
  }

  if (differenceInDays > 0 && differenceInDays < 31) {
    return `${
      differenceInDays === 1
        ? `${differenceInDays} day`
        : `${differenceInDays} days`
    }`;
  }

  return `${
    differenceInMonths === 1
      ? `${differenceInMonths} month`
      : `${differenceInMonths} months`
  }`;
};

// BORROWED FROM STACKOVERFLOW ANSWER ROBG
// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
const getWeek = (date) => {
  const dateObject = new Date(date);
  const d = new Date(
    Date.UTC(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate()
    )
  );
  const dayNum = d.getUTCDay() || 7;

  d.setUTCDate(d.getUTCDate() + 4 - dayNum);

  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));

  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

export default {
  getMonthHelper,
  getTimeHelper,
  getDaysHelper,
  getPeriodsHelper,
};
