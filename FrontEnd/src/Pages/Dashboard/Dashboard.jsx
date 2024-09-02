import AnimatePage from "@components/AnimatePage";
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <AnimatePage>
      <main className="w-full bg-white dark:bg-gray-900 px-6 py-8 rounded-lg antialiased border-none">
        <section className="rounded-xl p-4">
          <div className="bg-gray-400 dark:bg-gray-600 flex flex-col md:flex-row gap-6 m-4 rounded-lg p-6 items-center justify-center">
            <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
              <h1 className="text-xl font-semibold text-white dark:text-gray-200">Heading</h1>
              <div className="text-white dark:text-gray-400 mt-2">Content</div>
            </div>
            <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
              <h1 className="text-xl font-semibold text-white dark:text-gray-200">Heading</h1>
              <div className="text-white dark:text-gray-400 mt-2">Content</div>
            </div>
            <div className="bg-slate-500 dark:bg-slate-700 w-full md:w-1/3 lg:w-1/4 rounded-lg p-4">
              <h1 className="text-xl font-semibold text-white dark:text-gray-200">Heading</h1>
              <div className="text-white dark:text-gray-400 mt-2">Content</div>
            </div>
          </div>
        </section>
      </main>
    </AnimatePage>
  );
};

export default Dashboard;
