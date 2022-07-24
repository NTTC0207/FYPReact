import React, {useState,useEffect} from 'react'
import { Layout, Menu, Switch,Avatar , Popover, Spin ,Skeleton} from 'antd';
import { Logo, SearchWrapper, SearchInfo, SearchInfoList, SearchInfoItem, NavSearch, Addition, Button, Aa, SignIn, MenuWrapper, LogIn } from './style'
import { connect ,useDispatch} from "react-redux"
import { actionCreators } from './store'
import {actionCreators as Loginaction} from '../../pages/login/store/index'
import { actionCreators as profileAction } from '../../pages/profile/store';
import { Link , useHistory } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import  {apiURL} from '../../api/index'
import axios from 'axios';
import jwt_decode from "jwt-decode";




const profilePopover={
  cursor: "pointer",
  fontWeight:"600",
  marginBottom:"4px",
}

const { Header } = Layout;
const HeaderStyle = {
  background: "#fff",
  borderBottom: "1px solid #f0f0f0",
  
}

const menuItems = [
  {
    key: 'find',

    label: 'Find Freelancer',
  },
  {
    key: 'post',

    label: 'Post Job',
  },

];


const Navigation = (props)=>{



 
const dispatch =useDispatch();
const history = useHistory()

const onLogout =()=>{
  const jwt2 = localStorage.getItem("jwt")
  const decode = jwt_decode(jwt2)

  axios(apiURL+"/api/login/"+decode.nameid,{
    method:'PUT'

  }).then(()=>(
    window.localStorage.clear(),
    window.location="/"
  ))

}


  useEffect(()=>{
    axios.get("https://ipapi.co/json/").then((res)=>(dispatch(Loginaction.countrydata(res.data.country_name))))
  },[])

  const onChangeRole =()=>{
    const jwt2 = localStorage.getItem("jwt")
    const decode = jwt_decode(jwt2)
  axios(apiURL+"/api/freelancerlanguage/"+ decode.nameid,{
    method: "POST",
  })
  .then(()=>(history.push("/freelancerRegister")))
  }

  const content = (
          <div>
            <Link exact="true" to="/profile">
            <div style={profilePopover} >Edit Profile</div>
            </Link>
        
 {
  props.freeProfileList.profileCompleteRate === 100 ? null:<div onClick={onChangeRole} style={profilePopover}>Become a Freelancer</div>
 }
        
      
      
         
            <div style={profilePopover} onClick={onLogout} >Logout</div>
          </div>
        );
    
        const content1 = (
          <div>
           <Switch onChange={null} />
          </div>
        );
    
        // let jwtToken = jwt
        // let decode = "" ; 
       
        // {
        // props.login ?  decode = jwt_decode(jwtToken) : decode = ""
        // }
      
        //React Hook 
        const [data, setProfileImage] =useState([])
        
    


   
        useEffect(()=>{
       
          if(props.login === true){
         
        const jwt2 = localStorage.getItem("jwt")
        const decode1 = jwt_decode(jwt2)

            axios.get( apiURL +"/api/profile/"+decode1.nameid+ "/UploadFile" ).then((res)=>{setProfileImage(res.data)})
          }
       
  
  
          },[props.login,props.profileImage])

          useEffect(()=>{

            if(props.login === true){
          
              const jwt2 = localStorage.getItem("jwt")
              const decode1 = jwt_decode(jwt2)
               if(decode1.Roles === "freelancer"){
                axios(apiURL+"/api/profile/freelancer/"+decode1.nameid).then((res)=>( dispatch(profileAction.getFreelancerData(res.data)) ))
               }

            }
        

          },[props.login])

  
       
      

     

      
     
  
  return(
    <div>

    <Header style={HeaderStyle}  >

      <SearchWrapper>
        <Link to='/'>
          <Logo>Hires</Logo>
        </Link>

        <Menu  style={{ display: "inline-block", width: '240px' }} mode="horizontal" items={menuItems} />



      </SearchWrapper>



      <Addition>
        {
              props.login ? null :   <Link exact='true' to="/signUp"><SignIn >Register</SignIn></Link>
        }
      
        {
             props.login ? null : <Link exact='true' to="/signIn"><LogIn>Login</LogIn></Link> 
        }
       
       
       <Popover content={content1} trigger="click">
       <Aa>Aa</Aa>
       </Popover>
       


        {
                props.login ?   
              
              <Popover content={content} trigger="click"  placement="bottomRight"  >
            <Avatar size="large" src={`${apiURL}${data.src}`} icon={<UserOutlined />} />
              </Popover>
             
              
              
              : null
        }
       
      </Addition>

    </Header>

  </div>
  )
}




const mapStateToProps = (state) => {
  return {
    focused: state.navigation.focused,
    login:state.login.login,
    profileImage:state.profile.profileImage,
    freeProfileList:state.profile.freeProfileList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);