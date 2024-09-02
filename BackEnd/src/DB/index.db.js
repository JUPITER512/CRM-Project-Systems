import mongoose from "mongoose";
async function ConnectDb(){
    try {
        const response=await mongoose.connect(process.env.DB_CONNECTION+"/CRM");
        console.log("Database Connected On Host ",response.connection.host)
    } catch (error) {
        console.log("Error While Connecting DB");
        console.log(error.message)
        process.exit(1)
    }
}
export default ConnectDb