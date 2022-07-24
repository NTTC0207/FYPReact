import React,{ useState,useEffect }  from "react";
import {connect,useDispatch} from 'react-redux'
import {Button, Checkbox, Form, Input } from 'antd';
import { Route, Switch, Link,useHistory } from 'react-router-dom'
import {FreelancerWrapper} from './style'
import axios from "axios";
import {apiURL} from "../../api/index"
import { actionCreators as freeAction } from './store' 

import jwt_decode from "jwt-decode"; 
const jwt2 = localStorage.getItem("jwt")
 const decode = jwt_decode(jwt2)


const FreelancerRegister =(props)=>{
  
  const dispatch =useDispatch();
  const history = useHistory();
     
     
        useEffect(()=>{
          axios.get(apiURL+"/api/freelancerlanguage/dd/"+decode.nameid).then((res)=>{dispatch(freeAction.getProgress(res.data))})

        },[])
      
        useEffect(()=>{
          axios.get(apiURL+"/api/freelancerform/"+decode.nameid).then((res)=>( dispatch(freeAction.getIntro(res.data))))
        },[])
      

        const onSub = (values) => {

          axios.post(apiURL+"/api/login",values)
      .then((res)=>(
      
         localStorage.setItem("jwt",res.data),
         history.push('freelancerRegistertest/questionn1')
      

        ))
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      
        return (
          <>


        
    <FreelancerWrapper>
    <Form initialValues={{   Email:decode.email  }}
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
  progess:state.freelancerRegister.progress
  
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FreelancerRegister);
