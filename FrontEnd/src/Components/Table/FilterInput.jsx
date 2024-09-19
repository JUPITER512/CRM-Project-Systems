import { AiOutlineCloseCircle } from "react-icons/ai";

const FilterInput = ({value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type To Search..."
        className="border border-gray-300  text-black rounded p-2 m-2 flex-grow"
      />
      {value.length > 0 && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="ml-2 p-2 text-gray-600 hover:text-gray-800"
        >
          <AiOutlineCloseCircle />
        </button>
      )}
    </div>
  );
};

export default FilterInput;
