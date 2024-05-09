const express=require("express");
const router=express.Router();
const authController=require("../controller/AuthController");

router.post('/login',authController.login)
router.post('/test',authController.tesst)
module.exports=router