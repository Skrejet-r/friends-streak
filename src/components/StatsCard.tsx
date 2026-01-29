import { Flame, Calendar } from 'lucide-react';

interface StatsCardProps {
  weekStreak: number;
  totalDays: number;
}

export default function StatsCard({ weekStreak, totalDays }: StatsCardProps) {
  return (
    <div className="stats-container">
      <div className="stat-card streak">
        <div className="stat-icon">
          <Flame size={32} />
        </div>
        <div className="stat-content">
          <div className="stat-label">Недельная Серия</div>
          <div className="stat-value">
            {weekStreak}
          </div>
          <div className="stat-sublabel">недель подряд</div>
        </div>
      </div>

      <div className="stat-card total">
        <div className="stat-icon">
          <Calendar size={32} />
        </div>
        <div className="stat-content">
          <div className="stat-label">Всего Дней</div>
          <div className="stat-value">
            {totalDays}
          </div>
          <div className="stat-sublabel">встреч с Sasha & Julia</div>
        </div>
      </div>
    </div>
  );
}
