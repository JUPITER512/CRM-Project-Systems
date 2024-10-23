import { useForm } from "react-hook-form";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { Link, useNavigate } from "react-router-dom";
import AnimatePage from "@components/AnimatePage";
import Axios from "@hooks/Axios";
import { useAuthContext } from "@context/Auth";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import {
  emailSchema,
  passwordSchema,
} from "@utils/InputValidation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import notify from "@utils/ToasterFunction.js";
import { ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  email: emailSchema.fields.email,
  password: passwordSchema.fields.password,
});
// import the wrapper to wrap the form in the login screen
const Signin = () => {
  const [loader, setLoader] = useState(false);
  const [showPassWord, setShowPassword] = useState(false);
  const form = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;
  const authContext = useAuthContext();
  //simple form submit handler
  // register retun name,onchange,onblur,ref so i destruct it by giving the name on every input
  async function onSubmit(data) {
    try {
      setLoader(true);
      const response = await Axios({
        requestType: "post",
        data: data,
        url: "/sign-in",
      });
      localStorage.setItem("enteredEmail", data.email);
      if (response.status == 200) {
        localStorage.removeItem("enteredEmail");
        const userdataObject = response.data;
        for (let [key, value] of Object.entries(userdataObject)) {
            localStorage.setItem(key, value); 
        }
        localStorage.setItem("enteredEmail", data.email);
        authContext.setIsAuthenticated(true);
    
        navigate("/Home", { replace: true });

      }
    } catch (error) {
      notify({
        message: error.response.data.message,
        position: "top-right",
        autocloseTime: 3000,
        type: "error",
        theme: `${localStorage.getItem("theme") == "false" ? "light" : "dark"}`,
      });
    } finally {
      setLoader(false);
    }
  }
  return (
    <>
    <ToastContainer/>
      <AuthenticationWrapper title={"Welcome Back To Crm Suite"}>
        <AnimatePage>
          <form
            //passing the onSubmit method to destructured handleSubmit method from form hook
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full my-10 p-4 md:p-6 lg:p-8 bg-transparent rounded-lg"
          >
            <h3 className="text-2xl font-semibold mb-6  dark:text-slate-100 text-gray-800">
              Log In to Your Account
            </h3>

            <div className="w-full max-w-md mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700  dark:text-gray-300 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g., example@domain.com"
                className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full max-w-md mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700  dark:text-gray-300 text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="flex items-center justify-center relative">
                <input
                  type={`${showPassWord ? "text" : "password"}`}
                  id="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value: /^(?=[A-Za-z0-9]{8,}$)[A-Za-z0-9]+$/,
                      message:
                        "Password must be at least 8 characters and alphanumeric",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-2 text-black"
                  onClick={() => {
                    setShowPassword(!showPassWord);
                  }}
                >
                  {showPassWord ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={loader}
              type="submit"
              className="w-full bg-slate-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200 ease-in-out"
            >
              {loader ? "Loading..." : "Log In"}
            </button>

            <div className="w-full max-w-md text-center mt-4">
              <Link
                className="text-blue-600 hover:underline"
                to="/Forget-password"
              >
                Forgot Password?
              </Link>
            </div>

            <p className="w-full max-w-md text-center mt-4 text-gray-600  dark:text-gray-300">
              Don&apos;t have an account?
              <br />
              <Link className="text-blue-600 hover:underline" to="/Sign-up">
                Create one for free
              </Link>
            </p>
          </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default Signin;
