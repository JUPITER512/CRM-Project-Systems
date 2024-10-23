import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import AnimatePage from "@components/AnimatePage";
import Axios from "@hooks/Axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { otpCode } from "../../../Utils/InputValidation.js";
import { ToastContainer } from "react-toastify";
import notify from "@utils/ToasterFunction.js";
const schema=yup.object().shape({
  otpcode:otpCode.fields.otp
})
const Otp = () => {
  const form = useForm({resolver:yupResolver(schema)});
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  async function onSubmit(data) {
    try {
      const response = await Axios({
        requestType: "post",
        url: "/verify-otp",
        data: {
          otp: data.otpcode,
          email: localStorage.getItem("forgetPasswordEmail"),
        },
      });
      if (response.status == 200) {
        localStorage.removeItem("forgetPasswordEmail");
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("id", response.data.user.id);
        notify({
          type: "success",
          message: "Otp Verified",
          position: "top-right",
          autocloseTime: 1000,
          theme: localStorage.getItem("theme") == "false" ? "light" : "dark",
        });
        setTimeout(() => {
          navigate("/Change-password", { replace: true });
        }, 1200);
      }
    } catch (error) {
      console.log(error);
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
      <AuthenticationWrapper title={"Welcome To CRM Suite Code Verifier"}>
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md mx-auto p-6  rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Enter the Code Sent to Your Email
            </h3>

            <div id="code-input" className="w-full mb-6">
              <label
                htmlFor="code"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="code"
                maxLength={6}
                placeholder="123456"
                className="w-full p-3 text-black border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("otpcode", {
                  required: {
                    value: true,
                    message: "OTP Code is required",
                  },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Invalid Code",
                  },
                })}
              />
              {errors.otpcode && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.otpcode.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Submit
            </button>

            <p className="w-full text-center mt-4 text-gray-600 dark:text-gray-300">
              Remember your password?
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

export default Otp;
