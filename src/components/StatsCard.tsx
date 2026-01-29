import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';

interface StatsCardProps {
  weekStreak: number;
  totalDays: number;
}

export default function StatsCard({ weekStreak, totalDays }: StatsCardProps) {
  return (
    <motion.div
      className="stats-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="stat-card streak"
        whileHover={{ 
          scale: 1.08, 
          y: -8,
          rotate: [0, -2, 2, 0]
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div
          className="stat-icon"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatDelay: 1 }
          }}
        >
          <Flame size={32} />
        </motion.div>
        <div className="stat-content">
          <div className="stat-label">Недельная Серия</div>
          <motion.div
            className="stat-value"
            key={weekStreak}
            initial={{ scale: 1.2, color: '#ff0000' }}
            animate={{ scale: 1, color: '#ff0000' }}
            transition={{ duration: 0.3 }}
          >
            {weekStreak}
          </motion.div>
          <div className="stat-sublabel">недель подряд</div>
        </div>
      </motion.div>

      <motion.div
        className="stat-card total"
        whileHover={{ 
          scale: 1.08, 
          y: -8,
          rotate: [0, 2, -2, 0]
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.div 
          className="stat-icon"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, repeatDelay: 1 }
          }}
        >
          <Calendar size={32} />
        </motion.div>
        <div className="stat-content">
          <div className="stat-label">Всего Дней</div>
          <motion.div
            className="stat-value"
            key={totalDays}
            initial={{ scale: 1.2, color: '#ff0000' }}
            animate={{ scale: 1, color: '#ff0000' }}
            transition={{ duration: 0.3 }}
          >
            {totalDays}
          </motion.div>
          <div className="stat-sublabel">встреч с Sasha & Julia</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
