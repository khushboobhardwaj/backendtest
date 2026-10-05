import mongoose from "mongoose";
import express from "express";
const app  = express();

const connect  = ()=> mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log(`This is connnected to mongo db url ${process.env.MONGO_URI}`)
}).catch (()=>{
    console.log("bring my error");
});
export default connect;