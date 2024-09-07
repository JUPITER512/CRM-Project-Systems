import { Link } from "react-router-dom";
import { RiEditCircleFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ButtonAnimation from "@components/ButtonAnimation";
import Axios from "@hooks/Axios";
import { TableData } from "../../Store/TableData";
import { useSetRecoilState } from "recoil";
export const Columns = [
  {
    header: "ID⬆️⬇️",
    accessorKey: "id",
    cell: (info) => <p className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Name⬆️⬇️",
    accessorKey: "fullName",
    cell: (info) => <p className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Email⬆️⬇️",
    accessorKey: "email",
    cell: (info) => <p className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Contact No.⬆️⬇️",
    accessorKey: "primaryPhone",
    cell: (info) => <p className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Country⬆️⬇️",
    accessorKey: "address.country",
    cell: (info) => <p className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Status⬆️⬇️",
    accessorKey: "customerStatus",
    cell: (info) => (
      <>
        {info.getValue().toLowerCase()=='active' ? (
          <p className="bg-green-400 border border-green-500 text-gray-800 text-center p-1 rounded-lg font-semibold">
            Active
          </p>
        ) : (
          <p className="bg-red-400 border border-red-500 text-gray-800 text-center p-1 rounded-lg font-semibold">
            Inactive
          </p>
        )}
      </>
    ),
  },
  {
    header: "Action",
    id: "action",
    cell: (info) => {
      const id = info.row.original._id;
      const setState=useSetRecoilState(TableData)
      async function handleDelete(id) {
        try {
          const response=await Axios({
            requestType:"delete",
            url:'/remove-customer',
          })
          if(response.status==200){
            console.log("Customer remove from list")
            setState
          }
        } catch (error) {
          console.log(error.message)
        }
      }
      return (
        <div className="flex  justify-center items-center gap-2 ">
          <ButtonAnimation classname="text-blue-600 text-center hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded border border-blue-500 bg-white transition duration-150 ease-in-out">
            <Link
              to={`/Home/Customer/View-Customer-Info/${id}`}
            >
              <FaEye />
            </Link>
          </ButtonAnimation>
          <ButtonAnimation classname="text-yellow-600 text-center hover:bg-yellow-100 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2 rounded border border-yellow-500 bg-white transition duration-150 ease-in-out">
            <Link to={`/Home/Customer/Update-Customer-Info/${id}`}>
              <RiEditCircleFill />
            </Link>
          </ButtonAnimation>
          <ButtonAnimation>
            <button
              onClick={() => {
                handleDelete(id);
              }}
              className="text-red-600 hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 px-4 py-2 rounded border border-red-500 bg-white transition duration-150 ease-in-out"
            >
              <MdDeleteForever />
            </button>
          </ButtonAnimation>
        </div>
      );
    },
  },
];
