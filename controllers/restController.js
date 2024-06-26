const Restaurant=require("../models/restaurantModel");
const { findByIdAndUpdate } = require("../models/userModel");

module.exports.createRestaurant=async(req,res)=>{
    try {
        const {title,imgUrl,foods,time,pickup,delivery,isOpen,logUrl,rating,ratingCount,coords} = req.body;
        if(!title || !coords){
            return res.status(400).json({message:"all fields are required",success:0,error})
        }

        const restData=await Restaurant.create(req.body)
        if(restData){
            return res.status(200).json({message:"restaurant created successfully",data:restData,success:1})
        }else{
            return res.status(400).json({message:"restaurant not created",success:0,error})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong",success:0,error})
    }
}

// get restaurant
module.exports.getAllRestaurant=async(req,res)=>{
    try {
        const restData=await Restaurant.find();
        if(restData){
            return res.status(200).json({totalCount:restData.length,message:restData,success:1})
        }else{
            return res.status(400).json({message:"restaurant not found",success:0,error})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Something wrong in get restaurant API",error})
    }
}

// delete restaurant
module.exports.delete=async(req,res)=>{
    try {
        const restId=req.params.id;
        if(!restId){
            return res.status(400).json({message:"no restaurant found or provide resturant Id",status:0})
        }

        const delData=await Restaurant.findByIdAndDelete(restId)
        if(delData){
            return res.status(200).json({message:"restaurant deleted successfully",success:1})
        }else{
            return res.status(400).json({message:"restaurant not deleted",success:0})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"Something wrong in delete restaurant API",error})
 
    }
}

// category
