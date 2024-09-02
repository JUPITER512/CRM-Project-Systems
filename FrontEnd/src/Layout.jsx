import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import React, { useState } from "react";
import Breadcrumbs from "@components/BreadCrumb";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ThemeSwitcher from "@components/ThemeSwitcher";

const pages = ["Dashboard", "CustomerList", "AddCustomer", "ProfileSettings"];

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  function handleLogout() {
    navigate('/Sign-in');
  }

  return (
    <div className="w-screen h-screen relative bg-[#f5fafc] dark:bg-gradient-to-bl dark:bg-slate-400">
      <div className="navbar bg-gradient-to-tr shadow-sm from-[#eafbf7] to-[#d2e5fe] bg-opacity-45 w-[100%]  absolute top-0 right-0 z-10 h-[10%] rounded-br-lg flex items-center justify-between px-4 dark:bg-gradient-to-tr dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-50">
        <button
          className="block md:hidden text-3xl dark:text-white"
          onClick={handleSidebar}
        >
          <RxHamburgerMenu />
        </button>
        <div className="flex items-center justify-center gap-4 absolute right-4 top-5">
          <ThemeSwitcher/>
          <img src="" alt="avatar-logo" />
        </div>
      </div>
      <div
        className={`sidebar ${
          sidebar ? "translate-x-[0%]" : "translate-x-[-100%]"
        } transition-transform duration-300 ease-linear md:translate-x-[0%] md:w-[25%] lg:w-[20%] xl:w-[15%] absolute bg-gradient-to-l from-[#eafbf7] to-[#d2e5fe] h-full rounded-r-xl z-20 shadow-xl flex flex-col justify-between dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-70`}
      >
        <div className="flex items-center justify-center mx-3">
          <Link id="logo" className="flex items-center justify-start gap-4 p-2" to={'/home/dashboard'}>
            <img src={logo} alt="logo-here" className="w-[4rem] rounded-2xl" />
            <h1 className="text-2xl font-bold dark:text-white">Crm Suite</h1>
          </Link>
          {sidebar && <IoIosCloseCircleOutline
            className="text-2xl cursor-pointer dark:text-white"
            onClick={() => { if (sidebar) { setSidebar(false) } }}
          />}
        </div>
        <div id="menu-list">
          <ul className="text-center">
            {pages.map((item) => {
              return (
                <React.Fragment key={item}>
                  <li
                    onClick={() => {
                      navigate(`/home/${item}`);
                      if (sidebar) {
                        setSidebar(false);
                      }
                    }}
                    className={`my-4 hover:bg-gray-400 mx-12 p-2 rounded-lg transition-colors duration-300 ease-in-out hover:text-gray-100 cursor-pointer ${
                      item.toLowerCase() === path.toLowerCase() ? "bg-gray-400" : ""
                    } dark:hover:bg-gray-600 dark:text-white dark:hover:text-gray-100`}
                  >
                    {item}
                  </li>
                  <hr className="mx-6 border-slate-300 dark:border-gray-700" />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div
          id="logout-themeswitcher"
          className="flex flex-col gap-2 items-center justify-center mb-4"
        >
          <button onClick={handleLogout} className="bg-gray-400 px-6 p-1 rounded-lg w-[60%] dark:bg-gray-600 dark:text-white">
            Logout
          </button>
        </div>
      </div>
      <div className=" md:ml-[25%] lg:ml-[20%] xl:ml-[15%] h-[90%] p-4 overflow-y-auto absolute top-[10%] md:w-[75%] lg:w-[80%] xl:w-[85%] w-full  dark:text-white">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
