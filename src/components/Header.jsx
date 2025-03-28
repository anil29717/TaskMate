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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center 
      bg-sky-500/70 dark:bg-gray-800/70 
      backdrop-blur-md text-white shadow-sm">
      
      {/* Title */}
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <ListTodo /> Task Manager
      </h1>

      {/* Date & Time */}
      <div className="text-sm font-medium">
        {dateTime.toLocaleDateString()} - {dateTime.toLocaleTimeString()}
      </div>

      {/* Name Input */}
      <div className="flex items-center gap-2 ">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="NAME"
          className="px-3 py-1 rounded-lg text-white  shadow-amber-100"
        />
      </div>
    </header>
  );
};

export default Header;
