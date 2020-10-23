import React from "react";
import axios from "axios";
import Header from "./header";
import { Link } from "react-router-dom";
import { getFromStorage } from './storage';

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            userType:'',
            userId:''
        }
    }
    componentDidMount() {
        const user=getFromStorage('userType');
        let userId=getFromStorage('id');
        this.setState({userType:user})
        if(user === "Student") {

            axios.get("http://localhost:1234/student/allCourses")
            .then((result)=>{
                this.setState({
                    data:result.data
                })
            })
        }
    }
    render() {
        if(this.state.userType==="Student"){

            return (
                <div>
                <Header />
                {
                    this.state.data.data && this.state.data.data.map((item)=>{
                        return(
                            <div className="card-course" style={{fontSize:"1.4rem", margin:"1rem"}} key={item._id}>
                                <div className="card-data">
                                    <div className="card-heading course-heading">Course Name : {item.courseName}</div>
                                    <div className="card-body">
                                        <div className="course-code">Course Code : {item.courseCode}</div>
                                        <div className="course-pass-mark">Passing Marks : {item.passingMarks}</div>
                                        <div className="course-time-limit">Time Limit : {item.timeLimit}</div>
                                    </div>
                                </div>
                                <div className="card-button">
                                    <div><Link style={{textDecoration:"none", color:"white", fontWeight:"bolder"}} to={{pathname:`/student/quiz/${item._id}`,data:item}} >Attempt</Link></div> 
                                </div>
                            </div>
                        )
                    })
                }
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
export default Student;