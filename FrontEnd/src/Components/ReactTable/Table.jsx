import React from "react";


const Table = ({data}) => {
  const handleEdit = (index) => {
    console.log("Edit", index);
  };

  const handleDelete = (index) => {
    console.log("Delete", index);
  };

  return (
    <div className="overflow-x-auto bg-gray-100 p-4 rounded-lg shadow-lg">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Contact No#</th>
            <th className="py-3 px-4 border-b">Country</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.name.map((name, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition-colors duration-300"
            >
              <td className="py-3 px-4 border-b">{name}</td>
              <td className="py-3 px-4 border-b">{data.email[index]}</td>
              <td className="py-3 px-4 border-b">{data.phoneNo[index]}</td>
              <td className="py-3 px-4 border-b">{data.country[index]}</td>
              <td className="py-3 px-4 border-b">{data.status[index] ? "Active" : "Inactive"}</td>
              <td className="py-3 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300 mr-2"
                >
                  Edit
                  {/* <FaEdit size={16} /> */}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  Del
                  {/* <FaTrash size={16} /> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
