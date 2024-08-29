const PictureUpload = () => {
  return (
    <div className=" w-[80%] h-full rounded-xl  flex items-center justify-center border absolute right-0 bg-gray-100">
      <div className=" w-[100%] flex flex-col items-center justify-center gap-6">
        <img
          src="data:image/webp;base64,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"
          alt="user-image"
          className=" rounded-full h-[5rem] w-[5rem] bg-cover bg "
        />
        <form action="" className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center justify-center w-[60%]">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                  <span className="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <button className="bg-gray-300 px-4 py-2 rounded-lg">Upload Picture</button>
        </form>
      </div>
    </div>
  );
};

export default PictureUpload;
