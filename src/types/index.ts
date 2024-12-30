export interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  isTimer?: boolean;
  dueDate?: string;
}

export interface Note {
  id: string;
  content: string;
  date: string;
}