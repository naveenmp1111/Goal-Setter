const express=require('express')
const router=express.Router()
const {setGoal,getGoal,updateGoal,deleteGoal}=require('../controller/goalController')

router.route('/').get(getGoal).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports=router