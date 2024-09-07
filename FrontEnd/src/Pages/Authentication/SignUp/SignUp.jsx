import AnimatePage from "@components/AnimatePage";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Axios from "@hooks/Axios";
const SignUp = () => {
  const navigate=useNavigate()
  const form = useForm();
  const { handleSubmit, register, formState, getValues, reset } = form;
  const { errors } = formState;

  async function onSubmit(data) {
    try {
      const response = await Axios({
        requestType: "post",
        url: "/api/sign-up",
        data: data,
      });
      if (response.status == 200) {
        console.log("Account Created");
<<<<<<< HEAD
        navigate('/Sign-up',{replace:true})
=======
        navigate("/api/sign-in", { replace: true });
        reset();
>>>>>>> 9981cd9b43c8af7d109836a9feee411559404955
      }
    } catch (error) {
      console.log(`Error while signin in`);
    }
  }

  return (
    <>
      <AuthenticationWrapper title={"Welcome To CRM Suite"}>
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full max-w-md mx-auto px-6 pt-4 pb-2 rounded-lg"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-slate-100 mb-6 text-center">
              Create Your Free Account
            </h3>

            <div className="w-full mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                autoComplete="name"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@example.com"
                autoComplete="email"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <div className="w-full mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder="********"
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

            <div className="w-full mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="********"
                autoComplete="new-password"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="text-red-600 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors duration-200"
            >
              Sign Up
            </button>

            <p className="w-full text-center mt-4 text-slate-600">
              Already have an account?
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

export default SignUp;
