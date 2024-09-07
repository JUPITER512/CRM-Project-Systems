
import darkBackground from "../assets/darkBackground.svg";
import lightBackground from "../assets/lightBackground.svg";

import ThemeSwitcher from "./ThemeSwitcher";

const AuthenticationWrapper = ({ title, children }) => {
  const themeMode=Boolean(localStorage.getItem('theme'))
  console.log(themeMode)
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="grid gap-0 h-screen md:grid-cols-2 relative">
        <div className="absolute top-4 right-2 md:right-10 z-20">
          <ThemeSwitcher />
        </div>
        <div className="flex items-center justify-center px-4 md:p-0">
          <div className="max-w-md w-full text-center">
            <h2 className="mb-8 text-3xl font-bold md:text-5xl">
              {title}
            </h2>
            <div className=" pb-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
              {children}
            </div>
          
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={themeMode ? darkBackground : lightBackground} 
              alt="Background" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticationWrapper;
