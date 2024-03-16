const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../model/userModel')

const protect = asyncHandler(async(req,res,next)=>{
    let token
// console.log(req.headers,"jjjjjjjjjj");
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(' ')[1]

            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decoded.id).select('-password')
            // console.log(req.user)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized,no token')
    }
})

const adminProtect = asyncHandler(async(req,res,next)=>{
    let token
// console.log(req.headers,"aaaaaaaaaaaaaa");
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token=req.headers.authorization.split(' ')[1]

            const decoded=jwt.verify(token,process.env.JWT_SECRET)

            req.user=await User.findById(decoded.id).select('-password')
            // console.log(req.user)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('not authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized,no token')
    }
})

module.exports={
    protect,
    adminProtect
}