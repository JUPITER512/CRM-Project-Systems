import { useForm } from "react-hook-form";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { Link } from "react-router-dom";
import AnimatePage from "@components/AnimatePage";
const Signin = () => {
  const form = useForm();
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <>
      <AuthenticationWrapper title={"Welcome Back To Crm Suite"}>
        <AnimatePage>

        <form onSubmit={handleSubmit(onSubmit)} className=" items-center flex flex-col w-full  my-10 ">
          <h3 className="text-center mt-5 font-semibold text-lg">
            Enter your Credentials To login
          </h3>
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
          <button className=" bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
            Login
          </button>
          <Link className="underline font-semibold my-2" to={'/Forget-password'}>Forget Password?</Link>
          <p className=" w-[90%] text-center my-2">
            Don't Have An Account?
            <br />
            <span>
              Create One for Free <Link className="underline" to={'/Sign-up'}>Sign Up</Link>
            </span>
          </p>
        </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default Signin;
