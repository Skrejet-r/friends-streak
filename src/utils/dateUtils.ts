import { startOfWeek, endOfWeek, eachDayOfInterval, format, addWeeks, subWeeks, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export const START_DATE = new Date('2026-01-01');

export interface DayData {
  date: Date;
  hasMet: boolean;
}

export interface WeekData {
  startDate: Date;
  endDate: Date;
  days: DayData[];
}

export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1, locale: ru });
}

export function getWeekEnd(date: Date): Date {
  return endOfWeek(date, { weekStartsOn: 1, locale: ru });
}

export function getWeekData(date: Date): WeekData {
  const start = getWeekStart(date);
  const end = getWeekEnd(date);
  const days = eachDayOfInterval({ start, end }).map(day => ({
    date: day,
    hasMet: false,
  }));

  return {
    startDate: start,
    endDate: end,
    days,
  };
}

export function getWeeksFromStart(targetDate: Date): number {
  const startWeek = getWeekStart(START_DATE);
  const targetWeek = getWeekStart(targetDate);
  const diffTime = targetWeek.getTime() - startWeek.getTime();
  const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
  return diffWeeks;
}

export function getDateFromWeekOffset(weeksOffset: number): Date {
  const startWeek = getWeekStart(START_DATE);
  return addWeeks(startWeek, weeksOffset);
}

export function formatDate(date: Date): string {
  return format(date, 'd MMM', { locale: ru });
}

export function formatWeekRange(start: Date, end: Date): string {
  const startStr = format(start, 'd MMM', { locale: ru });
  const endStr = format(end, 'd MMM yyyy', { locale: ru });
  return `${startStr} - ${endStr}`;
}

export function isSameDayDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

export function getToday(): Date {
  return new Date();
}
