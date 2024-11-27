import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '../types';

interface TaskContextType {
  tasks: Task[];
  fetchTasks: (page?: number, limit?: number) => Promise<void>;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
  total: number;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchTasks = async (page = 1, limit = 30) => {
    setLoading(true);
    setError(null);
    try {
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
      const data = await response.json();
      setTasks(data.todos);
      setTotal(data.total);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const createdTask = await response.json();
      setTasks((prev) => [...prev, createdTask]);
    } catch {
      setError('Failed to add task');
    }
  };

  const editTask = async (updatedTask: Task) => {
    try {
      await fetch(`https://dummyjson.com/todos/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch {
      setError('Failed to edit task');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider 
      value={{
        tasks,
        fetchTasks,
        addTask,
        editTask,
        deleteTask,
        loading,
        error,
        total
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
