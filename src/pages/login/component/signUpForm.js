import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {connect,useDispatch} from "react-redux"
import { actionCreators } from "../store";
import { FormWrapper, FormField, FormFieldLabel, FormFieldCheckBoxLabel, FormFieldCheckbox, FormFieldTermsLink, FormFieldButton } from "../style"
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd';
// import {EyeOutlined,EyeInvisibleOutlined } from '@ant-design/icons'
import { Alert } from 'antd';
import axios from 'axios'
import Loading from 'react-fullscreen-loading';
import { AppWrapper, AppAside, AppForm,  FormTitle } from '../style'

const formTitleLink={
  color: '#707c8b',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '1.7em',
  margin: '0 10px',
  paddingBottom: '5px',
}
const  SignUpForm=(props)=>{
  const [form] = Form.useForm();
  const dispatch=useDispatch();
  const [country,setCountry]=useState([]);

//   useEffect(()=>{
// axios.get("https://ipapi.co/json/").then((res)=>(console.log(res.data.country_name),dispatch(actionCreators.countrydata(res.data.country_name))))

//   },[])



  return (
    <AppWrapper>
    <AppAside ></AppAside>
    <AppForm>
    <FormTitle>
          <Link exact='true'  to="/signIn"  activeclassname="formTitleLink-active" style={formTitleLink}>Sign In</Link>
          {" "}or{" "}
            <Link exact='true' to="/signUp"  activeclassname="formTitleLink-active" style={formTitleLink}>Sign Up</Link>
          </FormTitle>
        <FormWrapper>
      <Form name="register" onFinish={props.handleFinish} initialValues={{country:props.country}}>

        <FormField>
          <FormFieldLabel >Username</FormFieldLabel>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]} >
            <Input type="text" id="name" placeholder="Enter your Username" name="name" value={props.signUpUsername} onChange={props.handleSignUpUsernameChange} />
          </Form.Item>
        </FormField>
       
       
      
        
          {/* <Form.Item name="country"  >
            <Input  value={props.country}  />
          </Form.Item> */}


        <FormField>
          <FormFieldLabel htmlFor="email">E-Mail Address</FormFieldLabel>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input type="email" id="email" placeholder="Enter your email" name="email" value={props.signUpEmail} onChange={props.handleSignUpEmailChange} />
          </Form.Item>
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="password">Password</FormFieldLabel>
          <Form.Item name="password" rules={[{required: true,message: 'Please input your password!'}]}>
            <Input type="password" id="password" placeholder="Enter your password" name="password" value={props.signUpPassword} onChange={props.handleSignUpPasswordChange} minLength="6" />
          </Form.Item>
        </FormField>

        <FormField>
          <FormFieldLabel htmlFor="password">Confirm Password</FormFieldLabel>
          <Form.Item name="confirmPass" rules={[{required: true, message: 'Please input your Confrom Password!'  }]}>
            <Input type="password" id="conpassword" placeholder="Enter your confirm password" name="password" value={props.signUpConfirmPassword} onChange={props.handleSignUpConfirmPasswordChange} />
            {/* <EyeInvisibleOutlined style={eye} /> */}
          </Form.Item>
        </FormField>


        <Alert message="Warning" description="Password not match" type="warning" showIcon closable style={props.passwordAlert ? null : { display: 'none' }}/>

        <Form.Item name="checkbox"  rules={[{ required: true, message: 'Please check the check box!'}]}>
          <FormFieldCheckBoxLabel>
            <FormFieldCheckbox type="checkbox" name="hasAgreed" defaultChecked={props.registerCheckbox} onChange={props.handleCheckbox} required/>
            {" "}I agree all statements in{" "}
            <FormFieldTermsLink> terms of service</FormFieldTermsLink>
          </FormFieldCheckBoxLabel>
        </Form.Item>


        <FormFieldButton  >Sign Up</FormFieldButton>{" "}
        <Link to="/signIn" className="formFieldLink">
         <span style={{ marginLeft: "5px" }}>I'm already member</span> 
        </Link>
      </Form>

      <Loading loading={props.loader} background="transparent" loaderColor="#3498db" />
     
    </FormWrapper>
    </AppForm>
    </AppWrapper>
  )
}


const mapStateToProps = (state) => {
  return {
    signUpEmail: state.login.signUpEmail,
    signUpPassword: state.login.signUpPassword,
    signUpUsername: state.login.signUpUsername,
    signUpConfirmPassword: state.login.signUpConfirmPassword,
    passwordAlert: state.login.passwordAlert,
    registerCheckbox: state.login.registerCheckbox,
    loader: state.login.loader,
    country: state.login.country,
 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUpEmailChange(e) {
      dispatch(actionCreators.getSignUpEmail(e.target.value))
    },
    handleSignUpPasswordChange(e) {
      dispatch(actionCreators.getSignUpPassword(e.target.value))
    },
    handleSignUpUsernameChange(e) {
      dispatch(actionCreators.getSignUpUsername(e.target.value))
    },
    handleSignUpConfirmPasswordChange(e) {
      dispatch(actionCreators.getSignUpConfirmPasswords(e.target.value))
    },
    handleCheckbox() {
      dispatch(actionCreators.getCheckbox())
    },
    handleFinish(values) {
      console.log(values)
      const registerData = {
        UserName: values.username,
        Country:values.country,
        Email: values.email,
        Password: values.password,
      }

      if (values.password === values.confirmPass) {

        dispatch(actionCreators.register(registerData))
        dispatch(actionCreators.getLoader())
        // dispatch(actionCreators.getLoaderOff())
      } else {
        dispatch(actionCreators.getPasswordAlert())
      }


    },
    handleIConClick() {
      dispatch(actionCreators.getICon())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm));
