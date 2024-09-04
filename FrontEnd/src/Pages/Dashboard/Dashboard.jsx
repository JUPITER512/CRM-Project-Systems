import AnimatePage from "@components/AnimatePage";
import React from "react";

const Dashboard = () => {
  return (
    <AnimatePage>
      <main className="w-full bg-white dark:bg-gray-900 px-6 py-8 rounded-lg antialiased border-none">
          <div className="bg-gray-400 dark:bg-gray-600 flex flex-col flex-wrap md:flex-row gap-6 m-4 rounded-lg p-6 items-center justify-center">
            <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
              <h1 className="text-xl font-semibold text-white dark:text-gray-200">Total Customers</h1>
              <div className="text-white dark:text-gray-400 mt-2">Total : {}</div>
              <div className="text-white dark:text-gray-400 mt-2">Deleted : {}</div>
            </div>
            <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
              <h1 className="text-xl font-semibold text-white dark:text-gray-200">Customer Status</h1>
              <div className="text-white dark:text-gray-400 mt-2">Active : {}</div>
              <div className="text-white dark:text-gray-400 mt-2">InActive : {}</div>
            </div>
            <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
              <h1 className="text-xl font-semibold text-white dark:text-gray-200">Have Phone Number</h1>
              <div className="text-white dark:text-gray-400 mt-2">Yes :</div>
              <div className="text-white dark:text-gray-400 mt-2">No :</div>
            </div>
          </div>
      </main>
    </AnimatePage>
  );
};

export default Dashboard;
