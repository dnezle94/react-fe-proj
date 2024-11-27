import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { tasks, deleteTask,loading, error } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter((task) =>
    task.todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Todos</h2>
        <div className="flex item-center space-x-4">
          <input
            type="text"
            placeholder="Search todo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full max-w-xs rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          />
          <button
            onClick={() => navigate(`/task/${0}`)}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </div>
      {loading && <p>Loading todo...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <TaskList tasks={filteredTasks} onEditTask={(task) => navigate(`/task/${task.id}`)} deleteTask={deleteTask} />
      )}
    </div>
  );
};

export default Home;

