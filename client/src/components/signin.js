import React,{useState} from "react";
import { Formik } from "formik";
import {Card,CardBody} from 'reactstrap';
import * as Yup from 'yup';
import {Form,Button,Input, FormGroup, Container} from 'reactstrap'
import Error from './Error';
import { Redirect,Link} from 'react-router-dom';
import '../css/signup.css'
import {setInStorage} from '../components/storage'
import axios from 'axios';
import { getFromStorage } from './storage';

//Yup for  the validation
const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalid email address")
    .required("Email cannot be left blank"),
  password: Yup.string()
    .required('Password field cannot be left blank')  
});


export default function SignIn() {
  
  const [destiny,setDestiny] =useState(false);

  if(destiny===true){
    const userType=getFromStorage('userType');
    if(userType=='Teacher'){
      var url='/teacher';
      return(
        <Redirect to={url}/>
      );
    }
   else if(userType == 'Student'){
    var url='/student';
    return(
      <Redirect to={url}/>
    );
   }
   else {
     this.props.history.push("/")
   }
  }
return (     
  <div className="back" style={{
    opacity:0.9,
    backgroundSize:'cover',
    minHeight:"100vh",
    display:"flex",
    flexWrap:"row"
  }}>

  <Card className="crd col-md-4" style={{borderRadius:10,
    background:"transparent",
    opacity:2,
    backgroundColor:"white",
    maxHeight:'400px'
  }}>
    <CardBody>
      {/* formik for creating form with validation easily */}
      <div>
        <Formik
          initialValues={{
                email: "",
                password:""
            }}
          validationSchema={ValidationSchema}
          //submitting the form data
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("inside submit");
            setSubmitting(true);
            setTimeout(() => {
            var details=values;
            //posting the details 
            axios.post('http://localhost:1234/users/signin', details)
            .then(function(data){
              if(data.data.success){
              console.log("sucess true");
              var token=data.data.token;
              var email=data.data.email;
              var userId=data.data.userId
              var userType=data.data.userType
              
              setInStorage('id',userId)
              setInStorage('token',token);
              setInStorage('email',email);
              setInStorage('userType',userType);
              setDestiny(true);
              } 
            else{
                return(
                  alert(data.data.message)
                )
              }
            })
            resetForm();
            setSubmitting(false);
          }, 5000);
        }}>
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
            Email<span className='reddot'> *</span>
            <Input
                  type="text"
                  placeholder='Enter your email'
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  style={{
                    marginTop:'5px',
                    width:'26vw'
                  }}
                />
                <Error id='emailExists' touched={touched.email} message={errors.email} />           
            </FormGroup>
            <FormGroup style={{
              height:'11vh',
            
            }}>
            Password<span className='reddot'> *</span>
            <Input
                  type="password"
                  name="password"
                  placeholder='Enter password'
                    onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={{
                    marginTop:'5px',
                    width:'26vw'
                  }}
                />
                <Error touched={touched.password} message={errors.password} />
            </FormGroup>
            <FormGroup>
            <Button type="submit" id='submitButton' disabled={isSubmitting}
              style={{
              marginTop:'8px',
              width:'26vw'
            }}  >
              Submit
            </Button>
            </FormGroup>
            </Form>
            </Container>
          )}
        </Formik>
        </div>
    </CardBody>
        <div>

    <Link to='/signup' style={{
      marginTop:'8px',
      marginRight:'15px'
    }}>create an account</Link>
    </div>
    </Card>
    </div>
  );
  }
  

