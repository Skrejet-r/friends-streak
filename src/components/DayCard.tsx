import { DayData } from '../utils/dateUtils';

interface DayCardProps {
  day: DayData;
  onClick: () => void;
}

export default function DayCard({ day, onClick }: DayCardProps) {
  const dayOfWeek = day.date.toLocaleDateString('ru-RU', { weekday: 'short' });

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={`day-card ${day.hasMet ? 'met' : ''}`}
    >
      <div
        className="day-content"
        onClick={handleClick}
        onTouchEnd={handleClick}
      >
        <div className="day-name">{dayOfWeek}</div>
        <div className="day-number">
          {day.date.getDate()}
        </div>
        {day.hasMet && (
          <div className="checkmark">
            ⛧
          </div>
        )}
      </div>
    </div>
  );
}
