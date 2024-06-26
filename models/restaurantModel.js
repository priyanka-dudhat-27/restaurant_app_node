const mongoose=require("mongoose")

const restaurantSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"restaurant title is required"]
    },
    imgUrl:{
        type:String,
    },
    foods:{
        type:Array,
    },
    time:{
        type:String,
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String,
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    code:{
        type:String,
    },
    coords:{
        id:{
            type:String
        },
        latitude:{
            type:Number
        },
        latitudeDelta:{
            type:Number
        },
        longitude:{
            type:Number
        },
        latitudeDelta:{
            type:Number
        },
        address:{
            type:String
        },
        title:{
            type:String
        }
    }
})

const Restaurant=mongoose.model("Restaurant",restaurantSchema)
module.exports = Restaurant