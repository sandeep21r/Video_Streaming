import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants.js";
import dotenv from "dotenv";
import connectDB  from "./db/index.js";
import {app} from "./app.js";
dotenv.config({
    path: './env'
})

// import express from "express"
// const app = express()
// ;( async () => {
//     try{
//         await mongoose.connect('${process.env.MONGODB_URI}/${DB_NAME}')
//         app.on("error",(error) => {
//             console.log("ERRR:",error);
//             throw error
//         })
//         app.listen(process.env.port,() =>{
//             console.log('App is listening on part &{process.env.PORT}');
//         })
//     } catch(error){
//         console.error("ERROR: ",error)
//         throw err
//     }
// })()

connectDB()
.then(() =>{
    app.on("error",(error) => {
        console.log("ERRR:",error);
        throw error
    })
    app.listen(process.env.PORT || 8000,() =>{
        console.log(`Server is running ar port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("mongo db connection failed !!!",err);
})