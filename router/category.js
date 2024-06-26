const express=require("express")
const routes=express.Router()
const categoryController=require("../controllers/categoryController")
const { requireLogin } = require("../middlwares/requireLogin")

routes.post("/createCategory",requireLogin,categoryController.createCategory)
routes.post("/getAllcat",categoryController.getAllcat)

module.exports=routes;