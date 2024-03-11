const express=require('express')
const router=express.Router()
const {setGoal,getGoal,updateGoal,deleteGoal}=require('../controller/goalController')
const {protect}=require('../middleware/authMiddleware')

router.route('/').get(protect,getGoal).post(protect,setGoal)
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)

module.exports=router