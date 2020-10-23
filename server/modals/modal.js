const mongoose= require('mongoose');
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        index:true, unique:true,sparse:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    userType:{
        type:String,
        default:''
    },
    userId:{
        type:String,
        default:''
    },
    date:{
        type:Date,
        default:Date.now()
    },
});
module.exports=mongoose.model('User',schema);