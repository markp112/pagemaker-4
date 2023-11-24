import dayjs from 'dayjs';

export interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}

export function formatDate(date: Date): string {
  const dateDayjs = dayjs(date);
  const dateString: string = dateDayjs.format("DD MMM YYYY").toString();
  console.log('%c⧭', 'color: #aa00ff', dateString);
  return dateString.replace(' ', '-');
}

export function formatTimeStampAsDate(date: TimeStamp): Date {
  const actualDate = new Date(date.seconds * 1000);
  return actualDate;
}

export function convertTimeStampDate(date: Date): Date {
  const tempDate: TimeStamp = (date as unknown) as TimeStamp;
  return new Date(tempDate.seconds * 1000);
}
