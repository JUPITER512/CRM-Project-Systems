import PictureUpload from "./PictureUpload";

const ProfileSettings = () => {
  return (
    <div className="bg-gray-50 rounded-2xl py-4 mt-2 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center py-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Profile Settings
      </h2>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <form className="w-full lg:w-[40%] bg-gray-100 flex flex-col items-center rounded-2xl py-6 px-4">
          <div className="flex flex-col my-4 w-full max-w-sm">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              defaultValue={"Default Name"}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col my-4 w-full max-w-sm">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              defaultValue="abc@example.com"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col my-4 w-full max-w-sm">
            <label htmlFor="contact" className="text-sm font-medium text-gray-700">Contact No.</label>
            <input
              type="text"
              id="contact"
              defaultValue="+32141231231"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col my-4 w-full max-w-sm">
            <label htmlFor="address" className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              defaultValue={"address"}
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col my-4 w-full max-w-sm">
            <label htmlFor="company" className="text-sm font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              id="company"
              defaultValue="xyz"
              className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <button className="bg-slate-400 px-6 py-2 rounded-lg text-white" disabled={true}>Update</button>
        </form>
        <div className="w-full lg:w-[50%] mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <PictureUpload/>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
