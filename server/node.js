const express=require("express")
const dotenv=require("dotenv").config()
const mongoose=require("mongoose")
const cors=require("cors")
const router = require("./routes")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/register",router)
const start=async function(){
    try{
        await  mongoose.connect(process.env.LINK)
        app.listen("5000",()=>{
            console.log("Listening to the port 5000")
        })
    }catch(e){
        console.log(e)
    }
}
start()