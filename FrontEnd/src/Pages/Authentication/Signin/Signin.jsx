import { useForm } from "react-hook-form";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { Link, useNavigate } from "react-router-dom";
import AnimatePage from "@components/AnimatePage";
import Axios from "@hooks/Axios";
import { useAuthContext } from "@context/Auth";
const Signin = () => {
  const form = useForm();
  const navigate=useNavigate()
  const { handleSubmit, register, formState,reset } = form;
  const { errors } = formState;
  const authContext=useAuthContext()

  async function onSubmit(data) {
    try {
      const response=await Axios({requestType:"post",data:data,url:"/sign-in"})
      localStorage.setItem('enteredEmail',data.email)
      if(response.status==200){
        localStorage.removeItem('enteredEmail')
        const userdataObject=response.data
        for(let [key,value] of Object.entries(userdataObject)){
          if(key=='data' && typeof value === 'object'){
              Object.assign(localStorage,value)
            }else{
              localStorage.setItem(key,value)
            }
        }
        localStorage.setItem("enteredEmail",data.email)
        authContext.setIsAuthenticated(true)
        navigate('/Home/Dashboard',{replace:true})
      }
    } catch (error) {
      console.log(error.message)
    }finally{
      // reset()
    }
  }
  return (
    <>
      <AuthenticationWrapper title={"Welcome Back To Crm Suite"}>
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full my-10 p-4 md:p-6 lg:p-8 bg-transparent rounded-lg"
          >
            <h3 className="text-2xl font-semibold mb-6  dark:text-slate-100 text-gray-800">
              Log In to Your Account
            </h3>

            <div className="w-full max-w-md mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g., example@domain.com"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="email"
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
                <p className="text-red-600 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full max-w-md mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
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
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200 ease-in-out"
            >
              Log In
            </button>

            <div className="w-full max-w-md text-center mt-4">
              <Link
                className="text-blue-600 hover:underline"
                to="/Forget-password"
              >
                Forgot Password?
              </Link>
            </div>

            <p className="w-full max-w-md text-center mt-4 text-gray-600">
              Don't have an account?
              <br />
              <Link className="text-blue-600 hover:underline" to="/Sign-up">
                Create one for free
              </Link>
            </p>
          </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default Signin;
