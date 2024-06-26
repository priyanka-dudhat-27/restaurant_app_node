const User=require("../models/userModel")

module.exports.getUser=async(req,res)=>{
    try {
        const userData=await User.find();
        if(userData){
            return res.status(200).json({message:userData,status:1})
        }else{
            return res.status(400).json({message:"record not found",success:0,error})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",success:0,error})
    }
}