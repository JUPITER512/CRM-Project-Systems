import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ThemeSwitcher from "@components/ThemeSwitcher";

const pages = ["Dashboard", "CustomerList", "AddCustomer", "ProfileSettings"];

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const history=useLocation

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  function handleLogout() {
    navigate("/Sign-in",{replace:true});
  }
  function handleUserMenu() {
    setUserMenu(!userMenu);
  }

  return (
    <div className="w-screen h-screen relative bg-[#f5fafc] dark:bg-gradient-to-bl dark:bg-slate-400">
      <div className="navbar md:w-[72%] lg:w-[78%] xl:w-[82%] bg-gradient-to-tr shadow-sm from-[#eafbf7] to-[#d2e5fe] bg-opacity-45 w-[100%] absolute top-0 right-0 md:right-4 lg:right-8 z-10 h-[10%] rounded-br-lg flex items-center justify-between px-4 dark:bg-gradient-to-tr dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-50 rounded-b-xl">
        <button
          className="block md:hidden text-3xl dark:text-white"
          onClick={handleSidebar}
        >
          {<RxHamburgerMenu />}
        </button>
        <div className="flex items-center gap-4 ml-auto">
          <ThemeSwitcher />
          <img
            src=""
            alt="avatar-logo"
            className="cursor-pointer w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
            onClick={() => {
              handleUserMenu();
            }}
          />
        </div>
        {userMenu && (
          <div className="absolute right-0 top-16 px-6 z-50">
            <ul className="border border-gray-300 rounded-lg flex flex-col text-left divide-y bg-white shadow-lg transition-colors duration-150 duration-150 ease-in-out ">
              <li className="p-3 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                <button className="w-full text-left">Change Password</button>
              </li>
              <li className="p-3 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-150 ease-in-out">
                <button onClick={ handleLogout} className="w-full text-left">Logout Account</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div
        className={`sidebar ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-linear md:translate-x-0 md:w-[25%] lg:w-[20%] xl:w-[15%] absolute bg-gradient-to-l from-[#eafbf7] to-[#d2e5fe] h-full rounded-r-xl z-20 shadow-xl flex flex-col justify-between dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-70`}
      >
        <div className="flex items-center justify-between p-4">
          <Link id="logo" className="flex items-center" to={"/home/dashboard"}>
            <img src={logo} alt="logo-here" className="w-12 rounded-2xl" />
            <h1 className="text-xl font-bold dark:text-white">Crm Suite</h1>
          </Link>
          {sidebar && (
            <IoIosCloseCircleOutline
              className="text-2xl cursor-pointer dark:text-white"
              onClick={handleSidebar}
            />
          )}
        </div>
        <nav id="menu-list">
          <ul className="text-center ml-4">
            {pages.map((item) => (
              <React.Fragment key={item}>
                <li
                  onClick={() => {
                    navigate(`/home/${item}`);
                    if (sidebar) {
                      setSidebar(false);
                    }
                  }}
                  className={`my-4 hover:bg-gray-400 mx-6 py-2  rounded-lg transition-colors duration-300 ease-in-out cursor-pointer ${
                    item.toLowerCase() === path.toLowerCase()
                      ? "bg-gray-200 dark:bg-slate-400 dark:text-gray-100"
                      : ""
                  } dark:hover:bg-gray-600 dark:text-white dark:hover:text-gray-00`}
                >
                  {item}
                </li>
                <hr className="mx-4 border-slate-300 dark:border-gray-700" />
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div
          id="logout-themeswitcher"
          className="flex flex-col items-center mb-4"
        >
          <button
            onClick={handleLogout}
            className="bg-gray-400 px-6 p-2 rounded-lg w-[60%] dark:bg-gray-600 dark:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="md:ml-[25%] lg:ml-[20%] xl:ml-[15%] h-[90%] p-4 overflow-y-auto absolute top-[10%] md:w-[75%] lg:w-[80%] xl:w-[85%] w-full dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
