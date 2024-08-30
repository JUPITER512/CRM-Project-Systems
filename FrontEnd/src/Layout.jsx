import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import React, { useState } from "react";
import Breadcrumbs from "@components/BreadCrumb";
const pages = ["Dashboard", "CustomerList", "AddCustomer", "ProfileSettings"];
const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const path = useLocation().pathname.split("/")[2];
  const navigate=useNavigate();
  function handleSidebar() {
    setSidebar(!sidebar);
  }
  function handleLogout(){
    navigate('/Sign-in')
  }
  return (
    <div className="w-screen h-screen bg-slate-500 relative">
      <div className="navbar bg-gray-400 w-[100%] md:w-[75%] lg:w-[80%] xl:w-[85%] absolute top-0 right-0 z-10 h-[10%] rounded-br-lg outline outline-1 outline-gray-400">
        <div className="flex items-center absolute right-4 top-4">
          <button
            className=" block md:hidden text-white leading-9"
            onClick={handleSidebar}
          >
            |&nbsp;|&nbsp;|&nbsp;
          </button>
          <img src="" alt="avatar-logo" />
        </div>
      </div>
      <div
        className={`sidebar ${
          sidebar ? "translate-x-[0%]" : "translate-x-[-100%]"
        } transition-transform duration-300 ease-linear md:translate-x-[0%] md:w-[25%] lg:w-[20%] xl:w-[15%] absolute bg-white h-full rounded-r-xl z-20 outline outline-1 outline-gray-400 flex flex-col justify-between`}
      >
        <div >
          <Link id="logo" className="flex items-center justify-start gap-4 p-2" to={'/home/dashboard'}>
            <img src={logo} alt="logo-here" className="w-[4rem] rounded-2xl" />
            <h1 className="text-2xl font-bold">Crm Suite</h1>
          </Link>
        </div>
        <div id="menu-list">
          <ul className=" text-center">
            {pages.map((item) => {
              return (
                <React.Fragment key={item}>
                  <li
                    onClick={()=>{
                      navigate(`/home/${item}`);
                      if(sidebar){
                        setSidebar(false)
                      }
                    }}
                    className={` my-4 hover:bg-gray-400 mx-12 p-2 rounded-lg transition-colors duration-300 ease-in-out hover:text-gray-100 cursor-pointer ${
                      item.toLowerCase() == path.toLowerCase() ? "bg-gray-400" : ""
                    }`}
                  >
                    {item}
                  </li>
                  <hr className="mx-6" />
                </React.Fragment>
              );
            })}
          </ul>
        </div>
        <div
          id="logout-themeswitcher"
          className="flex flex-col gap-2 items-center justify-center mb-4"
        >
          <button onClick={handleLogout} className=" bg-slate-400 px-6 p-1 rounded-lg w-[60%] ">
            Logout
          </button>
          <div className="flex gap-2  bg-gray-300 p-1 px-6 rounded-lg">
            <p>Light Mode</p>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      <div className="md:ml-[25%] lg:ml-[20%] xl:ml-[15%] h-[90%] p-4 overflow-y-auto absolute top-[10%] md:w-[75%] lg:w-[80%] xl:w-[85%] w-full">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
