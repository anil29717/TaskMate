import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Sun, Moon, Trash2 } from "lucide-react";

const TaskList = ({ tasks, onComplete, onDelete }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  // Sync theme state to localStorage and document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const lightModeColors = {
    background: 'bg-sky-50',
    taskBackground: 'bg-sky-100',
    textColor: 'text-sky-800',
    borderColor: 'border-sky-200'
  };

  const darkModeColors = {
    background: 'bg-gray-900',
    taskBackground: 'bg-gray-700',
    textColor: 'text-gray-200',
    borderColor: 'border-gray-600'
  };

  const colors = theme === 'light' ? lightModeColors : darkModeColors;

  return (
    <div className={`min-h-screen ${colors.background} ${colors.textColor} transition-colors duration-300`}>
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${colors.taskBackground} ${colors.borderColor} border hover:bg-opacity-80 transition-all`}
        >
          {theme === 'dark' ? <Sun className="text-yellow-400" /> : <Moon className="text-indigo-600" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Uncompleted Tasks */}
        <div>
          <h2 className={`text-lg font-semibold mb-3 ${colors.textColor}`}>Uncompleted</h2>
          {tasks.filter((task) => !task.completed).length === 0 && (
            <p className="text-gray-500">No pending tasks</p>
          )}
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex justify-between items-center p-3 ${colors.taskBackground} rounded-lg mb-2`}
              >
                <XCircle className="text-gray-500" />
                <span className={`flex-1 mx-3 ${colors.textColor}`}>{task.title}</span>
                <span className={`flex-1 mx-3 ${colors.textColor}`}>{task.date}</span>
                <button onClick={() => onComplete(task.id)} className="text-green-500">✔</button>
                <button onClick={() => onDelete(task.id)} className="text-red-500 fill-red-600 text-sm">
                  <Trash2 className='ml-2' />
                </button>
              </motion.div>
            ))}
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className={`text-lg font-semibold mb-3 ${colors.textColor}`}>Completed</h2>
          {tasks.filter((task) => task.completed).length === 0 && (
            <p className="text-gray-500">No completed tasks</p>
          )}
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex justify-between items-center p-3 ${colors.taskBackground} rounded-lg mb-2`}
              >
                <CheckCircle className="text-green-500" />
                <span className={`flex-1 mx-3 ${colors.textColor}`}>{task.title}</span>
                <span className="text-sm text-gray-500">{task.date}</span>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
