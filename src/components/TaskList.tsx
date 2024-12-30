import React from 'react';
import { Plus, Timer } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskListProps {
  date: string;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
}

export const TaskList = ({ date, showCompleted, setShowCompleted }: TaskListProps) => {
  const [newTask, setNewTask] = React.useState('');
  const { tasks, addTask, toggleTask } = useStore();

  const dateTasks = tasks.filter((task) => task.date === date);
  const activeTasks = dateTasks.filter((task) => !task.completed);
  const completedTasks = dateTasks.filter((task) => task.completed);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    addTask({
      id: crypto.randomUUID(),
      title: newTask,
      completed: false,
      date: date,
    });
    setNewTask('');
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Tasks</h2>
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {showCompleted ? 'Show Active' : 'Show Completed'}
        </button>
      </div>

      <form onSubmit={handleAddTask} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </form>

      <AnimatePresence mode="popLayout">
        <div className="space-y-2">
          {(showCompleted ? completedTasks : activeTasks).map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
              />
              <span
                className={`flex-1 ${
                  task.completed ? 'text-gray-500 line-through' : ''
                }`}
              >
                {task.title}
              </span>
              {task.isTimer && <Timer className="w-5 h-5 text-gray-400" />}
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
};