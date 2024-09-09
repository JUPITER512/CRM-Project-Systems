import { IoIosAddCircle } from "react-icons/io";

const CustomerForm = ({handleSubmit,onSubmit,errors,register,today,isViewModelOnly}) => {
  return (
    <div className="w-full min-h-screen bg-gray-200 dark:bg-gray-900 p-4 md:p-6 lg:p-8 rounded-lg">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 lg:p-8 relative"
        noValidate
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="flex flex-col my-2">
            <label
              htmlFor="Name"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              disabled={isViewModelOnly}
              type="text"
              id="Name"
              placeholder="John Doe"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              {...register("basic.Name", { required: "Name is required" })}
            />
            {errors.basic?.Name && (
              <p className="text-red-600 text-sm dark:text-red-400">
                {errors.basic.Name.message}
              </p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="gender"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Gender
            </label>
            <select
              disabled={isViewModelOnly}
              id="gender"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              {...register("basic.gender", 
              //   {
              //   required: "Gender is required",
              // }
            )}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.basic?.gender && (
              <p className="text-red-600 text-sm dark:text-red-400">
                {errors.basic.gender.message}
              </p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="Dob"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Date of Birth
            </label>
            <input
              disabled={isViewModelOnly}
              type="date"
              id="Dob"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              max={today}
              {...register("basic.dob", {
                required: "Date of Birth is required",
              })}
            />
            {errors.basic?.dob && (
              <p className="text-red-600 text-sm dark:text-red-400">
                {errors.basic.dob.message}
              </p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              disabled={isViewModelOnly}
              type="email"
              id="email"
              placeholder="abc@gmail.com"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              {...register("basic.email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
                validate: (value) =>
                  value !== "admin@example.com" || "Enter a different Email",
              })}
            />
            {errors.basic?.email && (
              <p className="text-red-600 text-sm dark:text-red-400">
                {errors.basic.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="PrimaryPhone"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Primary Phone
            </label>
            <input
              disabled={isViewModelOnly}
              type="text"
              id="PrimaryPhone"
              placeholder="+2231313"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              {...register("basic.primaryPhone", {
                required: "Primary Phone is required",
                
              })}
            />
            {errors.basic?.primaryPhone && (
              <p className="text-red-600 text-sm dark:text-red-400">
                {errors.basic.primaryPhone.message}
              </p>
            )}
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="AlternatPhone"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Alternative Phone
            </label>
            <input
              disabled={isViewModelOnly}
              type="text"
              id="AlternatPhone"
              placeholder="+2231313"
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 dark:text-gray-200"
              {...register("basic.alternativePhone")}
            />
            {errors.basic?.alternativePhone && (
              <p className="text-red-600 text-sm dark:text-red-400">
                {errors.basic.alternativePhone.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4">
          <div className="bg-gray-200 dark:bg-slate-400 rounded-lg p-4">
            <h3 className="text-left font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">
              Address
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="address1"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Address Line 1
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="address1"
                  placeholder="123 Main St"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("address.address1", {
                    required: "Address Line 1 is required",
                  })}
                />
                {errors.address?.address1 && (
                  <p className="text-red-600 text-sm dark:text-red-400">
                    {errors.address.address1.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="address2"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Address Line 2
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="address2"
                  placeholder="Apt 4B"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("address.address2")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  City
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="city"
                  placeholder="City"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("address.city", {
                    required: "City is required",
                  })}
                />
                {errors.address?.city && (
                  <p className="text-red-600 text-sm dark:text-red-400">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="state"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  State
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="state"
                  placeholder="State"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("address.state", {
                    required: "State is required",
                  })}
                />
                {errors.address?.state && (
                  <p className="text-red-600 text-sm dark:text-red-400">
                    {errors.address.state.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="Country"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Country
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="Country"
                  placeholder="country"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("address.country", {
                    required: "Country is required",
                  })}
                />
                {errors.address?.country && (
                  <p className="text-red-600 text-sm dark:text-red-400">
                    {errors.address.country.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="zip"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Zip Code
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="zip"
                  placeholder="Zip Code"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("address.zipCode", {
                    required: "Zip Code is required",
                    pattern: {
                      value: /^[0-9]{5}(-[0-9]{4})?$/,
                      message: "Invalid Zip Code format",
                    },
                  })}
                />
                {errors.address?.zipCode && (
                  <p className="text-red-600 text-sm dark:text-red-400">
                    {errors.address.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-slate-400 rounded-lg p-4">
            <h3 className="text-left font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">
              Communication Preferences/Status
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="CommunicationPreferences"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Communication Preferences
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="CommunicationPreferences"
                  placeholder="i.e. Email, Phone, SMS, etc"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("communicationStatus.CommunicationPreferences")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="Status"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Status
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="Status"
                  placeholder="Active, Inactive"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("communicationStatus.status", {
                    validate: (fieldValue) => {
                      const trimmedValue = fieldValue.trim().toLowerCase();
                      if (
                        trimmedValue !== "active" &&
                        trimmedValue !== "inactive"
                      ) {
                        return "Only Active or Inactive Allowed";
                      }
                    },
                  })}
                />
                {errors.communicationStatus?.status && (
                  <p className="text-red-600 text-sm dark:text-red-400">
                    {errors.communicationStatus.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-slate-400 rounded-lg p-4">
            <h3 className="text-left font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">
              Company Info (If Applicable)
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="CompanyName"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Company Name
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="CompanyName"
                  placeholder="i.e. Kolson"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("company.name")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="JobTitle"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Job Title
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="JobTitle"
                  placeholder="Salesman"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("company.JobTitle")}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-slate-400 rounded-lg p-4">
            <h3 className="text-left font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">
              Additional Information
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="Notes"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Notes
                </label>
                <textarea
                  disabled={isViewModelOnly}
                  id="Notes"
                  placeholder="i.e. Any additional notes"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200 resize-none"
                  {...register("Additional.Notes")}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="SourceofLead"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Source of Lead
                </label>
                <input
                  disabled={isViewModelOnly}
                  type="text"
                  id="SourceofLead"
                  placeholder="How the customer was acquired"
                  className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-gray-200"
                  {...register("Additional.SourceofLead")}
                />
              </div>
            </div>
          </div>
        </div>

        {!isViewModelOnly && (
          <button
            type="submit"
            className="mx-auto bg-blue-500 text-white w-full md:w-1/5 px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <p className="flex items-center justify-center gap-2">
              {" "}
              Update <IoIosAddCircle className="text-xl" />
            </p>
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomerForm;
