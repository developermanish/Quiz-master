const express=require('express');
const mongoose=require('mongoose');
const http=require('http');
const bodyParser  = require('body-parser');
const cors = require('cors');


const userRoute=require('../server/routes/user.routes');
const teacherRoute=require('../server/routes/teacherRoute');
const studentRoute=require('../server/routes/studentRoute');
mongoose.connect("", //Enter your db key
{ useNewUrlParser: true },
()=>{
    console.log("connect to mongodb");
});
mongoose.set('useFindAndModify', false);
const app =express();
const server=http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT=process.env.PORT || 1234;
app.use(cors());
app.use('/users',userRoute);
app.use('/teacher',teacherRoute);
app.use('/student',studentRoute);




server.listen(PORT,()=>{
    console.log("connected to port:"+ PORT);
})
