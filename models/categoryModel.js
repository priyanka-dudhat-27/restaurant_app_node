const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"category title is required"]
    },
    imgUrl:{
        type:String,
        default:"https://tse2.mm.bing.net/th?id=OIP.-DAXQ1DkJsuOpk96UqyI2AHaE8&pid=Api&P=0&h=180"
    },

},{
    timestamps:true
})

const Category=mongoose.model("Category",categorySchema)
module.exports=Category