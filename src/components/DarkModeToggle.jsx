import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  // Check local storage for dark mode preference
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default DarkModeToggle;
