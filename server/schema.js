const mongoose=require("mongoose")
const register=mongoose.Schema({
    email:{
        type:String,
        required:[true,"please provide an Valid email"],
        unique:[true,"email already exist"]
    },
    username:{
        type:String,
        required:[true,"please Enter the username"],
        unique:[true,"username already exist"]

    },
    password:{
        type:String,
        required:[true,"please provid ethe password"]
    },
    DOB:{
        type:String,
        reqired:[true,"please provide the dob"]
    },
    money:{
        type:String,
        default:2000,
    }
})
module.exports=mongoose.model("register",register)