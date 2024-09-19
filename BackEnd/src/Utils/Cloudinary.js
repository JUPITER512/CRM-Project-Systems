// import {v2 as cloudinary} from 'cloudinary';
// import fs  from "fs";

// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_Cloud_Name,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_API_SECRET
// })
async function Cloudinary_Upload(filepath, public_id = null) {
    try {
      if (!filepath) {
        console.error("Filepath is required");
        return null;
      }
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }
      const response = await cloudinary.uploader.upload(filepath, {
        resource_type: "image",
      });
      console.log("Image Has been successfully uploaded to Cloudinary", response.secure_url);
      return response;
    } catch (error) {
      console.error("Error While Uploading Picture to Cloudinary", error.message);
      fs.unlink(filepath, (unlinkError) => {
        if (unlinkError) {
          console.error("Failed to delete the file after error:", unlinkError);
        }
      });
      return null;
    }
  }
  
export default Cloudinary_Upload