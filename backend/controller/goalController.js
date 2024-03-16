const Goal = require('../model/goalModel')
const User = require('../model/userModel')
const asyncHandler = require('express-async-handler')


const getGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.find({ user: req.user.id })

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    res.status(200).json(goal)
})

const setGoal = asyncHandler(async (req, res) => {
    // console.log(req.body)
    if (!req.body.text) {
        res.status(400)
        throw new Error('add some data')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
    const data = req.params.id
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }


    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() != req.user.id) {
        res.status(401)
        throw new Error('User not Authorized  ')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }


    if (goal.user.toString() != req.user.id) {
        res.status(401)
        throw new Error('User not Authorized  ')
    }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}