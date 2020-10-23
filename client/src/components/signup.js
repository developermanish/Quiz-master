import React from "react";
import { Formik } from "formik";
import {Card,CardBody} from 'reactstrap';
import * as Yup from "yup";
import Error from "./Error";
import '../css/signup.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Form, Button, Input, FormGroup, Container} from 'reactstrap';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name must be 4 characters long")
    .max(25, "Name cannot exceeds above 25 characters")
    .required("Name cannot be left blank"), 
  email: Yup.string()
    .email("invalid email address")
    .required("Email cannot be left blank"),
  password: Yup.string()
    .required('Password field cannot be left blank')
    .min(8,'Password must be atleast 8 characters long')  
});

class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userValue:'Teacher'
    }
    this.changeUserHandle=this.changeUserHandle.bind(this)
  }

  changeUserHandle(event){
    console.log(event.target.value)
    this.setState({userValue:event.target.value})
  }

  render(){
    return(
        
        <div className="back" style={{
        opacity:0.9,
        backgroundSize:'cover',
        minHeight:"100vh"
        }}>
        
        <Card className="crd col-md-4" style={{borderRadius:10,
            background:"transparent",
            opacity:2,
           backgroundColor:"white",
           maxHeight:'1000px'
            }}>
                <CardBody>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password:"",
                role: ""
              }}
              validationSchema={ValidationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
        
                setTimeout(() => {
                var details=values
                details.userType=this.state.userValue
                console.log(details);
                 axios.post('http://localhost:1234/users/create', details)
                  .then((data)=>{
                    console.log(data)
                    if(data.data.success===true){
                      alert(data.data.message)
                      this.props.history.push({
                        pathname:'/',
                      })
                    }
                  })
               resetForm();
        
                  setSubmitting(false);
                }, 500);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                
              }) => (
                <Container>
                <Form onSubmit={handleSubmit}>
                 <FormGroup style={{
                   height:'11vh'
                 }}> 
                 Name<span className='reddot'> *</span>       
                    <Input
                      type="text"
                      name="name"
                      placeholder='Enter your name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className={touched.name && errors.name ? "has-error" : null}
                      style={{
                        marginTop:'5px',
                        width:'26vw'
                      }}
                    />
                    <Error touched={touched.name} message={errors.name}/>
                </FormGroup>
                  <FormGroup style={{
                   height:'11vh'
                 }}>
                  Email<span className='reddot'> *</span>
        
                <Input
                      type="text"
                      placeholder='Enter your email'
                      name="email"
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={touched.email && errors.email ? "has-error" : null}
                      style={{
                        marginTop:'5px',
                        width:'26vw'
                      }}
                    />
                    <Error id='emailExists' touched={touched.email} message={errors.email} />           
              </FormGroup>
                <FormGroup style={{
                   height:'11vh'
                 }}>
                Password<span className='reddot'> *</span>
        
                <Input
                      type="password"
                      name="password"
                      placeholder='Enter password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={touched.password && errors.password ? "has-error" : null}
                      style={{
                        marginTop:'5px',
                        width:'26vw'
                      }}
                   />
                    <Error touched={touched.password} message={errors.password} />
                </FormGroup> 
                <div className="selectuserDiv">
               <div className='reddot'>  Select User Handle *</div>
                <select className="selectUser" value={this.state.userValue}  onChange={this.changeUserHandle}>
                  <option value="Teacher" >Teacher</option>
                  <option value="Student">Student</option>
              </select>  
              </div>             
              <FormGroup> 
                <Button type="submit" disabled={isSubmitting}  style={{
          marginTop:'5px',
          width:'26vw'
        }}>
                      Submit
                </Button>
                <div className='offset-2 mt-4'>
                Already have account?<Link to='/'> signin</Link>
                </div>
              </FormGroup>
                </Form>
                </Container>
              )}
            </Formik>
            </CardBody>
            </Card>
            </div>
          );
  }

}
export default SignUp;