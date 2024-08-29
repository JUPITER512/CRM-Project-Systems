import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-gray-50 rounded-2xl h-[97%] flex flex-col my-2">
      <h2 className="text-center py-4 font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl">
        Dashboard
      </h2>
      <div className="flex flex-col h-full justify-evenly items-center">
        <div className="bg-slate-600 h-[25%] w-[60%] flex items-center justify-center rounded-2xl gap-6">
          <div className="bg-yellow-100 w-3/12 h-[80%] rounded-xl">
            <h3 className="font-semibold ml-4 mt-4 text-xl">Title</h3>
            <div className="ml-4 mt-2">Content</div>
          </div>
          <div className="bg-yellow-100 w-3/12 h-[80%] rounded-xl">
            <h3 className="font-semibold ml-4 mt-4 text-xl">Title</h3>
            <div className="ml-4 mt-2">Content</div>
          </div>
          <div className="bg-yellow-100 w-3/12 h-[80%] rounded-xl">
            <h3 className="font-semibold ml-4 mt-4 text-xl">Title</h3>
            <div className="ml-4 mt-2">Content</div>
          </div>
        </div>
        <div className="w-11/12 h-[50%]">
          <div className=" flex items-center justify-between px-2">
            <h4 className=" font-semibold">Recently Added Customers</h4>
            <Link to={'/home/Userlist'} className=" font-semibold underline">See All Customers -{'>'}</Link>
          </div>
          <div className="bg-slate-100 rounded-2xl h-full">hello</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
