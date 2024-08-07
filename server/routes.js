const express=require("express")
const bcrypt=require("bcrypt")
const register=require("./schema")
const router=express.Router()
router.route("/").post(async (req,res)=>{
    try{
        const {email,username,password,DOB}=req.body
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)
        console.log(DOB)
        await register.create({
            email,
            username,
            password:hashedpassword,
            DOB
        })
        res.send("Success")
    }catch(error){
        console.log(error)
    }
})
router.route("/").get(async (req,res)=>{
    try{
        const datas=await register.find({})
        res.json(datas)
    }catch(error){
        console.log(error)
    }
    
})
router.route("/:email/:password").get(async (req,res)=>{
    try{
        const {email,password}=req.params
        const data=await register.findOne({email:email})
        if(data){
            // res.send(data)
            const check=await bcrypt.compare(password,data.password)
            if(check){
                res.send({success:true,amount:data.money,email:data.email})
            }
            else{
                res.send({success:false})
            }
        }
        else{
            res.json({success:false})
        }
    }catch(error){
        console.log(error)
    }
})
router.route("/").patch(async (req,res)=>{
    const {email,money}=req.body
    await register.updateOne({email:email},
        {$set:{money:money}}
    )
    res.send("Success")
})
module.exports=router