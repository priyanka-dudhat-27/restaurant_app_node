const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    adress:{
        type:Array,
        required:true
    },
    phone:{
        type:String,
        required:[true,"phone no is required"]
    },
    userType:{
        type:String,
        required:[true,"user type is required"],
        enum:["client","admin","vendor","driver"],
        default:"client"
    },
    image:{
        type:String,
        required:[true,"image type is required"],
        default:"https://icon-library.com/images/default-user-icon/default-user-icon-3.jpg"
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)
module.exports=User