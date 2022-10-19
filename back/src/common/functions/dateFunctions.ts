import dayjs from 'dayjs';

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
};

export function formatDate(date: Date): string {
  const dateDayjs = dayjs(date);
  return dateDayjs.format("DD MMM YYYY");
};

export function formatTimeStampAsDate(date: TimeStamp): Date {
  const actualDate = new Date(date.seconds * 1000);
  return actualDate;
};

export function convertTimeStampDate(date: Date): Date {
  const tempDate: TimeStamp = (date as unknown) as TimeStamp;
  return new Date(tempDate.seconds * 1000);
};
