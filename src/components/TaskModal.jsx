import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Calendar, ListCheck, LayoutList } from "lucide-react";

const TaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [completionDate, setCompletionDate] = useState(
    new Date().toISOString().split("T")[0] // Default: Today
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask({ 
        title: taskTitle, 
        date: completionDate,
        id: Date.now() // Generate unique ID
      });
      setTaskTitle("");
      setCompletionDate(new Date().toISOString().split("T")[0]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-2xl w-96 relative border border-white/20 dark:border-gray-700/30"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
              <ListCheck className="mr-2 text-sky-500" />
              Create New Task
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Task Title Input */}
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-sky-500/50 
                             dark:bg-gray-700 dark:text-white dark:border-gray-600 
                             transition-all duration-300 ease-in-out"
                  placeholder="What needs to be done?"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LayoutList className="text-gray-400" size={20} />
                </div>
              </div>

              {/* Date Input */}
              <div className="relative">
                <input
                  type="date"
                  className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-sky-500/50 
                             dark:bg-gray-700 dark:text-white dark:border-gray-600 
                             transition-all duration-300 ease-in-out"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="text-gray-400" size={20} />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg 
                             hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-500 text-white rounded-lg 
                             hover:bg-sky-600 transition-colors 
                             flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add Task</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;