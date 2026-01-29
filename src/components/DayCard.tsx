import { motion } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';
import { DayData } from '../utils/dateUtils';

interface DayCardProps {
  day: DayData;
  index: number;
  onClick: () => void;
}

export default function DayCard({ day, index, onClick }: DayCardProps) {
  const dayName = formatDate(day.date);
  const dayOfWeek = day.date.toLocaleDateString('ru-RU', { weekday: 'short' });

  return (
    <motion.div
      className={`day-card ${day.hasMet ? 'met' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -8,
        rotate: [0, -5, 5, 0]
      }}
      whileTap={{ scale: 0.9, rotate: 180 }}
      onClick={onClick}
    >
      <motion.div
        className="day-content"
      >
        <div className="day-name">{dayOfWeek}</div>
        <motion.div
          className="day-number"
        >
          {day.date.getDate()}
        </motion.div>
        {day.hasMet && (
          <motion.div
            className="checkmark"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 1.2, 1],
              rotate: [180, 0],
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300,
              damping: 15
            }}
          >
            ⛧
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
