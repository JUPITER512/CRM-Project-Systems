import ForgetPassword from "@pages/Authentication/ForgetPassword/ForgetPassword";
import NewPassword from "@pages/Authentication/NewPassword/NewPassword";
import Otp from "@pages/Authentication/Otp/Otp";
import Signin from "@pages/Authentication/Signin/Signin";
import SignUp from "@pages/Authentication/SignUp/SignUp";
import { BrowserRouter,Route,Routes, } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "@pages/Dashboard/Dashboard";
import Userlist from "@pages/UserList/Userlist";
import Adduser from "@pages/AddUser/Adduser";
import ProfileSettings from "@pages/ProfileSettings/ProfileSettings";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Sign-in" element={<Signin/>}/>
        <Route path="/Sign-up" element={<SignUp/>}/>
        <Route path="/Forget-password" element={<ForgetPassword/>}/>
        <Route path="/Change-password" element={<NewPassword/>}/>
        <Route path="/Otp-Code" element={<Otp/>}/>
        <Route path="/home"  element={<Layout/>}>
          <Route index path="dashboard" element={<Dashboard/>}/>
          <Route index path="CustomerList" element={<Userlist/>}/>
          <Route index path="AddCustomer" element={<Adduser/>}/>
          <Route index path="ProfileSettings" element={<ProfileSettings/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
