import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const navigate = useNavigate();
  const tasks = useStore((state) => state.tasks);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => 
      isSameDay(new Date(task.date), date)
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-4 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-semibold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayTasks = getTasksForDate(day);
          const hasOverdueTasks = dayTasks.some(
            (task) => !task.completed && new Date(task.date) < new Date()
          );

          return (
            <motion.button
              key={day.toString()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/date/${format(day, 'yyyy-MM-dd')}`)}
              className={`
                aspect-square p-2 rounded-lg border transition-all
                ${isSameMonth(day, currentDate)
                  ? 'bg-white hover:bg-gray-50'
                  : 'bg-gray-50 text-gray-400'}
                ${hasOverdueTasks ? 'border-red-300' : 'border-gray-200'}
                ${isToday(day) ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              <div className="text-right mb-1">{format(day, 'd')}</div>
              {dayTasks.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`w-2 h-2 rounded-full ${
                        task.completed ? 'bg-green-400' : 'bg-blue-400'
                      }`}
                    />
                  ))}
                  {dayTasks.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{dayTasks.length - 3}
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};