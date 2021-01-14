export const pluralize = (str: string, val: number) => {
  return val == 1 ? `${str}` : `${str}s`;
};

export const secondsToTime = (totalSeconds: number) => {
  const hours = parseInt((totalSeconds / 60 / 60).toString());
  const minutes = parseInt((totalSeconds / 60).toString());
  const seconds = totalSeconds % 60;
  const hourStr = hours > 0 ? `${hours} ${pluralize("hour", hours)} ` : ``;
  const minuteStr =
    minutes > 0 ? `${minutes} ${pluralize("minute", minutes)} ` : ``;
  const secondStr =
    seconds > 0 ? `${seconds} ${pluralize("second", seconds)}` : ``;
  return `${hourStr}${minuteStr}${secondStr}`;
};
