const express=require('express');
const router=express.Router();
const {verifyToken}=require('../utils/verifyUser')
const {Signup, Signin, ForgotPassword, ResetPassword,}=require('../controllers/authController')
const {LoginWithGoogle, LoginWithFacebook}=require('../controllers/OAuthController')

router.post('/signup', Signup)
router.post('/signin', Signin)
router.post('/forgotPassword', ForgotPassword)
router.post('/resetPassword/:id/:token', ResetPassword)
router.post('/google', LoginWithGoogle)
router.post('/facebook', LoginWithFacebook)

module.exports=router;