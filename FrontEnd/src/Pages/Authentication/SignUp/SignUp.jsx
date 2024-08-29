import AuthenticationWrapper from "@components/AuthenticationWrapper";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <>
          <AuthenticationWrapper title={"Welcome To CRM Suite"}>
            <form className=" items-center flex flex-col w-full  my-10">
              <h3 className="text-center mt-5 font-semibold text-lg">
              Enter Details to Create  Free Account
              </h3>
              <div id="name" className="flex flex-col my-2 w-[70%]">
                <label htmlFor="name">Email</label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="p-2  rounded-[8px]"
                />
              </div>
              <div id="email-input" className="flex flex-col my-2 w-[70%]">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="abc@example.com"
                  className="p-2  rounded-[8px]"
                />
              </div>
              <div id="password-input" className="flex flex-col my-2 w-[70%]">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  className="p-2 rounded-[8px]"
                />
              </div>
              <div id="confirm-password-input" className="flex flex-col w-[70%] my-2">
                <label htmlFor="confrim-password">Password</label>
                <input
                  type="password"
                  id="confrim-password"
                  placeholder="********"
                  className="p-2 rounded-[8px]"
                />
              </div>
    
              <button className=" bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
                Sign Up
              </button>
              <p className=" w-[90%] text-center my-2">
                Do Have An Account?
                <br />
                <span>
                  Login Here <Link className="underline" to={'/Sign-in'}>Login</Link>
                </span>
              </p>
            </form>
          </AuthenticationWrapper>
        </>
      );
}

export default SignUp