import AnimatePage from "@components/AnimatePage";
import PictureUpload from "./PictureUpload";
import { useForm } from "react-hook-form";
import Axios from "@hooks/Axios";
import notify from "../../utils/ToasterFunction";
import { phoneNumberSchema } from "../../Utils/InputValidation.js";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify";
const schema = yup.object().shape({
  contact: phoneNumberSchema.fields.phoneNumber,
});

const ProfileSettings = () => {
  const form = useForm({
    defaultValues: {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      contact: localStorage.getItem("contact"),
      address: localStorage.getItem("address"),
      companyName: localStorage.getItem("companyName"),
    },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;
  const isFormEdited = formState.isDirty;

  const onSubmit = async (data) => {
    try {
      const response = await Axios({
        requestType: "put",
        url: "/update-user-info",
        data: {
          name: data.name,
          contact: data.contact,
          address: data.address,
          companyName: data.companyName,
        },
      });
      if (response.status == 200) {
        const updatedData = response.data.data;
        Object.assign(localStorage, updatedData);
        setValue("name", updatedData.name);
        setValue("contact", updatedData.contact);
        setValue("address", updatedData.address);
        setValue("companyName", updatedData.companyName);
        notify({
          message: "Profile Information Update Successully",
          position: "top-right",
          autocloseTime: 1000,
          type: "success",
          theme: `${
            localStorage.getItem("theme") == "false" ? "light" : "dark"
          }`,
        });
      }
    } catch (error) {
      console.log(error);
      notify({
        message: `Error While Upating info ${error.message}`,
        position: "top-right",
        autocloseTime: 1000,
        type: "error",
        theme: `${localStorage.getItem("theme") == "false" ? "light" : "dark"}`,
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <AnimatePage>
        <div className="bg-gray-200 dark:bg-gray-900 rounded-2xl py-4 mt-2 px-4 sm:px-6 lg:px-8">
          <h2 className="text-center py-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Profile Settings
          </h2>
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full lg:w-[40%] bg-gray-100   dark:bg-slate-400 flex flex-col items-center rounded-2xl py-6 px-4"
            >
              <div className="flex flex-col my-4 w-full max-w-sm">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={"Default Name"}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200 "
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name?.message}</p>
                )}
              </div>
              <div className="flex flex-col my-4 w-full max-w-sm">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  disabled={true}
                  {...register("email")}
                  type="text"
                  id="email"
                  defaultValue="abc@example.com"
                  className="mt-1 p-2 cursor-not-allowed border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-600 dark:text-gray-200 "
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col my-4 w-full max-w-sm">
                <label
                  htmlFor="contact"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact No.
                </label>
                <input
                  type="text"
                  id="contact"
                  {...register("contact")}
                  defaultValue="+32141231231"
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200 "
                />
                {errors.contact && (
                  <p className="text-red-600 text-sm">
                    {errors.contact?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col my-4 w-full max-w-sm">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  {...register("address")}
                  id="address"
                  defaultValue={"address"}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200 "
                />
                {errors.address && (
                  <p className="text-red-600 text-sm">
                    {errors.address?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col my-4 w-full max-w-sm">
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  defaultValue="xyz"
                  {...register("companyName")}
                  className="mt-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200 "
                />
                {errors.companyName && (
                  <p className="text-red-600 text-sm">
                    {errors.companyName?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={`hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg px-6 py-2 ${
                  !isFormEdited
                    ? "bg-blue-300 dark:bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500"
                }`}
                disabled={!isFormEdited}
              >
                Update
              </button>
            </form>
            <div className="w-full lg:w-[40%] mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <PictureUpload />
            </div>
          </div>
        </div>
      </AnimatePage>
    </>
  );
};

export default ProfileSettings;
