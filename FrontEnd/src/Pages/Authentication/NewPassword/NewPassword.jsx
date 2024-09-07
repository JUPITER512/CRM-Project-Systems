import AnimatePage from "@components/AnimatePage";
import AuthenticationWrapper from "@components/AuthenticationWrapper";
import Axios from "@hooks/Axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const form = useForm();
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const response = await Axios({
        requestType: "post",
        url: "/api/change-password",
        data: {
          email: localStorage.getItem("email"),
          id: localStorage.getItem("id"),
          confirmPassword: data.confirmnewpassword,
          password: data.newpassword,
        },
      });
      if (response.status==200){
        localStorage.clear();
        navigate('/Sign-In',{replace:true})
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <AuthenticationWrapper
        title={"Welcome Back To CRM Suite Password Changer"}
      >
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full my-10 space-y-4"
          >
            <h3 className="text-center font-semibold text-lg">
              Enter New Password
            </h3>

            <div className="flex flex-col w-[70%] space-y-2">
              <label htmlFor="newpassword" className="font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newpassword"
                placeholder="********"
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("newpassword", {
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
              {errors.newpassword && (
                <p className="text-red-600 text-sm">
                  {errors.newpassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col w-[70%] space-y-2">
              <label htmlFor="confirmnewpassword" className="font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmnewpassword"
                placeholder="********"
                className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("confirmnewpassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  pattern: {
                    value: /^(?=[A-Za-z0-9]{8,}$)[A-Za-z0-9]+$/,
                    message:
                      "Password must be at least 8 characters and alphanumeric",
                  },
                })}
              />
              {errors.confirmnewpassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmnewpassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-slate-600 text-white rounded-lg px-8 py-2 mt-4 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Change
            </button>
          </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default NewPassword;
