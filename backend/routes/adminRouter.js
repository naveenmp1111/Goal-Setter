const express=require('express')
const adminRouter=express.Router()
const {adminLogin,getAdmin,getUsers,blockUser,deleteUser,addUser,editUser}=require('../controller/adminController')
const {adminProtect} =require('../middleware/authMiddleware')

adminRouter.post('/adminLogin',adminLogin)
adminRouter.get('/getAdmin',adminProtect,getAdmin)
adminRouter.get('/getUsers',adminProtect,getUsers)
adminRouter.post('/block',adminProtect,blockUser)
adminRouter.post('/addUser',adminProtect,addUser)
adminRouter.post('/editUser',adminProtect,editUser)
// adminRouter.post('/delete',deleteUser)

module.exports=adminRouter 