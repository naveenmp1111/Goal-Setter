const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    // console.log(req.body)
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Enter valid data')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            is_active: user.is_active,
            image_url: user.image_url,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({ message: 'Invalid User Data' })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user.is_active) {
        res.status(400)
        throw new Error('User is Blocked')
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            is_active: user.is_active,
            image_url: user.image_url,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const updateUser = asyncHandler(async (req, res) => {
    console.log(req.body.userData)
    const { id, email, name } = req.body.userData
    if(!email || !name){
        res.status(400)
        throw new Error('Invalid credentials')
    }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(401)
        throw new Error('Email already exists')
    }
    const user = await User.findByIdAndUpdate(id, { name, email })
    if (user) {
        res.status(200).json(user)
    }
})

const updateProfileImage = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { id, imageUrl } = req.body.userData
    const user = await User.findByIdAndUpdate(id, { image_url: imageUrl }, { new: true })
    if (!user) {
        res.status(400)
        throw new Error('No data updated')
    }
    res.status(200).json(user)
})

const getMe = asyncHandler(async (req, res) => {
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    updateProfileImage
}