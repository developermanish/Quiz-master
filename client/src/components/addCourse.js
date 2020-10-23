import React from "react";
import Header from "./header";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal'

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            currentStep: 1,
            courseName: '',
            courseCode: "",
            passingMarks: "",
            timeLimit: "",
            question: [],
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            topic: "",
            points: "",
            text: "",
            ans: "",
            random:null,
            flag:false
        }
    }
    handleClose = () => {
        this.setState({ showModal: false })
    }
    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleChangeModal = (event) => {
        const {name, value} = event.target;
        let a=this.state.question;
        if(event.target.className=="form-control option") {
            console.log(a[this.state.random].option[event.target.id])
            a[this.state.random].option[event.target.id] = value;
        }else {
            a[this.state.random][event.target.name]=value;
        }
        this.setState({
            question:a
        })

    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let obj = {
            courseName: this.state.courseName,
            courseCode: this.state.courseCode,
            passingMarks: this.state.passingMarks,
            timeLimit: this.state.timeLimit,
            question: this.state.question
        }
        var result = await axios.post("http://localhost:1234/teacher/addCourse", obj);
        if(result.data.success) {
            this.props.history.push("/teacher");
        }
    }
    addQuestion = () => {
        console.log(this.state)
        const { text, topic, points, ans, option1, option2, option3, option4 } = this.state;
        let option = []
        option.push(option1)
        option.push(option2)
        option.push(option3)
        option.push(option4)
        let a = {
            text: text,
            topic: topic,
            points: points,
            ans: ans,
            option: option
        }
        let firstArr = this.state.question
        firstArr.push(a)
        this.setState({
            question: firstArr
        })
        this.setState({
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            topic: "",
            points: "",
            text: "",
            ans: ""
        })
    }
    handleEdit = (index) => {
        this.setState({random: index,
            flag:true
        })
        this.setState({ showModal: true })
    }
    handleDelete = (index) => {
        this.state.question.splice(index,1);
        console.log(this.state)
    }
    _next = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 1 ? 2 : currentStep + 1
        this.setState({
            currentStep: currentStep
        })
    }
    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1) {
            return (
                <button
                    className="btn btn-secondary"
                    type="button" onClick={this._prev}>
                    Previous
                </button>
            )
        }
        return null;
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        if (currentStep < 2) {
            return (
                <button
                    className="btn btn-primary float-right"
                    type="button" onClick={this._next}>
                    Next
                </button>
            )
        }
        return null;
    }
    handleEditSubmit = () => {
        console.log(this.state);
        this.setState({
            showModal:false,
            flag:false
        })
    }
    render() {
        if(this.state.flag) {
            return (
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ marginTop: "0.5rem" }}>
                                <label htmlFor="topic">Question Topic : </label>
                                <input
                                    className="form-control"
                                    id="topic"
                                    name="topic"
                                    type="text"
                                    placeholder="Enter Question Topic"
                                    value={this.state.question[this.state.random].topic}
                                    onChange={this.handleChangeModal}
                                />
                            </div>
                            <div style={{ marginTop: "0.5rem" }}>
                                <label htmlFor="points">Points : </label>
                                <input
                                    className="form-control"
                                    id="points"
                                    name="points"
                                    type="text"
                                    placeholder="Enter Question Point"
                                    value={this.state.question[this.state.random].points}
                                    onChange={this.handleChangeModal}
                                />
                            </div>
                            <div style={{ marginTop: "0.5rem" }}>
                                <label htmlFor="text">Question : </label>
                                <textarea
                                    className="form-control"
                                    id="text"
                                    name="text"
                                    type="text"
                                    placeholder="Enter Question text"
                                    value={this.state.question[this.state.random].text}
                                    onChange={this.handleChangeModal}
                                />
                            </div>
                            <div style={{ marginTop: "0.5rem" }}>
                                <label htmlFor="option">Options : </label>
                                <input
                                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                    className="form-control option"
                                    id="0"
                                    name="option1"
                                    type="text"
                                    placeholder="Enter option 1"
                                    value={this.state.question[this.state.random].option[0]}
                                    onChange={this.handleChangeModal}
                                />
                                <input
                                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                    className="form-control option"
                                    id="1"
                                    name="option2"
                                    type="text"
                                    placeholder="Enter option 2"
                                    value={this.state.question[this.state.random].option[1]}
                                    onChange={this.handleChangeModal}
                                />
                                <input
                                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                    className="form-control option"
                                    id="2"
                                    name="option3"
                                    type="text"
                                    placeholder="Enter option 3"
                                    value={this.state.question[this.state.random].option[2]}
                                    onChange={this.handleChangeModal}
                                />
                                <input
                                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                                    className="form-control option"
                                    id="3"
                                    name="option4"
                                    type="text"
                                    placeholder="Enter option 4"
                                    value={this.state.question[this.state.random].option[3]}
                                    onChange={this.handleChangeModal}
                                />
                            </div>
                            <div style={{ marginTop: "0.5rem" }}>
                                <label htmlFor="ans">Answer : </label>
                                <input
                                    className="form-control"
                                    id="ans"
                                    name="ans"
                                    type="text"
                                    placeholder="Enter Answer"
                                    value={this.state.question[this.state.random].ans}
                                    onChange={this.handleChangeModal}
                                />
                            </div>
                            <div className="btn btn-success" onClick={this.handleEditSubmit}>Save</div>
                        </Modal.Body>
                    </Modal>
            )
        } else 
        return (
            <div>
                <Header />
                <div className="course-flex-container">
                    <div className="whole course-flex-item-left">
                        <div className="form-wrapper">
                            <h4>Course Creation Form</h4>
                            <p style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bolder" }}>Step {this.state.currentStep} </p>

                            <form onSubmit={this.handleSubmit}>
                                <Step1
                                    currentStep={this.state.currentStep}
                                    handleChange={this.handleChange}
                                    courseName={this.state.courseName}
                                    courseCode={this.state.courseCode}
                                    passingMarks={this.state.passingMarks}
                                    timeLimit={this.state.timeLimit}
                                />
                                <Step2
                                    handleChange={this.handleChange}
                                    currentStep={this.state.currentStep}
                                    topic={this.state.topic}
                                    points={this.state.points}
                                    text={this.state.text}
                                    ans={this.state.ans}
                                    option1={this.state.option1}
                                    option2={this.state.option2}
                                    option3={this.state.option3}
                                    option4={this.state.option4}
                                    addQuestion={this.addQuestion}
                                />
                                {this.previousButton()}
                                {this.nextButton()}

                            </form>
                        </div>
                    </div>
                    <div className="course-flex-item-right">
                        {this.state.question && this.state.question.map((item, index) => {
                            return (
                                <div key={index} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <div><h5>Question Topic : {item.topic}</h5></div>
                                        <div><h6>Points : {item.points}</h6></div>
                                    {/* <div>{item.ans}</div>
                                    <div>{item.option.map((subItem)=>(<div>
                                        <div>{subItem}</div>
                                    </div>))}</div>     */}
                                    </div>
                                    <div>
                                        <FaEdit style={{margin:"1rem"}} onClick={() => this.handleEdit(index)} />
                                        <FaTrash style={{margin:"1rem"}} onClick={() => this.handleDelete(index)} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
function Step1(props) {
    if (props.currentStep !== 1) {
        return null
    }
    return (
        <div className="form-group">
            <div>
                <label htmlFor="courseName">Course Name</label>
                <input
                    className="form-control"
                    id="courseName"
                    name="courseName"
                    type="text"
                    placeholder="Enter Course Name"
                    value={props.courseName}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="courseCode">Course Code</label>
                <input
                    className="form-control"
                    id="courseCode"
                    name="courseCode"
                    type="text"
                    placeholder="Enter Course Code"
                    value={props.courseCode}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="passingMarks">Passing Marks</label>
                <input
                    className="form-control"
                    id="passingMarks"
                    name="passingMarks"
                    type="text"
                    placeholder="Enter Passing Marks"
                    value={props.passingMarks}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="timeLimit">Time Limit</label>
                <input
                    className="form-control"
                    id="timeLimit"
                    name="timeLimit"
                    type="text"
                    placeholder="Enter Time Limit"
                    value={props.timeLimit}
                    onChange={props.handleChange}
                />
            </div>
        </div>
    );
}

function Step2(props) {
    if (props.currentStep !== 2) {
        return null
    }
    return (
        <div className="form-group">
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="topic">Question Topic : </label>
                <input
                    className="form-control"
                    id="topic"
                    name="topic"
                    type="text"
                    placeholder="Enter Question Topic"
                    value={props.topic}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="points">Points : </label>
                <input
                    className="form-control"
                    id="points"
                    name="points"
                    type="text"
                    placeholder="Enter Question Point"
                    value={props.points}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="text">Question : </label>
                <textarea
                    className="form-control"
                    id="text"
                    name="text"
                    type="text"
                    placeholder="Enter Question text"
                    value={props.text}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="option">Options : </label>
                <input
                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                    className="form-control"
                    id="option"
                    name="option1"
                    type="text"
                    placeholder="Enter option 1"
                    value={props.option1}
                    onChange={props.handleChange}
                />
                <input
                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                    className="form-control"
                    id="option"
                    name="option2"
                    type="text"
                    placeholder="Enter option 2"
                    value={props.option2}
                    onChange={props.handleChange}
                />
                <input
                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                    className="form-control"
                    id="option"
                    name="option3"
                    type="text"
                    placeholder="Enter option 3"
                    value={props.option3}
                    onChange={props.handleChange}
                />
                <input
                    style={{ borderTop: "0px", borderLeft: "0px", borderRight: "0px" }}
                    className="form-control"
                    id="option"
                    name="option4"
                    type="text"
                    placeholder="Enter option 4"
                    value={props.option4}
                    onChange={props.handleChange}
                />
            </div>
            <div style={{ marginTop: "0.5rem" }}>
                <label htmlFor="ans">Answer : </label>
                <input
                    className="form-control"
                    id="ans"
                    name="ans"
                    type="text"
                    placeholder="Enter Answer"
                    value={props.ans}
                    onChange={props.handleChange}
                />
            </div>
            <div className="btn btn-success btn-block" style={{ marginTop: "2rem" }} onClick={props.addQuestion}>Add Question</div>
            <button className="btn btn-success btn-block" style={{ marginTop: "2rem" }} >Submit</button>
        </div>

    );
}

export default AddCourse;