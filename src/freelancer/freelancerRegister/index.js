import React,{ useState,useEffect }  from "react";
import {connect,useDispatch} from 'react-redux'
import {Button, Checkbox, Form, Input } from 'antd';
import { Route, Switch, Link,useHistory } from 'react-router-dom'
import {FreelancerWrapper} from './style'
import axios from "axios";
import {apiURL} from "../../api/index"
import { actionCreators as freeAction } from './store' 
import {actionCreators as proAction} from '../../pages/profile/store'
import {actionCreators as loginAction} from '../../pages/login/store'
import jwt_decode from "jwt-decode"


const FreelancerRegister =(props)=>{
  
  const dispatch =useDispatch();
  const history = useHistory();
     
     
        useEffect(()=>{
          axios.get(apiURL+"/api/freelancerlanguage/dd").then((res)=>{dispatch(freeAction.getProgress(res.data))})

        },[])
      
        useEffect(()=>{
          axios.get(apiURL+"/api/freelancerform").then((res)=>( dispatch(freeAction.getIntro(res.data))))
        },[])
      

        const onSub = (values) => {

          axios.post(apiURL+"/api/login",values)
      .then((res)=>(
      
         dispatch(loginAction.getStoreToken(jwt_decode(res.data).Roles)),

         dispatch(proAction.getChange()),

         history.push('freelancerRegistertest/questionn1')
      

        ))
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      
        return (
          <>


        
    <FreelancerWrapper>
    <Form initialValues={{   Email:props.email  }}
      onFinish={onSub}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Email" name="Email" rules={[  {required: true,  message: 'Please input your Email!', }, ]} hidden >
        <Input name="Email" />
      </Form.Item>

      <Form.Item label="Password" name="Password" rules={[  {  required: true,  message: 'Please input your password!', }, ]} >
        <Input.Password name="Password" />
      </Form.Item>

      <Form.Item>
    
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
    </FreelancerWrapper>
   

          </>
        )
    }

    
const mapStateToProps =(state) => {
    return {
  current:state.freelancerRegister.current,
  token:state.login.token,
  progess:state.freelancerRegister.progress,
  email:state.login.signInEmail
  
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FreelancerRegister);
