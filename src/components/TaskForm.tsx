import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Field, Label, Switch } from '@headlessui/react'

const TaskForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, editTask } = useTaskContext();

  const [task, setTask] = useState<Task>({ id: 0, todo: '', completed: false });

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((t) => t.id === parseInt(id, 10));
      if (taskToEdit) setTask(taskToEdit);
    }
  }, [id, tasks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      editTask(task);
    } else {
      addTask(task);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-2 max-w-xl sm:mt-4">
      <h3 className="text-lg font-semibold mb-4">
        {id ? 'Edit Task' : 'Add Task'}
      </h3>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm/6 font-semibold text-gray-900">
            Todo
          </label>
          <div className="mt-2.5">
            <input
              id="todo"
              name="todo"
              type="text"
              value={task.todo}
              onChange={(e) => setTask({ ...task, todo: e.target.value })}
              required
              autoComplete="organization"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <Field className="flex gap-x-4 sm:col-span-2">
          <div className="flex h-6 items-center">
            <Switch
              checked={task.completed}
              onChange={(e) => setTask({ ...task, completed: e })}
              className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
            >
              <span className="sr-only">Completed</span>
              <span
                aria-hidden="true"
                className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
              />
            </Switch>
          </div>
          <Label className="text-sm/6 text-gray-600">
            Completed
          </Label>
        </Field>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={() => navigate('/')}
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="mr-2 rounded-md bg-indigo-600 py-2 px-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
