const express= require('express')
const router = express.Router();
const userRouter =require('../controllers/userControllers')
const {signup_get, login_post,login_get,signup_post,logout_get } = userRouter;

router.get("/signup",signup_get)
router.post("/signup",signup_post)
router.get("/login",login_get)
router.post("/login",login_post)
router.get("/logout",logout_get)


module.exports=router;
