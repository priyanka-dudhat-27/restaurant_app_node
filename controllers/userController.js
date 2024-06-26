const User=require("../models/userModel")
const bcrypt=require("bcrypt")
// get user info
module.exports.getUser=async(req,res)=>{
    try {
        const userData=await User.find();
        if(userData){
            return res.status(200).json({message:userData,status:1})
        }else{
            return res.status(400).json({message:"record not found",success:0})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",success:0,error})
    }
}

// update profile
module.exports.updateUser = async (req, res) => {
    try {
        const singleUser=await User.findById(req.params.id)
        if(!singleUser){
            return res.status(400).json({message:"User not found",status:0})
        }

        const {username,adress,phone}=req.body;
        if(!username||!adress||!phone){
            return res.status(400).json({message:"all fields required",status:0})
        }

        const updateUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(updateUser){
            return res.status(200).json({message:"user updated successfully",updateUser,status:1})
        }else{
            return res.status(400).json({message:"user not updated",success:0})
        }

        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong", success: 0, error: error.message });
    }
}

// update password
module.exports.updatePassword = async (req, res) => {
    try {
        const userData=await User.findById(req.params.id)
        if(!userData){
            return res.status(400).json({message:"user not found", success:0})
        }

        const {oldPassword,newPassword} =req.body;
        if(!oldPassword ||!newPassword){
            return res.status(400).json({message:"old and new password both are required", success:0})
        }

        const isMatch=await bcrypt.compare(oldPassword,userData.password)
        if(!isMatch){
            return res.status(400).json({message:"old password not match", success:0})
        }

        const hashedPassword=await bcrypt.hash(newPassword,10)
        userData.password=hashedPassword

        await userData.save()
        if(userData){
            return res.status(200).json({message:"password changed", success:1})
        }else{
            return res.status(200).json({message:"password not updated", success:1})
                }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "error in password update API", status: 0, error: error.message });
    }
};

// reset password
module.exports.resetPassword=async(req,res)=>{
    try {
        const {email,newPassword,answer}=req.body;
        if(!email || !newPassword || !answer){
            return res.status(400).json({message:"all fields are required",success:0,error})
        }
        const userData=await User.findOne({email,answer})
        if(!userData){
            return res.status(400).json({message:"user not found or invalid answer"})
        }

        const hashedPassword=await bcrypt.hash(newPassword,10)
        userData.password=hashedPassword
        await userData.save()
        if(userData){
            return res.status(200).json({message:"password reset successfully",success:1})
        }else{
            return res.status(400).json({message:"password not reset",success:0,error})
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error in reset password API",status:0,error})
    }
}

// delete user
module.exports.deleteUser=async(req,res)=>{
    try {
        const userData=await User.findByIdAndDelete(req.params.id)
        if(!userData){
            res.status(400).json({message: "User not found",status:0})
        }
        if(userData){
            return res.status(200).json({message:"userData deleted successfully",status:1})
        }else{
            return res.status(400).json({message:"record not deleted",status:0})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"error in delete user API",status:0,error8})
    }
}