import Axios from "axios";
import React from "react";
import axios from "axios";
import Header from "./header";
class quizScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            score:0,
            time1:0,
            time: {}, seconds: 0 
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    componentWillMount(){
        let value = this.props.location.data;
        console.log(value) 
        this.setState({
            data:value
        })
        
    }
    componentDidMount() {
        console.log(this.state.data)
        var a = parseInt(this.state.data.timeLimit);
        a = a*60;
        this.setState({
            seconds : a 
        },()=>{

            let timeLeftVar = this.secondsToTime(this.state.seconds);
            this.setState({ time: timeLeftVar });
            this.startTimer();
        })
        // Aman yahan check kr lena
    }
    isCheck = (item,index,index1) => {
        if(this.state.data.question[index1].option[index]===this.state.data.question[index1].ans) {
            console.log("Hey i am clicked");
            var a = this.state.score + parseInt(this.state.data.question[index1].points);
            this.setState({
                score: a
            })
        }
    }
    
  

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    if (seconds == 0) { 
        // call an API for storing the marks 
        clearInterval(this.timer);
        this.props.hisory.push("/student");
    }
  }

    render() {
        return(
            <div>
                <Header />
                {
                    <div >
                    {console.log(this.state.data)}
                   
                    <div className="quiz-screen-wrapper" style={{display:"flex", justifyContent:"space-between"}}>
                        <div><h3>Course Name : {this.state.data.courseName}</h3></div>
                        <div><h3>Course Code : {this.state.data.courseCode}</h3></div>
                        <div><h3>Time Limit : {this.state.data.timeLimit} min</h3></div>
                        <div><h3>Passing Marks : {this.state.data.passingMarks}</h3></div>
                    </div>
                    <div style={{display:"flex", justifyContent:"space-between", padding: "1rem"}}>

                    <div style={{}}>
                        <h4>Score - {this.state.score}</h4>
                    </div>
                    <div>
                        <h4>m: {this.state.time.m} s: {this.state.time.s}</h4>
                    </div>
                    </div>
                    <div>
                        {this.state.data.question && this.state.data.question.map((item,index1)=>{
                            return(
                                <div className="display-question">
                                    <div className="display-question-text"><h4>Question - {item.text}</h4></div>    
                                    <div className="display-question-option">
                                         {item.option && item.option.map((subItem,index)=>{
                                             return (
                                             <div className="display-question-suboption" onClick={()=>this.isCheck(subItem,index,index1)}>{index+1}-{subItem}</div>
                                             )
                                         })}</div>    
                                </div>
                            )
                        })}
                    </div>
                    </div>
                    // this.state.data && this.state.data.map((item)=> {
                    //     console.log(item)
                    // })
                }
            </div>
        )
    }
}
export default quizScreen;