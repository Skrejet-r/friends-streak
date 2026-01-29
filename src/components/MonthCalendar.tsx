import { getDaysInMonth, startOfMonth, eachDayOfInterval, format, isSameMonth, getDay } from 'date-fns';
import { ru } from 'date-fns/locale';
import { isMetDay } from '../utils/storage';

interface MonthCalendarProps {
  currentDate: Date;
}

export default function MonthCalendar({ currentDate }: MonthCalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfWeek = getDay(monthStart); // 0 = Sunday, 1 = Monday, etc.
  
  // Adjust for Monday as first day (0 = Monday)
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  const days = eachDayOfInterval({
    start: monthStart,
    end: new Date(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth)
  });

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  return (
    <div className="month-calendar">
      <div className="month-calendar-header">
        {format(currentDate, 'MMMM yyyy', { locale: ru })}
      </div>
      <div className="month-calendar-weekdays">
        {weekDays.map((day, idx) => (
          <div key={idx} className="month-weekday">{day}</div>
        ))}
      </div>
      <div className="month-calendar-grid">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: adjustedFirstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="month-day empty"></div>
        ))}
        {/* Days of the month */}
        {days.map((day) => {
          const hasMet = isMetDay(day);
          const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          return (
            <div
              key={day.toISOString()}
              className={`month-day ${hasMet ? 'met' : ''} ${isToday ? 'today' : ''}`}
              title={format(day, 'd MMMM yyyy', { locale: ru })}
            >
              <span className="month-day-number">{day.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
