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
    is_admin:{
        type:Boolean,
        default:false
    },
    is_active:{
        type:Boolean,
        default:true
    },
    image_url:{
        type:String
    }
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)