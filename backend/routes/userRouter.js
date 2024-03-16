const express=require('express')
const userRouter=express.Router()
const {registerUser,loginUser,getMe,updateUser,updateProfileImage}=require('../controller/userController')
const {protect} =require('../middleware/authMiddleware')

userRouter.post('/',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/me',protect,getMe)
userRouter.post('/updateUser',protect,updateUser)
userRouter.post('/updateProfileImage',protect,updateProfileImage)

module.exports=userRouter