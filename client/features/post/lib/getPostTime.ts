interface TimeAgoResult {
  time: number;
  unit: string;
}

export const getPostTime = (timestamp: string): TimeAgoResult => {
  const now = new Date().getTime();

  const timestampDate = new Date(timestamp).getTime();

  const diff = now - timestampDate;

  if (timestampDate < 0) {
    return { time: 0, unit: 'ancient' };
  }

  const timeIntervals = [
    { name: 'now', milliseconds: 0 },
    { name: 'minute', milliseconds: 60 * 1000 },
    { name: 'hour', milliseconds: 60 * 60 * 1000 },
    { name: 'day', milliseconds: 24 * 60 * 60 * 1000 },
    { name: 'month', milliseconds: 30 * 24 * 60 * 60 * 1000 },
    { name: 'year', milliseconds: 365 * 24 * 60 * 60 * 1000 },
  ];

  const timeInterval = timeIntervals.findLast((interval) => diff >= interval.milliseconds)!;

  const time = Math.floor(diff / timeInterval.milliseconds);

  return { time, unit: time > 1 ? `${timeInterval.name}s` : timeInterval.name };
};
