import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Sun, Moon, Trash2, RotateCcw } from "lucide-react";

const TaskList = ({ tasks, onComplete, onDelete, onUncomplete }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

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
    <div className={`min-h-screen ${colors.background} ${colors.textColor} transition-colors duration-300 p-4`}>      
     
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <div>
          <h2 className="text-lg font-semibold mb-3">Uncompleted</h2>
          {tasks.filter((task) => !task.completed).length === 0 && (
            <p className="text-gray-500">No pending tasks</p>
          )}
          {tasks.filter((task) => !task.completed).map((task) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex flex-col sm:flex-row justify-between items-center p-3 ${colors.taskBackground} rounded-lg mb-2`}>
              <div className="flex items-center w-full sm:w-auto">
                <XCircle className="text-gray-500" />
                <span className="mx-3 truncate">{task.title}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">{task.date}</span>
                <button onClick={() => onComplete(task.id)} className="text-green-500">✔</button>
                <button onClick={() => onDelete(task.id)} className="text-red-500"><Trash2 /></button>
              </div>
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Completed</h2>
          {tasks.filter((task) => task.completed).length === 0 && (
            <p className="text-gray-500">No completed tasks</p>
          )}
          {tasks.filter((task) => task.completed).map((task) => (
            <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex flex-col sm:flex-row justify-between items-center p-3 ${colors.taskBackground} rounded-lg mb-2`}>
              <div className="flex items-center w-full sm:w-auto">
                <CheckCircle className="text-green-500" />
                <span className="mx-3 truncate">{task.title}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <span className="text-sm text-gray-500">{task.date}</span>
                <button onClick={() => onUncomplete(task.id)} className="text-blue-500"><RotateCcw /></button>
                <button onClick={() => onDelete(task.id)} className="text-red-500"><Trash2 /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
