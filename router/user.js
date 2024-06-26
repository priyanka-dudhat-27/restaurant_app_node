const express=require("express")
const routes=express.Router()
const userController=require("../controllers/userController")

routes.get("/getUser",userController.getUser)

module.exports=routes;