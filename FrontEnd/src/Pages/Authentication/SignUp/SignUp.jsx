import AnimatePage from "@components/AnimatePage";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Axios from "@hooks/Axios";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import notify from "../../../utils/ToasterFunction.js";
import { ToastContainer } from "react-toastify";

import { passwordSchema,emailSchema,nameSchema } from "../../../utils/inputValidations.js";
const schema=yup.object().shape({
  email:emailSchema.fields.email,
  password:passwordSchema.fields.password,
  confirmPassword:passwordSchema.fields.password,
  name:nameSchema.fields.name
})
const SignUp = () => {
  const [showPassWord, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm({resolver:yupResolver(schema)});
  const { handleSubmit, register, formState, reset,setError } = form;
  const { errors } = formState;

  async function onSubmit(data) {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match"
        });
        return;
      }
      const response = await Axios({
        requestType: "post",
        url: "/sign-up",
        data: data,
      });
      if (response.status == 200) {
        
        notify({
          message:"Account Created Successfully",
          position:'top-right',
          autocloseTime:3000,
          type:"success",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        
        notify({
          message:"Verify through the link in email inbox",
          position:'top-right',
          autocloseTime:3000,
          type:"info",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        setTimeout(() => {
          
          navigate("/Sign-In", { replace: true });
        }, 4000);
        reset();
      }
    } catch (error) {
      notify({
        message:error.response.data.message,
        position:'top-right',
        autocloseTime:3000,
        type:"error",
        theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
      })
      console.log(`Error while signin in`);
    }
  }

  return (
    <>
    <ToastContainer/>
      <AuthenticationWrapper title={"Welcome To CRM Suite"}>
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md mx-auto px-6 pt-4 pb-2 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-6 text-center">
              Create Your Free Account
            </h3>

            <div className="w-full mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700  dark:text-gray-300 text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                autoComplete="name"
                className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors?.name && (
                <p className="text-red-600 text-xs mt-1">
                  {errors?.name.message}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700  dark:text-gray-300 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@example.com"
                autoComplete="email"
                className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {errors?.email && (
                <p className="text-red-600 text-xs mt-1">
                  {errors?.email.message}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
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
                  autoComplete="new-password"
                  placeholder="********"
                  className="w-full p-3  text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
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
              {errors?.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors?.password.message}
                </p>
              )}
            </div>

            <div className="w-full mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="flex items-center justify-center relative">
                <input
                  type={`${showConfrimPassword ? "text" : "password"}`}
                  id="confirm-password"
                  placeholder="********"
                  autoComplete="new-password"
                  className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute right-2 text-black"
                  onClick={() => {
                    setShowConfrimPassword(!showConfrimPassword);
                  }}
                >
                  {showConfrimPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors?.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">
                  {errors?.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Sign Up
            </button>

            <p className="w-full text-center mt-4 text-slate-600  dark:text-gray-300">
              Already have an account?
              <br />
              <Link className="text-blue-600 hover:underline" to="/Sign-in">
                Log In
              </Link>
            </p>
          </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default SignUp;
