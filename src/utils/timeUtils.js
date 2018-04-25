export const secondsToHHMMSS = secondsToFormat => {
  const intSeconds = parseInt(secondsToFormat, 10);
  const hours = `0${parseInt(intSeconds / 3600, 10)}`.slice(-2);
  const min = `0${parseInt((intSeconds % 3600) / 60, 10)}`.slice(-2);
  const seconds = `0${intSeconds % 60}`.slice(-2);
  return `${hours}:${min}:${seconds}`;
};
