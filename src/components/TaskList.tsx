import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  deleteTask:(id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, deleteTask }) => {

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          editTask={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
