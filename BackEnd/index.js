import app from "./src/app.js";
import ConnectDb from './src/DB/index.db.js';

const port=process.env.PORT || 8080

ConnectDb().then(()=>{
    app.listen(port ,()=>{
        console.log(`Server Started on Port ${port}`)
    })
}).catch(()=>{
    console.log("Error while connecting db and starting the server")
})