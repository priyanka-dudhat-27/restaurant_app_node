const express=require("express")
const routes=express.Router()

routes.use("/auth",require("./auth"))
routes.use("/user",require("./user"))

module.exports=routes;