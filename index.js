const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const port=process.env.PORT || 5000
const cors=require("cors")
const morgan=require("morgan")
const mongoose=require("mongoose")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(morgan())

// mongodb connectivity
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
}).then((res)=>{
    console.log("db is connected")
}).catch((err)=>{
    console.log
    ("error connecting db",err)
})

app.use("/api/v1",require("./router/index"))

app.listen(port,async(err)=>{
    (err)?console.log(err):console.log(`server is running on port ${port}`)
})
