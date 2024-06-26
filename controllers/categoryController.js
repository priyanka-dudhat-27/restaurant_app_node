const Category=require("../models/categoryModel")

module.exports.createCategory = async(req,res)=>{
    try {
        const {title,imgUrl} = req.body;

        if(!title,!imgUrl){
            return res.status(400).json({message:"all fields are required",success:0})
        }

        const catData=await Category.create(req.body)
        if(catData){
            return res.status(200).json({message:"category created",data:catData,success:1})
        }else{
            return res.status(400).json({message:"category not created",data})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong in create category API",success:0,error})
    }
}

// get all category info
module.exports.getAllcat=async(req,res)=>{
    try {
        const catData=await Category.find();
        if(catData){
            return res.status(200).json({totalCount:catData.length,message:catData,status:1})
        }else{
            return res.status(400).json({message:"record not found",success:0,error})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong in get category API",success:0,error})
    }
}

// update category
module.exports.updateCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,imgUrl}=req.body;
        if(!title || !imgUrl){
            return res.status(400).json({message:"all fields are required",success:0})
        }
        
        const updatedCat=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(updatedCat){
            return res.status(200).json({message:"category updated successfully",data:updatedCat,status:1})
        }else{
            return res.status(400).json({message:"category not updated",success:0,error})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong in update category API",success:0,error})
    }
}

// delete category
module.exports.deleteCategory = async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.status(400).json({message:"please provide category ID",status:0})
        }
        const catData=await Category.findById(id)
        if(!catData){
            return res.status(400).json({message:"category not found",status:0})
        }

        const delData=await Category.findByIdAndDelete(id)
        if(delData){
            return res.status(200).json({message:"category deleted successfully",status:1})
        }else{
            return res.status(400).json({message:"category not deleted",status:0})

        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"something wrong in update category API",success:0,error})
    }
}