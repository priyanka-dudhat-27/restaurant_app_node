const mongoose=require("mongoose")
const User=require("../models/userModel")
const jwt=require("jsonwebtoken")

module.exports.requireLogin=async(req,res,next)=>{
    try {
        const {authorization} =req.headers;

        if(!authorization){
            return res.status(400).json({message:"you have to login first",success:0})
        }

        const token=authorization.replace("Bearer ","")
        jwt.verify(token,process.env.JWT_SECRET,async(err,payload)=>{
            if(err){
                return res.status(400).json({message:"Invalid or Expired token,you have to login first",success:0,err})
            }

            const {_id}=payload;

            const userData=await User.findById(_id)
            if(!userData){
                return res.status(400).json({message:"User not found",status:0})
            }

            req.user=userData;
            console.log(req.user)
            next()
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",success:0,error})
    }
}