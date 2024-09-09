import AnimatePage from "@components/AnimatePage";
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { customerDataSelector } from "../../Store/CustomerData";

const Dashboard = () => {
  const customerData = useRecoilValueLoadable(customerDataSelector);

  if (customerData.state === "loading") {
    return <div>Loading...</div>;
  }

  if (customerData.state === "hasError") {
    return <div>Error loading data...</div>;
  }
  const {
    totalCustomers,
    activeCount,
    males,
    females,
    havePhone,
    communicationPreferences,
  } = customerData.contents;

  return (
    <AnimatePage>
      <main className="bg-white dark:bg-gray-900 px-6 py-8 rounded-lg antialiased border-none">
        <div className="bg-gray-400 dark:bg-gray-600 flex flex-col flex-wrap md:flex-row gap-6 m-4 rounded-lg p-6 items-center justify-center">
          <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white dark:text-gray-200">
              Total Customers
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Total : {totalCustomers && parseInt(totalCustomers)}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              Remove : {localStorage.getItem('removedCustomer')}
            </div>
          </div>
          <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white dark:text-gray-200">
              Customer Status
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Active : {activeCount}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              InActive : {totalCustomers && parseInt(totalCustomers) - parseInt(activeCount)}
            </div>
          </div>
          <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white dark:text-gray-200">
              Gender
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Males : {males}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              Females : {females}
            </div>
          </div>
          <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white text-center dark:text-gray-200">
              Count of customers with a phone number
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Yes : {totalCustomers && havePhone}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              No : {totalCustomers && totalCustomers - havePhone}
            </div>
          </div>
        </div>
        <div className="bg-slate-500 dark:bg-slate-700 w-3/4 mx-auto rounded-lg p-4 overflow-y-auto">
          <h1 className="text-xl font-semibold text-white text-center dark:text-gray-200">
            Communication Preference
          </h1>
          <div className="mt-4">
            {communicationPreferences &&
              Object.entries(communicationPreferences).map(
                ([preference, count]) => (
                  <div key={preference} className="flex items-center mb-2">
                    <div className="w-1/3 text-white dark:text-gray-400">
                      {preference}
                    </div>
                    <div className="w-2/3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none"
                        style={{ width: `${(count / totalCustomers) * 100}%` }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </main>
    </AnimatePage>
  );
};

export default Dashboard;
