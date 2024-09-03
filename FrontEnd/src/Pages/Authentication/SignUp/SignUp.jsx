import AnimatePage from "@components/AnimatePage";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const SignUp = () => {
  const form = useForm();
  const { handleSubmit, register, formState, getValues } = form;
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <AuthenticationWrapper title={"Welcome To CRM Suite"}>
        <AnimatePage>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="items-center flex flex-col w-full"
        >
          <h3 className="text-center mt-5 font-semibold text-lg">
            Enter Details to Create Free Account
          </h3>
          <div id="name-input" className="flex flex-col my-2 w-[70%]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="p-2 rounded-[8px]"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div id="email-input" className="flex flex-col my-2 w-[70%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="abc@example.com"
              className="p-2 rounded-[8px]"
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
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div id="password-input" className="flex flex-col my-2 w-[70%]">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="p-2 rounded-[8px]"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                pattern: {
                  value: /^(?=[A-Za-z0-9]{8,}$)[A-Za-z0-9]+$/,
                  message: "Password must be at least 8 characters and alphanumeric",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div id="confirm-password-input" className="flex flex-col my-2 w-[70%]">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="********"
              className="p-2 rounded-[8px]"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm password is required",
                },
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button className="bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
            Sign Up
          </button>
          <p className="w-[90%] text-center my-2">
            Do you have an account?
            <br />
            <span>
              Login here{" "}
              <Link className="underline" to={"/Sign-in"}>
                Login
              </Link>
            </span>
          </p>
        </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default SignUp;
