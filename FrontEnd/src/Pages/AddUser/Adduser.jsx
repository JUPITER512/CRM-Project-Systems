import React from 'react';

const Adduser = () => {
  const today = new Date().toISOString().split("T")[0];
  console.log(today);

  return (
    <>
      <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8 rounded-lg">
        <form className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="flex flex-col my-2">
              <label htmlFor="Name" className="text-sm font-semibold">Full Name</label>
              <input
                type="text"
                id="Name"
                placeholder="John Doe"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="gender" className="text-sm font-semibold">Gender</label>
              <select id="gender" className="p-2 border border-gray-300 rounded-md bg-white">
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="Dob" className="text-sm font-semibold">Date of Birth:</label>
              <input
                type="date"
                id="Dob"
                className="p-2 border border-gray-300 rounded-md"
                max={today}
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="email" className="text-sm font-semibold">Email :</label>
              <input
                type="email"
                id="email"
                placeholder="abc@gmail.com"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="PrimaryPhone" className="text-sm font-semibold">Primary Phone :</label>
              <input
                type="text"
                id="PrimaryPhone"
                placeholder="+2231313"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col my-2">
              <label htmlFor="AlternatPhone" className="text-sm font-semibold">Alternative Phone :</label>
              <input
                type="text"
                id="AlternatPhone"
                placeholder="+2231313"
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4">
            <div className="bg-gray-200 rounded-lg p-4">
              <h3 className="text-left font-semibold text-lg mb-2">Address</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="address1" className="text-sm font-semibold">Address Line 1</label>
                  <input
                    type="text"
                    id="address1"
                    placeholder="123 Main St"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address2" className="text-sm font-semibold">Address Line 2</label>
                  <input
                    type="text"
                    id="address2"
                    placeholder="Apt 4B"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="city" className="text-sm font-semibold">City</label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="state" className="text-sm font-semibold">State</label>
                  <input
                    type="text"
                    id="state"
                    placeholder="State"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zip" className="text-sm font-semibold">Zip Code</label>
                  <input
                    type="text"
                    id="zip"
                    placeholder="Zip Code"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-4">
              <h3 className="text-left font-semibold text-lg mb-2">Communication Preferences/Status</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="CommunicationPreferences" className="text-sm font-semibold">Communication Preferences</label>
                  <input
                    type="text"
                    id="CommunicationPreferences"
                    placeholder="i.e. Email, Phone, SMS, etc"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Status" className="text-sm font-semibold">Status</label>
                  <input
                    type="text"
                    id="Status"
                    placeholder="Active, Inactive"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-4">
              <h3 className="text-left font-semibold text-lg mb-2">Company Info (If Applicable)</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="CompanyName" className="text-sm font-semibold">Company Name</label>
                  <input
                    type="text"
                    id="CompanyName"
                    placeholder="i.e. Kolson"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="JobTitle" className="text-sm font-semibold">Job Title</label>
                  <input
                    type="text"
                    id="JobTitle"
                    placeholder="Salesman"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-4">
              <h3 className="text-left font-semibold text-lg mb-2">Additional Information</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="Notes" className="text-sm font-semibold">Notes</label>
                  <textarea
                    id="Notes"
                    placeholder="i.e. Any additional notes"
                    className="p-2 border border-gray-300 rounded-md resize-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="SourceofLead" className="text-sm font-semibold">Source of Lead</label>
                  <input
                    type="text"
                    id="SourceofLead"
                    placeholder="How the customer was acquired"
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <button className='mx-auto bg-slate-300 w-[100%] md:w-[20%] px-6 py-2 rounded-lg shadow-lg relative left-[50%] translate-x-[-50%]'>Add +</button>
        </form>
      </div>
    </>
  );
};

export default Adduser;
