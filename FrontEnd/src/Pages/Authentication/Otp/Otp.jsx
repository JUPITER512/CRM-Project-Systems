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

        <form onSubmit={handleSubmit(onSubmit)} className=" items-center flex flex-col w-full  my-10">
          <h3 className="text-center mt-5 font-semibold text-lg">
            Enter Code Receive On Email
          </h3>
          <div id="code-input" className="flex flex-col my-4 w-[70%]">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              id="code"
              maxLength={"6"}
              placeholder="123456"
              className="p-2  rounded-[8px]"
              {...register('otpcode',{
                required:{
                  value:true,
                  message:"Otp Code is Required"
                },
                pattern:{
                  value:/^\d{6}$/,
                  message:"Invalid Code"
                }
              })}
            />
                        {errors.otpcode && (
              <p className="text-red-600 text-sm">{errors.otpcode.message}</p>
            )}
          </div>
          <button className=" bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
            Submit
          </button>
          <p className=" w-[90%] text-center my-2">
            Remember Your Password?
            <br />
            <span>
              Login Here
              <Link className="underline" to={"/Sign-in"}>
                &nbsp;Login
              </Link>
            </span>
          </p>
        </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default Otp;
