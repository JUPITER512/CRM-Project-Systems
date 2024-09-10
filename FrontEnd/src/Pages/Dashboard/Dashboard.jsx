import AnimatePage from "@components/AnimatePage";
import {
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from "recoil";
import Axios from "@hooks/Axios";
import { customerDataFamily } from "../../Store/CustomerData";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [customerData, setCustomerData] = useRecoilStateLoadable(customerDataFamily);

  const { isLoading, isError } = useQuery({
    queryKey: ['customer_data'],
    queryFn: async () => {
      const response = await Axios({
        requestType: "get",
        url: "/me_customer_info",
      });
      if (response.status === 200) {
        const data = response.data.customer_data;
        setCustomerData({
          totalCustomers: Math.max(0, data.totalCustomers),
          males: Math.max(0, data.males),
          females: Math.max(0, data.females),
          havePhone: Math.max(0, data.havePhone),
          communicationPreferences: data.communicationPreferences || {},
          activeCount: Math.max(0, data.activeCount),
        });
        return data;
      }
    },
    enabled: customerData.contents.totalCustomers === 0,
  });

  if (customerData.state === "loading" || isLoading) {
    return <div>Loading...</div>;
  }

  if (customerData.state === "hasError" || isError) {
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

  // Ensure that calculated values are not less than 0
  const inactiveCount = Math.max(0, totalCustomers - activeCount);
  const noPhoneCount = Math.max(0, totalCustomers - havePhone);

  return (
    <AnimatePage>
      <main className="bg-white dark:bg-gray-900 px-6 py-8 rounded-lg antialiased border-none">
        <h1 className="text-center text-2xl md:text-4xl lg:text-4xl font-bold">Dashboard</h1>
        <div className="bg-gray-400 dark:bg-gray-600 grid lg:grid-cols-2 gap-2 m-4 rounded-lg p-6 items-center justify-center">
          <div className="bg-slate-500 dark:bg-slate-700 w-full rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white dark:text-gray-200">
              Total Customers
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Total : {Math.max(0, totalCustomers)}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              Remove : {localStorage.getItem('removedCustomer') || 0}
            </div>
          </div>
          <div className="bg-slate-500 dark:bg-slate-700 w-full rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white dark:text-gray-200">
              Customer Status
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Active : {Math.max(0, activeCount)}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              Inactive : {inactiveCount}
            </div>
          </div>
          <div className="bg-slate-500 dark:bg-slate-700 w-full rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white dark:text-gray-200">
              Gender
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Males : {Math.max(0, males)}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              Females : {Math.max(0, females)}
            </div>
          </div>
          <div className="bg-slate-500 dark:bg-slate-700 w-full rounded-lg p-4">
            <h1 className="text-xl font-semibold text-white text-center dark:text-gray-200">
              Count of customers with a phone number
            </h1>
            <div className="text-white dark:text-gray-400 mt-2">
              Yes : {Math.max(0, havePhone)}
            </div>
            <div className="text-white dark:text-gray-400 mt-2">
              No : {noPhoneCount}
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
                        style={{ width: `${(totalCustomers > 0 ? (count / totalCustomers) * 100 : 0)}%` }}
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
