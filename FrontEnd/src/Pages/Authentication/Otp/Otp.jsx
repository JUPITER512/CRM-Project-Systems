import { useForm } from "react-hook-form";
import React from "react";
import { Link } from "react-router-dom";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import AnimatePage from "@components/AnimatePage";
const Otp = () => {
  const form = useForm();
  const { handleSubmit, register, formState } = form;
  // const{name,ref,onChange,onBlur}=register('otpCode')
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <>
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
    <label htmlFor="code" className="block text-gray-700 text-sm font-medium mb-2">
      Verification Code
    </label>
    <input
      type="text"
      id="code"
      maxLength={6}
      placeholder="123456"
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...register('otpcode', {
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
      <p className="text-red-600 text-xs mt-1">{errors.otpcode.message}</p>
    )}
  </div>

  <button
    type="submit"
    className="w-full bg-slate-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200"
  >
    Submit
  </button>

  <p className="w-full text-center mt-4 text-gray-600">
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
