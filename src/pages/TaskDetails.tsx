import React from 'react';
import { useParams } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';

const TaskDetails = () => {
  const { id } = useParams();
  const { tasks } = useTaskContext();
  const task = tasks.find((task) => task.id.toString() === id);

  if (!task) {
    return <p>Task not found!</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{task.todo}</h1>
      <p>{task.completed}</p>
    </div>
  );
};

export default TaskDetails;
