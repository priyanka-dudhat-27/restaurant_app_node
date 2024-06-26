const User=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// user register
module.exports.register=async(req,res)=>{
    try {
        const {username,email,password,adress,phone,answer}=req.body;

        if(!username || !email || !password || !adress || !phone || !answer){
            return res.status(400).json({message:"all fields are required",success:0,error})
        }

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!mailformat.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }

        const passformat=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if(!passformat.test(password)){
            return res.status(400).json({message:"[7 to 15 characters which contain at least one numeric digit and a special character]",status:0})
        }

        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"user already exist,please login",success:0,error})
        }

        const hashedPassword=await bcrypt.hash(password,10)
        req.body.password=hashedPassword;

        const userData=await User.create(req.body);
        if(userData){
            return res.status(200).json({message:"user registered successfully",success:1,data:userData})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",success:0,error})
    }
}

// user login
module.exports.login=async(req,res)=>{
    try {
        const {email,password} =req.body;

        if(!email || !password){
            return res.status(400).json({message:"all fields are required",success:0,error})
        }

        const checkEmail=await User.findOne({email:email})
        if(checkEmail){
            const matchPassword=await bcrypt.compare(password,checkEmail.password)
            if(matchPassword){
                const token=jwt.sign({_id:checkEmail.id},process.env.JWT_SECRET,{expiresIn:"2h"})
                return res.status(200).json({message:"Login successfully",status:1,data:checkEmail,token:token})
            }else{
                return res.status(400).json({message:"password not match",status:0})
            }
        }else{
            return res.status(400).json({message:"User not found",status:0})
        }

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!mailformat.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }




    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",success:0,error})
    }
}