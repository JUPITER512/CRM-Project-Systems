import AnimatePage from "@components/AnimatePage";
import Axios from "@hooks/Axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notify from '../../utils/ToasterFunction';



import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { passwordSchema } from "../../utils/inputValidations.js";
import { ToastContainer } from "react-toastify";


const schema=yup.object().shape({
  currentPassword:passwordSchema.fields.password,
  newPassword:passwordSchema.fields.password,
  confirmNewPassword:passwordSchema.fields.password
})
const Changepassword = () => {
  const navigate=useNavigate()
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver:yupResolver(schema)
  });
  const { register, handleSubmit, formState, reset} = form;
  const { errors } = formState;

  const handleChangePassword = async (data) => {
   try {
      const response=await Axios({
        requestType:'post',
        url:'/change-password-fromProfile',
        data:data
      })
      if(response.status==200){
        notify({
          message:"Password Change Login Again",
          position:'top-right',
          autocloseTime:2000,
          type:"success",
          theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
        })
        reset()
        setTimeout(() => {
          localStorage.clear()
          navigate('/Sign-in',{replace:true})
          location.reload()
        }, 1000);
        
      }
   } catch (error) {
    notify({
      message:`${error.response.data.message  }`,
      position:'top-right',
      autocloseTime:2000,
      type:"error",
      theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
    })
   }
  };

  return (
    <AnimatePage>
      <ToastContainer/>
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen bg-gray-300 dark:bg-gray-900 rounded-lg px-4">
        <h1 className="text-lg md:text-2xl font-bold  text-center">
          Hi {localStorage.getItem('name')} You Can Cange Your Password Here
        </h1>
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg ">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
            Change Your Password
          </h2>
          <form
            onSubmit={handleSubmit(handleChangePassword)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                placeholder="Current Password"
                {...register("currentPassword", {
                  required: "Current Password is required",
                })}
                className={` dark:text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                } dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.currentPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                placeholder="New Password"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
                className={` dark:text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  errors.newpassword ? "border-red-500" : "border-gray-300"
                } dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", {
                  required: "Confirm New Password is required",
                })}
                className={` dark:text-black mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
                  errors.confirmNewPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.confirmNewPassword && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-slate-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:bg-slate-500 dark:hover:bg-slate-600"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatePage>
  );
};

export default Changepassword;
