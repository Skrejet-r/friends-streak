const STORAGE_KEY = 'friendStreak_metDays';

export function saveMetDays(dates: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
  } catch (error) {
    console.error('Failed to save met days:', error);
  }
}

export function loadMetDays(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load met days:', error);
  }
  return [];
}

export function addMetDay(date: Date): void {
  const dates = loadMetDays();
  const dateStr = date.toISOString().split('T')[0];
  if (!dates.includes(dateStr)) {
    dates.push(dateStr);
    saveMetDays(dates);
  }
}

export function removeMetDay(date: Date): void {
  const dates = loadMetDays();
  const dateStr = date.toISOString().split('T')[0];
  const filtered = dates.filter(d => d !== dateStr);
  saveMetDays(filtered);
}

export function toggleMetDay(date: Date): void {
  const dates = loadMetDays();
  const dateStr = date.toISOString().split('T')[0];
  if (dates.includes(dateStr)) {
    removeMetDay(date);
  } else {
    addMetDay(date);
  }
}

export function isMetDay(date: Date): boolean {
  const dates = loadMetDays();
  const dateStr = date.toISOString().split('T')[0];
  return dates.includes(dateStr);
}
