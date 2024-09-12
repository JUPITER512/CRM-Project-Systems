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
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import NotFound from "@pages/NotFoundPage/NotFound";
import Changepassword from "@pages/ChangePassword/Changepassword";
import AuthContextProvider from "@context/Auth";
import ProtectedRoute from "@hooks/ProtectedRoute";
import UpdateView from "@components/Table/Updateview";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RouteToDashboard from "@hooks/RouteToDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/Sign-in" />,  // Redirect from root path to /Sign-in
  },
  {
    path: "/Sign-in",
    element: (
      // route to dashboard when there is data in localstorage means prevent the user to signIn etc again and navigate them to the dashboard page
      <RouteToDashboard>
        <Signin />
      </RouteToDashboard>
    ),
  },
  {
    path: "/Sign-up",
    element: (
      <RouteToDashboard>
        <SignUp />
      </RouteToDashboard>
    ),
  },
  {
    path: "/Forget-password",
    element: (
      <RouteToDashboard>
        <ForgetPassword />
      </RouteToDashboard>
    ),
  },
  {
    path: "/Change-password",
    element: (
      <RouteToDashboard>
        <NewPassword />,
      </RouteToDashboard>
    ),
  },
  {
    path: "/Otp-Code",
    element: (
      <RouteToDashboard>
        <Otp />
      </RouteToDashboard>
    ),
  },
  {
    path: "/Home",
    element: (
      // if there is no data in localstorage preventing user to directly access the main routes which needs api call with jwttoken access token and refresh token
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
    // if user enter any route which is not defined then it'll show the not found 404 page
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
