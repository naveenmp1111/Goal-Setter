const express=require('express')
const dotenv=require('dotenv').config()
const port=process.env.PORT || 5000
const router=require('./routes/goalRouter')
const {errorHandler} =require('./middleware/errorHandler')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',router)

app.use(errorHandler)

app.listen(port,()=>console.log(`Server started on port ${port}`))