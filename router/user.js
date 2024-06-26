const express=require("express")
const routes=express.Router()
const userController=require("../controllers/userController");
const { requireLogin } = require("../middlwares/requireLogin");

routes.get("/getUser",requireLogin,userController.getUser)
routes.put("/updateUser/:id",requireLogin,userController.updateUser)
routes.put("/updatePassword/:id",requireLogin,userController.updatePassword)
routes.post("/resetPassword",requireLogin,userController.resetPassword)
routes.delete("/deleteUser/:id",requireLogin,userController.deleteUser)

module.exports=routes;