import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/task/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;
