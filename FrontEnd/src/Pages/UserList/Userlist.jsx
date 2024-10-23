import AnimatePage from "@components/AnimatePage";
import Table from "@components/Table/Table";

const Userlist = () => {
  return (
    <AnimatePage>
      <div className=" w-full bg-white dark:bg-slate-900 rounded-xl px-4 py-4">
        <Table/>
        <div className="p-4 flex justify-end">
      </div>
      </div>
    </AnimatePage>
  );
};

export default Userlist;
