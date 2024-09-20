import AnimatePage from "@components/AnimatePage";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import Axios from "@hooks/Axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";

import { FaEye } from "react-icons/fa";



import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { passwordSchema } from "../../../utils/inputValidations.js";
import notify from "../../../utils/ToasterFunction.js";
import { ToastContainer } from "react-toastify";


const schema=yup.object().shape({
  newpassword:passwordSchema.fields.password,
  confirmnewpassword:passwordSchema.fields.password
})
const NewPassword = () => {
  const [showPassWord, setShowPassword] = useState(false);
  const [confirmPassword, setShowConfrimPassword] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema)
  });
  const { handleSubmit, register, formState,setError ,reset} = form;
  const { errors, } = formState;
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      if (data.newpassword !== data.confirmnewpassword) {
        setError("confirmnewpassword", {
          type: "manual",
          message: "Passwords do not match"
        });
        return;
      }
      const response = await Axios({
        requestType: "post",
        url: "/change-password",
        data: {
          email: localStorage.getItem("email"),
          id: localStorage.getItem("id"),
          confirmPassword: data.confirmnewpassword,
          password: data.newpassword,
        },
      });
      if (response.status == 200) {
        localStorage.clear();
        reset()
        notify({
          message:"Password change Successfully",
          position:'top-right',
          autocloseTime:3000,
          type:"success",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        notify({
          message:"You will redirect to Sign In Page shortly",
          position:'top-right',
          autocloseTime:3000,
          type:"info",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        setTimeout(() => {
          navigate("/Sign-In", { replace: true });
        }, 3300);
      }
    } catch (error) {
      notify({
        message:error.response.data.message,
        position:'top-right',
        autocloseTime:3000,
        type:"error",
        theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
      })
    }
  }
  return (
    <>
    <ToastContainer/>
      <AuthenticationWrapper
        title={"Welcome Back To CRM Suite Password Changer"}
      >
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full my-10 space-y-4"
          >
            <h3 className="text-center font-semibold text-lg">
              Enter New Password
            </h3>

            <div className="flex flex-col w-[70%] space-y-2">
              <label htmlFor="newpassword" className="font-medium">
                New Password
              </label>
              <div className="flex items-center justify-center relative">
                <input
                  type={`${showPassWord ? "text" : "password"}`}
                  id="newpassword"
                  autoComplete="new-password"
                  placeholder="********"
                  className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("newpassword", {
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
              {errors.newpassword && (
                <p className="text-red-600 text-sm">
                  {errors.newpassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-[70%] space-y-2">
              <label htmlFor="confirmnewpassword" className="font-medium">
                Confirm Password
              </label>
              <div className="flex items-center justify-center relative">
                <input
                  type={`${confirmPassword ? "text" : "password"}`}
                  id="confirmnewpassword"
                  placeholder="********"
                  autoComplete="new-password"
                  className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("confirmnewpassword", {
                    required: {
                      value: true,
                      message: "Confirm Password is required",
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
                    setShowConfrimPassword(!confirmPassword);
                  }}
                >
                  {confirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.confirmnewpassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmnewpassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-slate-600 text-white rounded-lg px-8 py-2 mt-4 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Change
            </button>
          </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default NewPassword;
