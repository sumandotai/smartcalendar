import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Note } from '../types';

interface Store {
  tasks: Task[];
  notes: Note[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  transferTask: (taskId: string, newDate: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      tasks: [],
      notes: [],
      addTask: (task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      addNote: (note) =>
        set((state) => ({ notes: [...state.notes, note] })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      transferTask: (taskId, newDate) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, date: newDate } : task
          ),
        })),
    }),
    {
      name: 'calendar-store',
    }
  )
);