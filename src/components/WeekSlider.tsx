import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Swipe-Handler
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextWeek();
    }
    if (isRightSwipe) {
      goToPreviousWeek();
    }
  };

  // weekDays wird automatisch aktualisiert, da isMetDay() immer die neuesten Daten aus localStorage liest
  const weekDays = weekData.days.map(day => ({
    ...day,
    hasMet: isMetDay(day.date),
  }));

  return (
    <div className="week-slider-container">
      <StatsCard weekStreak={weekStreak} totalDays={totalDays} />
      
      <motion.div
        className="week-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="week-header">
          <motion.button
            className="nav-button"
            onClick={goToPreviousWeek}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.h2
            key={currentWeekOffset}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="week-title"
          >
            {formatWeekRange(weekData.startDate, weekData.endDate)}
          </motion.h2>
          
          <motion.button
            className="nav-button"
            onClick={goToNextWeek}
            disabled={currentWeekOffset >= getWeeksFromStart(today)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        <div className="days-grid">
          <AnimatePresence mode="wait">
            {weekDays.map((day, index) => (
              <DayCard
                key={day.date.toISOString()}
                day={day}
                index={index}
                onClick={() => handleDayClick(day.date)}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
