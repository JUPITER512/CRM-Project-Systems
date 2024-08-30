import AnimatePage from "@components/AnimatePage";
import Table from "@components/Table";
import BasicTable from "@components/BasicTable";
import React from "react";
import { Link } from "react-router-dom";
import SortingTable from "@components/SortingTable";
import FilterTable from "@components/FilterTable";
import PaginationTable from "@components/PaginationTable";
const tableData = {
  name: ["Ali", "Murtaza",],
  email: ["ali@gmail.com", "murtaza@gmail.com",],
  phoneNo: [123456, 123456],
  country: ["Pakistan", "Canada"],
  status: [true, false,],
};

const Dashboard = () => {
  return (
    <AnimatePage>

    <main className="w-[100%] bg-white px-10 py-8 rounded-lg antialiased outline-none border-none">
      <section className="Content bg-slate-200 rounded-xl p-4 flex flex-col ">
        <div className="bg-gray-400 flex flex-col md:flex-row gap-10 m-6 rounded-lg items-center justify-center py-10">
          <div className=" bg-slate-500 w-[80%]  lg:w-[25%] rounded-lg p-4">
            <h1>Heading</h1>
            <div>Content</div>
          </div>
          <div className=" bg-slate-500 w-[80%] lg:w-[25%] rounded-lg p-4">
            <h1>Heading</h1>
            <div>Content</div>
          </div>
          <div className=" bg-slate-500 w-[80%] lg:w-[25%] rounded-lg p-4">
            <h1>Heading</h1>
            <div>Content</div>
          </div>
        </div>
        <div className=" w-[95%] rounded-lg bg-slate-50 mx-auto">
          <section className=" flex px-4 justify-between">
            <h3 className=" font-semibold text-sm md:text-lg">Recently Added Customers</h3>
            <Link className="underline font-semibold text-sm md:text-lg" to={"/Home/CustomerList"}>Check All Customers</Link>
          </section>
          <div className="min-h-[20rem]">
            {/* <BasicTable/> */}
            {/* <SortingTable/> */}
            {/* <FilterTable/> */}
            <PaginationTable/>
              {/* <Table data={tableData}/> */}
          </div>
        </div>
      </section>
    </main>
    </AnimatePage>
  );
};

export default Dashboard;
