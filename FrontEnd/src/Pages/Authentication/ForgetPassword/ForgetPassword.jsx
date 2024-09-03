import AuthenticationWrapper from "@components/AuthenticationWrapper";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AnimatePage from "@components/AnimatePage";

const ForgetPassword = () => {
  const form = useForm();
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <>
      <AuthenticationWrapper title={"Welcome To CRM Suite Email Verifier"}>
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" items-center flex flex-col w-full  my-10"
          >
            <h3 className="text-center mt-5 font-semibold text-lg">
              Enter Your Email to Get Code
            </h3>
            <div id="email-input" className="flex flex-col my-4 w-[70%]">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="abc@example.com"
                className="p-2  rounded-[8px]"
                {...register("forgetpasswordemail", {
                  required: {
                    value: true,
                    message: "Email required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.forgetpasswordemail && (
                <p className="text-red-600 text-sm">
                  {errors.forgetpasswordemail.message}
                </p>
              )}
            </div>
            <button className=" bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
              Get Code
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

export default ForgetPassword;
