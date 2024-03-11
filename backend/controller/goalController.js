const asyncHandler=require('express-async-handler')

const getGoal = asyncHandler(async(req, res) => {
    res.json({ message: 'get Goals' })
})
const setGoal =  asyncHandler(async(req, res) => {
    console.log(req.body)
    if (!req.body.text) {
        res.status(400)
        throw new Error('add some data')
    }
    res.status(200).json({ message: 'set Goals' })
})
const updateGoal =  asyncHandler(async(req, res) => {
    const data = req.params.id
    res.status(200).json({ message: `update Goals ${data}` })
})
const deleteGoal =  asyncHandler(async(req, res) => {
    res.status(200).json({ message: `delete Goals ${req.params.id}` })
})

module.exports = {
    getGoal,
    setGoal,
    updateGoal,
    deleteGoal
}