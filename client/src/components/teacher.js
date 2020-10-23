import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './header';
import {FaTrash} from "react-icons/fa";
import { getFromStorage } from './storage';

class Teacher extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:[],
            statusChanged:false,
            usetType:'',
            userId:''
        }

    }
    componentDidMount() {
            const user=getFromStorage('userType');
            let userId=getFromStorage('id');
            this.setState({userType:user})
            if(user=="Teacher"){
                axios.get(`http://localhost:1234/teacher/getCourses?id=${userId}`)
                .then((result) => {
                    this.setState({
                        data:result.data
                    })
                })    
            }
    
    }

    componentDidUpdate(){
        if(this.state.statusChanged){
            axios.get("http://localhost:1234/teacher/getCourses")
            .then((result) => {
                this.setState({statusChanged:false})
                this.setState({
                    data:result.data
                })
            }) 
        }
    }

    handleCourseDelete = async(id) => {
        var result = await axios.delete(`http://localhost:1234/teacher/deleteCourse?id=${id}`);
        console.log(result,result.data.success)
        this.setState({statusChanged:true})
        
    }
    render() {
        if(this.state.userType=="Teacher"){
            return(
                <div>
                    <Header/>
                    <div className="flex-container">
                        <div className="flex-item-left">
                            {this.state.data.data && this.state.data.data.map((item)=>{
                                return (
                                <div className="card-course" key={item._id}>
                                    <div className="card-data">
                                        <div className="card-heading">Course Name : {item.courseName}</div>
                                        <div className="card-body">
                                            <div>Course Code : {item.courseCode}</div>
                                            <div>Passing Marks : {item.passingMarks}</div>
                                            <div>Time Limit : {item.timeLimit}</div>
                                        </div>
                                    </div>
                                    <div className="card-button">
                                        <FaTrash style={{cursor:"pointer"}} onClick={()=>this.handleCourseDelete(item._id)} size={40}/>
                                    </div>
                                </div>
                                )
                            }
                            )}
                        </div>
                        <div className="flex-item-right">
                            <Link to="/addCourse">
                                <div className="card course-add">Add Course</div>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1 style={{paddingLeft:"50px",paddingTop:"50px"}}>OOPS!!!! You are not authenticated</h1>
                    </div>
            )
        }

    }
} 
export default Teacher;