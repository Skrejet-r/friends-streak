import { motion } from 'framer-motion';
import { DayData } from '../utils/dateUtils';

interface DayCardProps {
  day: DayData;
  index: number;
  onClick: () => void;
}

export default function DayCard({ day, index, onClick }: DayCardProps) {
  const dayOfWeek = day.date.toLocaleDateString('ru-RU', { weekday: 'short' });

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <motion.div
      className={`day-card ${day.hasMet ? 'met' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: index * 0.02,
        duration: 0.2,
      }}
    >
      <div
        className="day-content"
        onClick={handleClick}
        onTouchEnd={handleClick}
      >
        <div className="day-name">{dayOfWeek}</div>
        <motion.div
          className="day-number"
        >
          {day.date.getDate()}
        </motion.div>
        {day.hasMet && (
          <div className="checkmark">
            ⛧
          </div>
        )}
      </div>
    </motion.div>
  );
}
