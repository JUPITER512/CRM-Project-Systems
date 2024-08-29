import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <>
      <AuthenticationWrapper title={"Welcome Back To Crm Suite"}>
        <form className=" items-center flex flex-col w-full  my-10 ">
          <h3 className="text-center mt-5 font-semibold text-lg">
            Enter your Credentials To login
          </h3>
          <div id="email-input" className="flex flex-col my-4 w-[70%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="abc@example.com"
              className="p-2  rounded-[8px]"
            />
          </div>
          <div id="password-input" className="flex flex-col w-[70%]">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="p-2 rounded-[8px]"
            />
          </div>

          <button className=" bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
            Login
          </button>
          <Link className="underline font-semibold my-2">Forget Password?</Link>
          <p className=" w-[90%] text-center my-2">
            Don't Have An Account?
            <br />
            <span>
              Create One for Free <Link className="underline" to={'/Sign-up'}>Sign Up</Link>
            </span>
          </p>
        </form>
      </AuthenticationWrapper>
    </>
  );
};

export default Signin;
