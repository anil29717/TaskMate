import { useState, useEffect } from "react";
import { Download, FileDown, CirclePlus } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Header from "../components/Header";
import TaskModal from "../components/TaskModal";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      date: taskData.date,
      completed: false,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]); // Keep latest task first
  };

  const completeTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  // Move a task back to uncompleted
  const uncompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: false } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const downloadTasksPDF = () => {
    const doc = new jsPDF();

    doc.text("Task List", 14, 10);

    const tableData = tasks.map((task, index) => [
      index + 1,
      task.title,
      task.date,
      task.completed ? "✔ Completed" : "❌ Not Completed",
    ]);

    autoTable(doc, {
      head: [["#", "Task", "Date", "Status"]],
      body: tableData,
      startY: 20,
    });

    doc.save("tasks.pdf");
  };

  const uploadTasks = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedTasks = JSON.parse(event.target.result);
          if (Array.isArray(importedTasks)) {
            setTasks(importedTasks);
            alert("Tasks imported successfully!");
          } else {
            alert("Invalid file format");
          }
        } catch (error) {
          alert("Error parsing file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Header />
      <div className="container mx-auto mt-20 px-4 py-6">
        {/* Button Group - Responsive Layout */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors group"
          >
            <CirclePlus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>Add Task</span>
          </button>

          <div className="relative">
            <input
              type="file"
              id="upload-tasks"
              accept=".json"
              className="hidden"
              onChange={uploadTasks}
            />
            <label
              htmlFor="upload-tasks"
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
            >
              <FileDown className="w-5 h-5" />
              <span>Import Tasks</span>
            </label>
          </div>

          <button
            onClick={downloadTasksPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Export Tasks</span>
          </button>
        </div>

        {/* Task List */}
        <div className=" sm:grid-cols-2  gap-4">
          <TaskList
            tasks={tasks}
            onComplete={completeTask}
            onDelete={deleteTask}
            onUncomplete={uncompleteTask}
          />
        </div>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={addTask} />
    </div>
  );
};

export default Home;
