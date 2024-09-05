import ForgetPassword from "@pages/Authentication/ForgetPassword/ForgetPassword";
import NewPassword from "@pages/Authentication/NewPassword/NewPassword";
import Otp from "@pages/Authentication/Otp/Otp";
import Signin from "@pages/Authentication/Signin/Signin";
import SignUp from "@pages/Authentication/SignUp/SignUp";
import Layout from "./Layout";
import Dashboard from "@pages/Dashboard/Dashboard";
import Userlist from "@pages/UserList/Userlist";
import Adduser from "@pages/AddUser/Adduser";
import ProfileSettings from "@pages/ProfileSettings/ProfileSettings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "@pages/NotFoundPage/NotFound";
import axios from "axios";
const router = createBrowserRouter([
  {
    path: "/Sign-in",
    element: <Signin />,
  },
  {
    path: "/Sign-up",
    element: <SignUp />,
  },
  {
    path: "/Forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/Change-password",
    element: <NewPassword />,
  },
  {
    path: "/Otp-Code",
    element: <Otp />,
  },
  {
    path: "/Home",
    element: <Layout />,
    children: [
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "CustomerList",
        element: <Userlist />,
      },
      {
        path: "AddCustomer",
        element: <Adduser />,
      },
      {
        path: "ProfileSettings",
        element: <ProfileSettings />,
      },
      {
        path: "Customer/View-Customer-Info/:id",
        element: <Adduser />,
      },
      {
        path: "Customer/Update-Customer-Info/:id",
        element: <Adduser />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default function App() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 10000,
  });
  axiosInstance.interceptors.request.use(
    function (config) {
      console.log(config);
    },
    function (err) {
      console.log(err);
    }
  );
  return <RouterProvider router={router} />;
}
