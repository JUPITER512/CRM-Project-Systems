export const Columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Contact No.",
    accessorKey: "contact",

  },
  {
    header: "Country",
    accessorKey: "country",

  },
  {
    header: "Status",
    accessorKey: "status",

  },
  {
    header: "Action",
    id: "actions",
    cell: (props) => {
      const row = props.row.original;
      const handleView = () => {
        alert(`Viewing ${row.name}`);
      };

      const handleUpdate = () => {
        alert(`Updating ${row.name}`);
      };

      const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
          alert(`Deleted ${row.name}`);
        }
      };
      return (
        <div className="flex space-x-2">
          <button
            onClick={handleView}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            View
          </button>
          <button
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      );
    },
  },
];
