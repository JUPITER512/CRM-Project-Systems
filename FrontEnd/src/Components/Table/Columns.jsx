export const Columns = [
  {
    header: "ID⬆️⬇️",
    accessorKey: "id",
    cell: (info) => <p  className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Name⬆️⬇️",
    accessorKey: "name",
    cell: (info) => <p  className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Email⬆️⬇️",
    accessorKey: "email",
    cell: (info) => <p  className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Contact No.⬆️⬇️",
    accessorKey: "contact",
    cell: (info) => <p  className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Country⬆️⬇️",
    accessorKey: "country",
    cell: (info) => <p className=" text-center">{info.getValue()}</p>,
  },
  {
    header: "Status⬆️⬇️",
    accessorKey: "status",
    cell: (info) => (
      <>
        {info.getValue() ? (
          <p className="bg-green-400 border border-green-500 text-gray-800 text-center p-2 rounded-lg font-semibold">
            Active
          </p>
        ) : (
          <p className="bg-red-400 border border-red-500 text-gray-800 text-center p-2 rounded-lg font-semibold">
            Inactive
          </p>
        )}
      </>
    ),
  },
  {
    header: "Action",
    id: "action",
    cell: info => (
      <div className="flex flex-col space-y-1">
        <button className="text-blue-600 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded border border-blue-500 bg-white transition duration-150 ease-in-out">
          View
        </button>
        <button className="text-yellow-600 hover:bg-yellow-100 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 px-4 py-2 rounded border border-yellow-500 bg-white transition duration-150 ease-in-out">
          Update
        </button>
        <button className="text-red-600 hover:bg-red-100 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 px-4 py-2 rounded border border-red-500 bg-white transition duration-150 ease-in-out">
          Delete
        </button>
      </div>
    ),
  },
];
