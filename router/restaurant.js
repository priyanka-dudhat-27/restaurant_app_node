const express=require("express")
const routes=express.Router()
const restController=require("../controllers/restController")
const { requireLogin } = require("../middlwares/requireLogin")

routes.post("/createRestaurant",requireLogin,restController.createRestaurant)
routes.get("/getAllRestaurant",restController.getAllRestaurant)
routes.delete("/delete/:id",requireLogin,restController.delete)

module.exports=routes;