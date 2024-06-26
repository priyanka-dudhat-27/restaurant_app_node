const express=require("express")
const routes=express.Router()

routes.use("/auth",require("./auth"))
routes.use("/user",require("./user"))
routes.use("/restaurant",require("./restaurant"))
routes.use("/category",require("./category"))

module.exports=routes;