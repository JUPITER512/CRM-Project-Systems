import {v2 as cloudinary} from 'cloudinary';
import fs  from "fs";

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_Cloud_Name,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
async function Cloudinary_Uplooad(filepath) {
    try {
        if(!filepath)return null
        const response=await cloudinary.uploader.upload(filepath,{
            resource_type:"image",
        })
        console.log("Image Has been successfully on cloudinary",response.secure_url)
        return response
    } catch (error) {
        console.log("Error While Uploading Picture to Cloudinary ",error.message)
        fs.unlinkSync(filepath);
        return null
    }
}
export default Cloudinary_Uplooad