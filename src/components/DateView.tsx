import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, isToday, parseISO, addDays } from 'date-fns';
import { ArrowLeft, Plus, Timer, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { TaskList } from './TaskList';
import { NoteList } from './NoteList';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';

export const DateView = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [showCompleted, setShowCompleted] = React.useState(false);
  const { tasks, transferTask } = useStore();

  const incompleteTasks = tasks.filter(
    (task) => task.date === date && !task.completed
  );

  const handleTransferTasks = () => {
    const nextDay = format(addDays(parseISO(date!), 1), 'yyyy-MM-dd');
    incompleteTasks.forEach((task) => {
      transferTask(task.id, nextDay);
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto p-4"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-semibold">
            {isToday(parseISO(date!))
              ? 'Today'
              : format(parseISO(date!), 'MMMM d, yyyy')}
          </h1>
        </div>
        <div className="flex gap-2">
          {incompleteTasks.length > 0 && (
            <Button
              variant="secondary"
              onClick={handleTransferTasks}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Transfer incomplete tasks to next day"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <TaskList 
          date={date!} 
          showCompleted={showCompleted} 
          setShowCompleted={setShowCompleted} 
        />
        <NoteList date={date!} />
      </div>
    </motion.div>
  );
};