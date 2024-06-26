const express=require("express")
const routes=express.Router()
const categoryController=require("../controllers/categoryController")
const { requireLogin } = require("../middlwares/requireLogin")

routes.post("/createCategory",requireLogin,categoryController.createCategory)
routes.get("/getAllcat",categoryController.getAllcat)
routes.put("/updateCategory/:id",requireLogin,categoryController.updateCategory)
routes.delete("/deleteCategory/:id",requireLogin,categoryController.deleteCategory)

module.exports=routes;