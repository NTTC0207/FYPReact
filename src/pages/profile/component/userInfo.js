import React,{ useState,useEffect} from 'react';
import { Layout, Divider, Avatar, Button, Modal, Badge,Upload,message, Form} from 'antd'
import { UserOutlined  ,FlagOutlined } from '@ant-design/icons';
import { connect,useDispatch } from 'react-redux'
import { actionCreators } from '../store'
import { actionCreators as loaderActionCreators } from '../../login/store';
import { UploadOutlined, CalendarOutlined } from '@ant-design/icons';
import Loading from 'react-fullscreen-loading';
import moment from 'moment';
import { ProfileLabelWrapper,ProfileLabelWrapperAdjust, ProfileLabel, ProfileLabelName, UserCard, TextWrapper,  TextLabel,  UserProfileInfo, UserProfileImage, UserProfileName } from "../style"
import {apiURL} from '../../../api/index'
import "../../../scss/main.scss"
import axios from 'axios';

const jwt2 = localStorage.getItem("jwt")

const style={
  display: "none",
}
const { Content } = Layout

const UserInfo=(props)=>{

  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const format2 = "MMM YYYY"
  var date2 = new Date(props.profileList.dateRegister);
  const dateTime2 = moment(date2).format(format2);
  const props1 = {
    listType: 'picture',
 

};

  const info = () => {
    Modal.info({
      title: 'Upload user Profile Picture',
      okButtonProps:{style},
      okCancel:true,
      content: (
        <div style={{ padding: "10px" }}>
          <Form onFinish={onFinish}>
            <Form.Item name="files">
         <Upload {...props1}   maxCount={1} >       
               <Button icon={<UploadOutlined />}>Upload Picture or Video</Button>
          </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit">
                Submit
         </Button>

          </Form>
        </div>
      ),

    
    });
  };

const onFinish = (val) => {
console.log(val)
console.log(val.files.file.originFileObj)

const formData = new FormData();
formData.append('files', val.files.file.originFileObj);
axios({
  method:'PUT',
  url:apiURL +"/api/profileupload",
  data:formData
})
.then((res)=>(
 axios({
  method:'GET',
  url:apiURL +"/api/profileupload"
 })
 .then((res)=>(console.log(res.data),dispatch(actionCreators.profileImage(res.data))))

  ,Modal.destroyAll() 
  
  ))

}



useEffect(() => {

  axios({
    method:"GET",
    url:apiURL +"/api/profileupload"
  })
  .then((res)=>{dispatch(actionCreators.profileImage(res.data))})
},[])

useEffect(() => {
axios({
  method:"GET",
  url:apiURL +"/api/profile"
})
.then((res)=>{dispatch(actionCreators.profileList(res.data))})
},[])

return(
  <>
      <UserCard>

<UserProfileInfo>
  <div>
    <UserProfileImage>  
      <Badge color={props.profileList.online ? "#38ff6d" : null } style={{ width: "20px" ,height: "20px",position: "absolute",right:"21px",top:"105px"}} dot={true}>
      <Avatar onClick={info} src={`${apiURL}${props.profileImage}`} size={120} icon={<UserOutlined />} />
      </Badge> 
    </UserProfileImage>
 





    <UserProfileName>
      <p className="username"> {props.profileList.userName}</p>
    </UserProfileName>
    <Button block>Preview Profile</Button>
    <Divider />
    <div>

    </div>

    <ProfileLabelWrapper>
      <ProfileLabelWrapperAdjust>
      <ProfileLabel ><UserOutlined />Name:</ProfileLabel>
      <ProfileLabelName>{props.profileList.userName}</ProfileLabelName>
      </ProfileLabelWrapperAdjust>
    </ProfileLabelWrapper>
    <ProfileLabelWrapper>
    <ProfileLabelWrapperAdjust>
      <ProfileLabel><CalendarOutlined />Registered at:</ProfileLabel>
      <ProfileLabelName>{dateTime2}</ProfileLabelName>
      </ProfileLabelWrapperAdjust>
    </ProfileLabelWrapper>
    <ProfileLabelWrapper>
    <ProfileLabelWrapperAdjust>
      <ProfileLabel><FlagOutlined />Country:</ProfileLabel>
      <ProfileLabelName>{props.profileList.country}</ProfileLabelName>
      </ProfileLabelWrapperAdjust>
    </ProfileLabelWrapper>
    

  </div>
</UserProfileInfo>

</UserCard>




<Loading loading={props.loader} background="transparent" loaderColor="#3498db" />
  </>
)
}




const mapStateToProps = (state) => {
  return {
    profileList: state.profile.profileList,
    profileImage: state.profile.profileImage,
    login: state.login.login,
    loader: state.login.loader,
    selectedFile: state.profile.selectedFile,
    checkImage: state.profile.checkImage


  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getUserImage(token){
        const action2 =actionCreators.getProfileImage(token)
        dispatch(action2)
    },
    getUserProfile(token) {

      const action = actionCreators.getUserData(token)
      dispatch(action)

    },
    handleInputChange(e) {
      dispatch(actionCreators.getInput(e.target.files[0]))

    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);