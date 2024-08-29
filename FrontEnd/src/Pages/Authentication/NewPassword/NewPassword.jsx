import AuthenticationWrapper from "@components/AuthenticationWrapper";
const NewPassword = () => {
  return (
    <>
      <AuthenticationWrapper title={"Welcome Back To CRM Suite Password Changer"}>
        <form className=" items-center flex flex-col w-full  my-10">
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
            />
          </div>
          <div id="password-input" className="flex flex-col w-[70%] my-2">
            <label htmlFor="confrimnewpassword">Confrim Password</label>
            <input
              type="password"
              id="confrimnewpassword"
              placeholder="********"
              className="p-2 rounded-[8px]"
            />
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
