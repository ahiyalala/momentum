export const pluralize = (str: string, val: number) => {
  return val == 1 ? `${str}` : `${str}s`;
};

export const secondsToTime = (totalSeconds: number) => {
  const minutes = parseInt((totalSeconds / 60).toString());
  const seconds = totalSeconds % 60;
  return minutes > 0
    ? `${minutes} ${pluralize("minute", minutes)}`
    : `${seconds} ${pluralize("second", seconds)}`;
};
