const mongoose= require('mongoose');
const teacherSchema=new mongoose.Schema({
    courseName:{
        type:String,
        default:'',
        required:true,
    },
    courseCode:{
        type:String,
        required:true,
        default:''
    },
    passingMarks:{
        type:String,
        required:true,
    },
    timeLimit:{
        type:String,
        default:''
    },
    question:
        [
         {
             text:{
                type:String
             },
             topic:{
                type:String
             },
             points:{
                type:String
             },
             ans:{
                type:String
             },
             option:[

             ]
         }      
        ],
    date:{
        type:Date,
        default:Date.now()
    },
});
module.exports=mongoose.model('Teacher',teacherSchema);