const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide a Name']
    },
    email:{
        type:String,
        required:[true,'Please Provide an Email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please Provide a Password']
    },
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)