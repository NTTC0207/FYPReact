import React, {useState,useEffect} from 'react'
import { Layout, Menu, Switch,Avatar , Popover, Spin ,Skeleton,Input, Empty,List,Badge} from 'antd';
import { Logo, SearchWrapper, SearchInfo, SearchInfoList, SearchInfoItem, NavSearch, Addition, Button, Aa, SignIn, MenuWrapper, LogIn } from './style'
import { connect ,useDispatch} from "react-redux"
import { actionCreators } from './store'
import {actionCreators as Loginaction} from '../../pages/login/store/index'
import { actionCreators as profileAction } from '../../pages/profile/store';
import { Link , useHistory } from 'react-router-dom'
import { UserOutlined,ShoppingCartOutlined  } from '@ant-design/icons';
import  {apiURL} from '../../api/index'
import Logo1 from '../../statics/Logo.jpeg'
import axios from 'axios';


const { Search } = Input;
const count = 3
const imgStyle={
  objectFit:"cover",
  width:"190px",
  height:"40px"
}

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

    label: <> <Link to="/servicelist">Find Freelancer </Link> </>,
  },
  {
    key: 'post',

    label: 'Post Job',
  },

];

const data2 = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const Navigation = (props)=>{

const dispatch =useDispatch();
const history = useHistory()

const [order, setOrder]= useState([])





const onLogout =()=>{
 


  axios(apiURL+"/api/login",{
    method:'PUT'

  }).then(()=>(
    window.localStorage.clear(),
    window.location="/"
  ))

}



  const onChangeRole =()=>{
    
  axios(apiURL+"/api/freelancerlanguage",{
    method: "POST",
  })
  .then(()=>(   history.push("/freelancerRegister")))
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

    
    
        const [client, setClient] =useState([])
      const handleGet =()=>{

        axios({
          method:"GET",
          url: apiURL+"/api/clientOrder"
        })
        .then((res)=>{setClient(res.data)})
      }
   
      const content2 = (
        <div style={{width: '450px',overflowY: 'scroll'}}>
    {
      client === null ?  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :null
    }  
     <List
  itemLayout="horizontal"
  dataSource={client}
  renderItem={(item) => (
    <List.Item     actions={[ <a key="list-loadmore-more">confirm</a>]}>
      <List.Item.Meta
        avatar={<Avatar src={`${apiURL}${item.userImageSrc}`} />}
        title={item.serviceTitle}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
  )}
/>

        </div>
      );
      
        //React Hook 
        const [data, setProfileImage] =useState("")
    
        useEffect(()=>{
       
          if(props.login === true){
         
            axios.get( apiURL +"/api/profileupload" ).then((res)=>(dispatch(profileAction.profileImage(res.data)) ))
          }

          },[props.login])

          useEffect(()=>{

            if(props.login === true){
          
          
               if(props.role === "freelancer"){
                axios(apiURL+"/api/profile/freelancer").then((res)=>( dispatch(profileAction.getFreelancerData(res.data)) ))
               }

            }
        

          },[props.login])

          const onSearch=()=>{
            console.log('test')
          }
  
  return(
    <div>

    <Header style={HeaderStyle}  >
 
      <div>
      <Link to='/'>
         <img alt="logo" src={Logo1} style={imgStyle}/>
        </Link>
    
       
        <Menu  style={{ display: "inline-block", width: '240px' }} mode="horizontal" items={menuItems} />

        {/* <Search type="primary"  placeholder="input search text" onSearch={onSearch} style={{width:"400px",height: "40px",marginTop:"15px"}}/> */}
    
      </div>

      <Addition>
     
        {
              props.login ? null :   <Link exact='true' to="/signUp"><SignIn >Register</SignIn></Link>
        }
      
        {
             props.login ? null : <Link exact='true' to="/signIn"><LogIn>Login</LogIn></Link> 
        }
     

{
  props.login ? 
  <Popover content={content2} trigger="click">
      
  <Aa onClick={handleGet}>My Orders</Aa>

 </Popover> :null
}
      

       {/* <Popover content={content1} trigger="click">
       <Aa>Aa</Aa>
       </Popover> */}
       


        {
                props.login ?   
              
              <Popover content={content} trigger="click"  placement="bottomRight"  >
            <Avatar size="large" src={`${apiURL}${props.profileImage}`} icon={<UserOutlined />} />
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
    freeProfileList:state.profile.freeProfileList,
    role:state.login.role
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