const express = require('express');
const router = express.Router();
const Teacher = require('../modals/teacherModal');
process.env.TOKEN_KEY = 'axcgyukmlpjsfihasbao';


router.route('/allCourses').get((req, res) => {
    Teacher.find((err,result)=>{
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

module.exports = router;