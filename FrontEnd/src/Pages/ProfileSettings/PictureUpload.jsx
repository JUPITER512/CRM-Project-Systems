import Axios from "@hooks/Axios";
import { useState } from "react";
const PictureUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('picture', selectedFile);
      const res = await Axios({
        requestType: 'put',
        url: '/upload-image',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if(res.status==200){
        console.log(res)
      }
    } else {
      console.log('No file selected');
    }
  }

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0])
  }

  return (
    <div className="w-full max-w-md relative bg-gray-100 border border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center dark:bg-slate-400 dark:border-gray-600">
    <img
      src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
      alt="user-image"
      className="rounded-full h-24 w-24 bg-cover mb-4 border-2"
    />
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center" encType="multipart/form-data">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag
              and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            name='picture'
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
          />
        </label>
      </div>
      <button type="submit" className="bg-gray-300 px-4 py-2 rounded-lg dark:bg-gray-600 dark:text-gray-200">
        Upload Picture
      </button>
    </form>
  </div>
);
};

export default PictureUpload;
