const Adduser = () => {
  const today = new Date().toISOString().split("T")[0];
  console.log(today);

  return (
    <>
      <button className="bg-slate-200 px-10 py-2 rounded-lg absolute right-4 top-4">
        Hello +
      </button>
      <div className="w-full my-4 min-h-screen">
        <form className="bg-white rounded-lg px-4 py-4">
          <div className="w-[95%] bg-gray-300 mx-auto rounded-lg flex flex-wrap px-10">
            <div
              id="Name-input"
              className="flex flex-col my-4 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] mx-6"
            >
              <label htmlFor="Name">Full Name</label>
              <input
                type="text"
                id="Name"
                placeholder="John Doe"
                className="p-2 rounded-[8px]"
              />
            </div>
            <div
              id="gender-input"
              className="flex flex-col my-4 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] mx-6"
            >
              <label htmlFor="gender">Gender</label>
              <select id="gender" className="p-2 rounded-[8px] bg-white">
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div
              id="Dob-input"
              className="flex flex-col my-4 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] mx-6"
            >
              <label htmlFor="Dob">Date of Birth:</label>
              <input
                type="date"
                id="Dob"
                className="p-2 rounded-[8px]"
                max={today}
              />
            </div>
            <div
              id="Email-input"
              className="flex flex-col my-4 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] mx-6"
            >
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                placeholder="abc@gmail.com"
                className="p-2 rounded-[8px]"
              />
            </div>
            <div
              id="PrimaryPhone-input"
              className="flex flex-col my-4 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] mx-6"
            >
              <label htmlFor="PrimaryPhone">Primary Phone :</label>
              <input
                type="text"
                id="PrimaryPhone"
                placeholder="+2231313"
                className="p-2 rounded-[8px]"
              />
            </div>
            <div
              id="AlternatPhone-input"
              className="flex flex-col my-4 w-full md:w-[45%] lg:w-[30%] xl:w-[20%] mx-6"
            >
              <label htmlFor="AlternatPhone">Alternative Phone :</label>
              <input
                type="text"
                id="AlternatPhone"
                placeholder="+2231313"
                className="p-2 rounded-[8px]"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly h-full my-2 gap-4 ">
            <div className="w-[45%] bg-gray-300 rounded-lg h-[30%]">
              <h3 className=" text-left font-semibold px-4">Address</h3>
              <div className="flex flex-wrap justify-evenly gap-6 my-2">
                <div id="email-input" className="flex flex-col w-[40%]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="abc@example.com"
                    className="p-2  rounded-[8px]"
                  />
                </div>
                <div id="email-input" className="flex flex-col w-[40%]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="abc@example.com"
                    className="p-2  rounded-[8px]"
                  />
                </div>
                <div id="email-input" className="flex flex-col w-[40%]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="abc@example.com"
                    className="p-2  rounded-[8px]"
                  />
                </div>
                <div id="email-input" className="flex flex-col w-[40%]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="abc@example.com"
                    className="p-2  rounded-[8px]"
                  />
                </div>
              </div>
            </div>

            <div className="w-[45%] bg-gray-300 rounded-lg h-[30%]">
              <h3 className=" text-left font-semibold px-4">Communication Preferences/Status              </h3>
              <div className="flex flex-col  mx-10 gap-6 my-2">
                <div id="CommunicationPreferences-input" className="flex flex-col w-[40%]">
                  <label htmlFor="CommunicationPreferences">Communication Preferences</label>
                  <input
                    type="text"
                    id="CommunicationPreferences"
                    placeholder="i.e.  Email, Phone, SMS, etc"
                    className="p-2  rounded-[8px]"
                  />
                </div>
                <div id="Status-input" className="flex flex-col w-[40%]">
                  <label htmlFor="Status">Status</label>
                  <input
                    type="text"
                    id="Status"
                    placeholder=" Active, Inactive"
                    className="p-2  rounded-[8px]"
                  />
                </div>
              </div>  
            </div>
            <div className="w-[45%] bg-gray-300 rounded-lg h-[30%]">
              <h3 className=" text-left font-semibold px-4">Company Info (If Applicable)             </h3>
              <div className="flex flex-col  mx-10 gap-6 my-2">
                <div id="CompanyName-input" className="flex flex-col w-[40%]">
                  <label htmlFor="CompanyName">Company Name</label>
                  <input
                    type="text"
                    id="CompanyName"
                    placeholder="i.e.  kolson"
                    className="p-2  rounded-[8px]"
                  />
                </div>
                <div id="JobTitle-input" className="flex flex-col w-[40%]">
                  <label htmlFor="JobTitle">Job Title</label>
                  <input
                    type="text"
                    id="JobTitle"
                    placeholder="Salesman"
                    className="p-2  rounded-[8px]"
                  />
                </div>
              </div>  
            </div>


          
            <div className="w-[45%] bg-gray-300 rounded-lg h-[30%]">
              <h3 className=" text-left font-semibold px-4">Additional Information</h3>
              <div className="flex flex-wrap flex-col mx-10  my-2">
                <div id="Notes-input" className="flex flex-col w-[40%]">
                  <label htmlFor="Notes">Notes</label>
                  <textarea
                    type="text"
                    id="Notes"
                    placeholder="i.e. Any additional notes"
                    className="p-2  rounded-[8px] resize-none"
                  />
                </div>
                <div id="SourceofLead-input" className="flex flex-col w-[40%]">
                  <label htmlFor="SourceofLead">Source of Lead</label>
                  <input
                    type="text"
                    id="SourceofLead"
                    placeholder="How the customer was acquired"
                    className="p-2  rounded-[8px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adduser;
