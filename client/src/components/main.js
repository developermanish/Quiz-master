import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './home';
import Teacher from './teacher';
import Student from './student';
import Quiz from './quizScreen';
import SignIn from './signin';
import SignUp from './signup';
import AddCourse from './addCourse';

class Main extends React.Component{
  render(){
    return (  
      <div>
        <Switch>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/teacher" component={Teacher}/>
        <Route exact path="/student" component={Student}/>
        <Route exact path="/student/quiz/:id" component={Quiz}/>
        <Route exact path="/addCourse" component={AddCourse}/>
        <Route exact path="/" component={SignIn}/>
        <Route exact path="/signup" component={SignUp}/>
        </Switch>
      </div>
    );
  }
}
export default Main;