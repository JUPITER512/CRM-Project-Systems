import Axios from "@hooks/Axios";
import { useRecoilState } from "recoil";
import { userImageAtom } from "../../Store/UserImage";
import notify from "../../utils/ToasterFunction";
import { convertBase64 } from "./ConvertTOBase64";
import { ToastContainer } from "react-toastify";
const PictureUpload = () => {
  const [selectedFile, setSelectedFile] = useRecoilState(userImageAtom);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (selectedFile) {
        console.log(selectedFile);
        const res = await Axios({
          requestType: "put",
          url: "/upload-image-base64",
          data: { image: selectedFile },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {
          // localStorage.setItem("picture", URL.createObjectURL(selectedFile));
          notify(`Image Uploaded Successfully`, {
            position: "top-right",
            autoClose: 3000,
            theme: localStorage.getItem("theme") == "false" ? "light" : "dark",
          });
        }
      }
    } catch (error) {
      notify(`Error While Uploading picture: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: localStorage.getItem("theme") == "false" ? "light" : "dark",
      });
    }
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && file.size <= 1 * 1024 * 1024) {//bytes*kb*mb 
      console.log(file.size/1024,"KB ")
      try {
        const base64 = await convertBase64(file);
        setSelectedFile(base64);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('File size exceeds the limit');
    }
  }

  return (
    <div className="w-full max-w-md relative bg-gray-100 border border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center dark:bg-slate-400 dark:border-gray-600">
      <img
        src={selectedFile || localStorage.getItem("pictureBase64") || "/avatar.jpg"}
        alt="user-image"
        className="rounded-full h-24 w-24 bg-cover mb-4 border-2"
      />
      <ToastContainer/>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 items-center"
        encType="multipart/form-data"
      >
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
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name="picture"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-gray-300 px-4 py-2 rounded-lg dark:bg-gray-600 dark:text-gray-200"
        >
          Upload Picture
        </button>
      </form>
    </div>
  );
};

export default PictureUpload;
