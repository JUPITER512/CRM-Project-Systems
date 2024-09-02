import AuthenticationWrapper from "@components/AuthenticationWrapper";
import { useForm } from "react-hook-form";

const NewPassword = () => {
  const form = useForm();
  const { handleSubmit, register, formState } = form;
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);
  }
  return (
    <>
      <AuthenticationWrapper
        title={"Welcome Back To CRM Suite Password Changer"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" items-center flex flex-col w-full  my-10"
        >
          <h3 className="text-center mt-5 font-semibold text-lg">
            Enter New Password
          </h3>
          <div id="password-input" className="flex flex-col w-[70%] my-2">
            <label htmlFor="newpassword">New Password</label>
            <input
              type="password"
              id="newpassword"
              placeholder="********"
              className="p-2 rounded-[8px]"
              {...register("newpassword", {
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
            {errors.newpassword && (
              <p className="text-red-600 text-sm">
                {errors.newpassword.message}
              </p>
            )}
          </div>
          <div id="password-input" className="flex flex-col w-[70%] my-2">
            <label htmlFor="confrimnewpassword">Confrim Password</label>
            <input
              type="password"
              id="confrimnewpassword"
              placeholder="********"
              className="p-2 rounded-[8px]"
              {...register("confrimnewpassword", {
                required: {
                  value: true,
                  message: "Confrim Password is required",
                },
                pattern: {
                  value: /^(?=[A-Za-z0-9]{8,}$)[A-Za-z0-9]+$/,
                  message: "Password must be at least 8 characters and alphanumeric",
                },
              })}
            />
            {errors.confrimnewpassword && (
              <p className="text-red-600 text-sm">
                {errors.confrimnewpassword.message}
              </p>
            )}
          </div>
          <button className=" bg-slate-600 mt-4 mb-2 rounded-[8px] px-8 py-[0.4rem]">
            Change
          </button>
        </form>
      </AuthenticationWrapper>
    </>
  );
};

export default NewPassword;
