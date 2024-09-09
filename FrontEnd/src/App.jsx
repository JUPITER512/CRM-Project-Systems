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
import Changepassword from "@pages/ChangePassword/Changepassword";
import AuthContextProvider from "@context/Auth";
import ProtectedRoute from "@hooks/ProtectedRoute";
import UpdateView from "@components/Table/Updateview";
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer} from 'react-toastify';

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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
        path: "Change-Password",
        element: <Changepassword />,
      },
      {
        path: "Customer/View-Customer-Info/:id",
        element: <UpdateView />,
      },
      {
        path: "Customer/Update-Customer-Info/:id",
        element: <UpdateView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />

    </AuthContextProvider>
  );
}
