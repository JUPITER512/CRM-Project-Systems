import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { Link, replace, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AnimatePage from "@components/AnimatePage";
import Axios from "@hooks/Axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { emailSchema } from "../../../utils/inputValidations.js";
import notify from "../../../utils/ToasterFunction.js";

const schema=yup.object().shape({
  forgetpasswordemail:emailSchema.fields.email
})
const ForgetPassword = () => {
  const form = useForm({resolver:yupResolver(schema)});
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;
  const navigate=useNavigate()
  async function onSubmit(data) {
    try {
      const response=await Axios({requestType:'post',url:"/forget-password",data:{email:data.forgetpasswordemail}})
      if(response.status==200){
        localStorage.setItem("forgetPasswordEmail",data.forgetpasswordemail)
        navigate('/Otp-Code',{replace:true})
      }
    } catch (error) {
      notify({
        message:error.response.data.message,
        position:'top-right',
        autocloseTime:3000,
        type:"error",
        theme:`${localStorage.getItem('theme')=='false'?"light":'dark'}`
      })
      console.log(error.message)
    }
  }
  return (
    <>
      <AuthenticationWrapper title={"Welcome To CRM Suite Email Verifier"}>
        <AnimatePage>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full my-10 p-4  rounded-lg"
          >
            <h3 className="text-center mt-4 font-semibold text-xl text-gray-800 dark:text-slate-100">
              Enter Your Email to Get Code
            </h3>
            <div className="flex flex-col my-4 w-full max-w-md">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-slate-100"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@example.com"
                className="mt-1 p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("forgetpasswordemail", {
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
              {errors.forgetpasswordemail && (
                <p className="mt-1 text-red-600 text-sm">
                  {errors.forgetpasswordemail.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-slate-600 text-white rounded-lg px-6 py-2 mt-4 hover:bg-slate-700 transition duration-300"
            >
              Get Code
            </button>
            <p className="text-center text-gray-600 mt-4">
              Remember your password?
              <br />
              <Link to="/Sign-in" className="text-blue-600 underline">
                Login here
              </Link>
            </p>
          </form>
        </AnimatePage>
      </AuthenticationWrapper>
    </>
  );
};

export default ForgetPassword;
