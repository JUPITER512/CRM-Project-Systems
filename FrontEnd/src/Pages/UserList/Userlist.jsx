import AnimatePage from "@components/AnimatePage";
import Table from "@components/Table";
const tableData = {
  name: ["Ali", "Murtaza", "Bokhari", "Syed Ali"],
  email: [
    "ali@gmail.com",
    "murtaza@gmail.com",
    "bokhari@gmail.com",
    "syedali@gmail.com",
  ],
  phoneNo: [123456, 123456, 123456, 123456],
  country: ["Pakistan", "Canada", "Russia", "Finland"],
  status: [true, false, true, false],
};

const Userlist = () => {
  return (
    <AnimatePage>
      <div className=" w-full bg-white">
        <Table data={tableData} />
      </div>
    </AnimatePage>
  );
};

export default Userlist;
