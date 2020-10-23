const express = require('express');
const router = express.Router();
const Teacher = require('../modals/teacherModal');
process.env.TOKEN_KEY = 'axcgyukmlpjsfihasbao';

// const Image=require('../modals/imageSchema');
// const mongoURI = 

// const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true })
// conn.once('open', () => {
//     console.log('Connection Successful')
// })

//to get the details of the user
router.route('/addCourse').post((req, res) => {
    console.log(req.body)
    Teacher.findOne({ courseCode:req.body.courseCode})
        .then(async(result) => {
            if (!result) {
                console.log('if')
                const teacher1 = new Teacher({
                    courseName:req.body.courseName,
                    courseCode:req.body.courseCode,
                    passingMarks:req.body.passingMarks,
                    timeLimit:req.body.timeLimit,
                    courseName:req.body.courseName,
                    question:req.body.question
                })
                let result = await teacher1.save();
                if(result) {
                    return res.send({success: true})
                }         
            }
            else {
                console.log('already exists')
            }
        });
})

router.route('/getCourses').get((req, res) => {
    Teacher.find({userId:req.query.userId},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
           res.send({
                success:true,
                data:result
           })
        }
    })
})

router.route('/deleteCourse').delete((req, res) => {
    Teacher.findOneAndDelete({_id:req.query.id},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
           res.send({
                success:true,
                message:"Course deleted"
           })
        }
    })
})

module.exports = router;