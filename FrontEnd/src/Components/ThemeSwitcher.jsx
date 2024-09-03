import { useEffect, useState } from "react";
import { CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    const root = document.documentElement.classList;
    if (theme) {
      root.add('dark');
    } else {
      root.remove('dark');
    }
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };

  return (
    <button
      className={`bg-slate-400 text-white dark:text-black p-1 dark:bg-slate-300 text-2xl rounded-full hover:bg-slate-600 dark:hover:bg-slate-300`}
      onClick={toggleTheme}
    >
      {theme ? <CiSun /> : <FaRegMoon />}
    </button>
  );
};

export default ThemeSwitcher;
