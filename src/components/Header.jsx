import React, { useState, useEffect } from "react";
import { ListTodo } from "lucide-react";

const Header = () => {
  const [name, setName] = useState(() => localStorage.getItem("userName") || "");
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("userName", name);
  }, [name]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format date like "30 March 2025"
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format time like "2hr 20min"
  const formattedTime = `${dateTime.getHours()}hr ${dateTime.getMinutes()}min`;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 p-4
        bg-sky-500/70 dark:bg-gray-800/70 
        backdrop-blur-md text-white shadow-sm"
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          {/* Left side - Title */}
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <ListTodo />
            <span>Task Manager</span>
          </h1>

          {/* Right side - Date & Time */}
          <div className="text-sm text-right">
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind the fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
