import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/logo.jpg";
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { useAuthContext } from "@context/Auth";
import { MdOutlineSettings, MdSpaceDashboard } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import AnimatePage from "@components/AnimatePage";
import ButtonAnimation from "@components/ButtonAnimation";
import Axios from "@hooks/Axios";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import { useResetRecoilState } from "recoil";
import { paginationState, tableDataState, totalRows } from "./Store/TableData";
import { customerDataFamily } from "./Store/CustomerData";
import { userImageAtom } from "./Store/UserImage";

const pages = [
  { page: "Dashboard", id: 1, icon: <MdSpaceDashboard /> },
  { page: "CustomerList", id: 2, icon: <CiCircleList /> },
  { page: "AddCustomer", id: 3, icon: <IoMdAddCircle /> },
  { page: "ProfileSettings", id: 4, icon: <MdOutlineSettings /> },
];

const Layout = () => {
  const queryClient = useQueryClient()
  const resettable = useResetRecoilState(tableDataState);
  const resetpagination = useResetRecoilState(paginationState);
  const resettotalRows = useResetRecoilState(totalRows);
  const resetcustomerdata = useResetRecoilState(customerDataFamily);
  const resetuserimage = useResetRecoilState(userImageAtom);
  const [sidebar, setSidebar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["User Info Api"],
    queryFn: async () => {
      const response = await Axios({
        requestType: "get",
        url: "/me",
      });
      if (response.status == 200) {
        for (let [key, value] of Object.entries(response.data.data)) {
          if (key == "data" && typeof value === "object") {
            Object.assign(localStorage, value);
          } else {
            localStorage.setItem(key, value);
          }
        }
        return response.data.data;
      }
    },
    refetchOnMount:false,
    refetchOnWindowFocus:false
    // ,staleTime: 1800000,
    
  });

  // handle side bar for upto md screens
  function handleSidebar() {
    setSidebar(!sidebar);
    if (userMenu) {
      setUserMenu(!userMenu);
    }
  }

  // logout handlers
  async function handleLogout() {
    try {
      const res = await Axios({ requestType: "get", url: "/logout-user" });
      if (res.status == 200) {
        localStorage.clear();
        setIsAuthenticated(()=>{
          return false
        });
        navigate("/Sign-in", { replace: true });  
        resetuserimage();
        resetcustomerdata();
        resettotalRows();
        resettable();
        resetpagination();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  // when user click on avatar shows menu of logout/changepassword top right
  function handleUserMenu() {
    setUserMenu(!userMenu);
  }
  // left sidebar menu items click handler that navigate the user to the desired page
  function handleSidebarMenuClick(page) {
    navigate(`/home/${page}`);
    if (sidebar) {
      setSidebar(false);
    }
    if (userMenu) {
      setUserMenu(!userMenu);
    }
  }
  // if the user is not authenticate then he/she is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Sign-in");
    }
  }, []);
  if (isLoading) {
    return (
      <div className="loader absolute left-[50%] top-[50%] translate-x-[-50%]"></div>
    );
  }
  return (
    <div className=" w-screen h-screen relative bg-[#e0e7e9] dark:bg-gradient-to-bl dark:bg-slate-400 transition-colors duration-200 ease-linear">
      <div className="navbar md:w-[72%] lg:w-[78%] xl:w-[82%] bg-gradient-to-tr shadow-sm from-[#eafbf7] to-[#d2e5fe] bg-opacity-45 w-[100%] absolute top-0 right-0 md:right-4 lg:right-8 z-10 h-[10%] rounded-br-lg flex items-center justify-between px-4 dark:bg-gradient-to-tr dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-50 rounded-b-xl">
        <button
          className="block md:hidden text-3xl dark:text-white"
          onClick={handleSidebar}
        >
          {<RxHamburgerMenu />}
        </button>
        <div className="flex items-center gap-4 ml-auto">
          <ThemeSwitcher />
          <ButtonAnimation>
            <img
              src={localStorage.getItem("pictureBase64") || "/avatar.jpg"}
              alt="avatar-logo"
              className="cursor-pointer w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
              onClick={() => {
                handleUserMenu();
              }}
            />
          </ButtonAnimation>
        </div>
        {userMenu && (
          <AnimatePage duration={0.3}>
            <div className="absolute right-0 top-16 px-6 z-50">
              <ul className="border border-gray-300 rounded-lg flex flex-col text-left divide-y bg-white shadow-lg transition-colors duration-150 duration-150 ease-in-out ">
                <li
                  onClick={() => {
                    navigate("/Home/Change-Password");
                    setUserMenu(false);
                  }}
                  className="p-3 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 ease-in-out"
                >
                  <p className="w-full text-left">Change Password</p>
                </li>
                <li
                  onClick={handleLogout}
                  className="p-3 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 ease-in-out"
                >
                  <p className="w-full text-left">Logout Account</p>
                </li>
              </ul>
            </div>
          </AnimatePage>
        )}
      </div>
      <div
        className={`sidebar ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-linear md:translate-x-0 md:w-[25%] lg:w-[20%] xl:w-[15%] absolute bg-gradient-to-l from-[#eafbf7] to-[#d2e5fe] h-full rounded-r-xl z-20 shadow-xl flex flex-col justify-between dark:from-[#1e293b] dark:to-[#334155] dark:bg-opacity-70`}
      >
        <div className="flex items-center justify-between gap-4 p-2">
          <Link
            id="logo"
            className="flex items-center gap-4"
            to={"/Home/Dashboard"}
          >
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
              <React.Fragment key={item.id}>
                <ButtonAnimation>
                  <li
                    onClick={() => {
                      handleSidebarMenuClick(item.page);
                    }}
                    className={`my-4 hover:bg-gray-400 mx-6 py-2  rounded-lg transition-colors duration-300 ease-in-out cursor-pointer ${
                      item.page.toLowerCase() === path.toLowerCase()
                        ? "bg-gray-200 dark:bg-slate-400 dark:text-gray-100"
                        : ""
                    } dark:hover:bg-gray-600 dark:text-white dark:hover:text-gray-00`}
                  >
                    <p className="flex items-center justify-center gap-4">
                      {item.icon}
                      {item.page}
                    </p>
                  </li>
                </ButtonAnimation>
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
            className="bg-slate-400 flex items-center justify-center gap-2 px-6 p-2 rounded-lg w-[60%] dark:bg-slate-600 dark:text-white"
          >
            <p>Logout</p>
            <AiOutlineLogout />
          </button>
        </div>
      </div>
      <main className="md:ml-[25%] lg:ml-[20%] xl:ml-[15%] h-[90%] p-4 overflow-y-auto absolute top-[10%] md:w-[75%] lg:w-[80%] xl:w-[85%] w-full dark:text-white">
        {/* all the main body content such as dashboard /  customer list table place here outlet is given by react router dom */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
