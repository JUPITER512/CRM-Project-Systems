import sideImage from "../assets/7053216.jpg";
import logo from "../assets/logo.jpg";

import ThemeSwitcher from "./ThemeSwitcher";
const AuthenticationWrapper = ({ title, children }) => {
  return (
    <div className="    bg-gradient-to-r from-[#eafbf7] to-[#d2e5fe] dark:bg-gradient-to-r dark:from-[#1e293b] dark:to-[#334155]">
      <div
        id="logo"
        className="flex items-center justify-between gap-4 px-4 pt-4"
      >
        <img src={logo} alt="logo-here" className="w-[4rem] rounded-2xl" />
        <div className="flex items-center justify-end">
          <ThemeSwitcher />
        </div>
      </div>
      <div
        className={`w-full h-full flex justify-start md:gap-2 lg:gap-4 lg:justify-evenly 
              `}
      >
        <div className=" left w-[100%]  md:w-[50%] h-screen flex flex-col items-center justify-center mx-4">
          <h2 className=" font-bold text-[1.75rem] my-4 text-center lg:w-[70%]">
            {title}
          </h2>
          <div className="bg-gradient-to-br from-[#eafbf7] to-[#d2e5fe] dark:bg-gradient-to-tr dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-50 w-[100%] lg:w-[50%] min-h-[60%] rounded-[10px] outline-gray-300 outline outline-1 outline-offset-1 drop-shadow-lg">
            {children}
          </div>
        </div>
        <img
          src={sideImage}
          className=" right hidden md:block  md:w-[60%] lg:w-[40%] rounded-[20px] my-4 lg:m-2 mx-2"
        />
      </div>
    </div>
  );
};

export default AuthenticationWrapper;
