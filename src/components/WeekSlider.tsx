import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWeekData, formatWeekRange, getDateFromWeekOffset, getWeeksFromStart, getToday } from '../utils/dateUtils';
import { isMetDay, toggleMetDay } from '../utils/storage';
import { calculateWeekStreak, getTotalMetDays } from '../utils/streakUtils';
import DayCard from './DayCard';
import StatsCard from './StatsCard';

export default function WeekSlider() {
  const today = getToday();
  const initialWeekOffset = getWeeksFromStart(today);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(initialWeekOffset);
  const [metDays, setMetDays] = useState<string[]>([]);
  const [weekStreak, setWeekStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  
  // Swipe-Gesten
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const currentDate = getDateFromWeekOffset(currentWeekOffset);
  const weekData = getWeekData(currentDate);

  useEffect(() => {
    // Lade gespeicherte Tage
    const stored = JSON.parse(localStorage.getItem('friendStreak_metDays') || '[]');
    setMetDays(stored);
    updateStats();
  }, []);

  useEffect(() => {
    updateStats();
  }, [metDays]);

  const updateStats = () => {
    setWeekStreak(calculateWeekStreak());
    setTotalDays(getTotalMetDays());
  };

  const handleDayClick = (date: Date) => {
    toggleMetDay(date);
    const dateStr = date.toISOString().split('T')[0];
    setMetDays(prev => {
      if (prev.includes(dateStr)) {
        return prev.filter(d => d !== dateStr);
      } else {
        return [...prev, dateStr];
      }
    });
  };

  const goToPreviousWeek = () => {
    setCurrentWeekOffset(prev => prev - 1);
  };

  const goToNextWeek = () => {
    const maxOffset = getWeeksFromStart(today);
    if (currentWeekOffset < maxOffset) {
      setCurrentWeekOffset(prev => prev + 1);
    }
  };

  // Swipe-Handler - nur auf dem Header, nicht auf den Tagen
  const minSwipeDistance = 80;
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    // Nur Swipe auf dem Header, nicht auf den Tagen
    const target = e.target as HTMLElement;
    if (target.closest('.days-grid') || target.closest('.day-card')) {
      return;
    }
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.days-grid') || target.closest('.day-card')) {
      return;
    }
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !touchStartY.current) return;
    
    const distanceX = touchStartX.current - touchEndX.current;
    const distanceY = Math.abs((touchStartY.current || 0) - (touchEndX.current || 0));
    
    // Nur horizontal swipen, nicht vertikal
    if (Math.abs(distanceX) < Math.abs(distanceY)) return;
    
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextWeek();
    }
    if (isRightSwipe) {
      goToPreviousWeek();
    }
    
    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
  };

  // weekDays wird automatisch aktualisiert, da isMetDay() immer die neuesten Daten aus localStorage liest
  const weekDays = weekData.days.map(day => ({
    ...day,
    hasMet: isMetDay(day.date),
  }));

  return (
    <div className="week-slider-container">
      <StatsCard weekStreak={weekStreak} totalDays={totalDays} />
      
      <div
        className="week-card"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="week-header">
          <button
            className="nav-button"
            onClick={goToPreviousWeek}
            type="button"
          >
            <ChevronLeft size={24} />
          </button>
          
          <h2
            key={currentWeekOffset}
            className="week-title"
          >
            {formatWeekRange(weekData.startDate, weekData.endDate)}
          </h2>
          
          <button
            className="nav-button"
            onClick={goToNextWeek}
            disabled={currentWeekOffset >= getWeeksFromStart(today)}
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="days-grid">
          {weekDays.map((day) => (
            <DayCard
              key={day.date.toISOString()}
              day={day}
              onClick={() => handleDayClick(day.date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
