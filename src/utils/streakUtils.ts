import { startOfWeek, parseISO, subWeeks } from 'date-fns';
import { START_DATE, getWeekStart } from './dateUtils';
import { loadMetDays } from './storage';

export function calculateWeekStreak(): number {
  const metDays = loadMetDays();
  if (metDays.length === 0) return 0;

  // Konvertiere zu Date-Objekten
  const dates = metDays
    .map(d => parseISO(d))
    .filter(d => d >= START_DATE);

  if (dates.length === 0) return 0;

  // Erstelle Set von Wochen (als ISO-String)
  const weeksWithMeetings = new Set<string>();
  dates.forEach(date => {
    const weekStart = getWeekStart(date);
    weeksWithMeetings.add(weekStart.toISOString());
  });

  // Berechne Streak: Gehe von aktueller Woche rückwärts
  let streak = 0;
  let checkWeek = getWeekStart(new Date());
  const startWeek = getWeekStart(START_DATE);

  while (checkWeek >= startWeek) {
    const weekKey = checkWeek.toISOString();
    if (weeksWithMeetings.has(weekKey)) {
      streak++;
      checkWeek = startOfWeek(subWeeks(checkWeek, 1), { weekStartsOn: 1 });
    } else {
      break;
    }
  }

  return streak;
}

export function getTotalMetDays(): number {
  return loadMetDays().length;
}
