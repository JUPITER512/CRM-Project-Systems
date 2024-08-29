import PictureUpload from "./PictureUpload";

const ProfileSettings = () => {
  return (
    <div className="bg-gray-50 rounded-2xl h-[97%] mt-2">
      <h2 className="text-center py-4 font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Profile Settings
      </h2>
      <div className="flex justify-between w-full px-10">
        <form className=" w-[40%] bg-gray-100 flex flex-col items-center  rounded-2xl py-6">
          <div id="name-input" className="flex flex-col my-4 w-[60%]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={"Default Name"}
              className="p-2  rounded-[8px]"
            />
          </div>
          <div id="email-input" className="flex flex-col my-4 w-[60%]">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value="abc@example.com"
              className="p-2  rounded-[8px]"
            />
          </div>
          <div id="contact-input" className="flex flex-col my-4 w-[60%]">
            <label htmlFor="contact">Contact No.</label>
            <input
              type="text"
              id="contact"
              value="+32141231231"
              className="p-2  rounded-[8px]"
            />
          </div>
          <div id="address-input" className="flex flex-col my-4 w-[60%]">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={"address"}
              className="p-2  rounded-[8px]"
            />
          </div>
          <div id="company-input" className="flex flex-col my-4 w-[60%]">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              value="xyz"
              className="p-2  rounded-[8px]"
            />
          </div>
          <button className="bg-slate-400 px-6 py-2 rounded-lg" disabled={true}>Update</button>
        </form>
        <div className=" w-[50%] relative">
          <PictureUpload/>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
