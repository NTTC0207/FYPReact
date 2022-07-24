import React from 'react';
import { Layout, Divider, Avatar, Button, Modal, Badge} from 'antd'
import { UserOutlined  ,FlagOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import { actionCreators as loaderActionCreators } from '../../login/store';
import { UploadOutlined, CalendarOutlined } from '@ant-design/icons';
import Loading from 'react-fullscreen-loading';
import moment from 'moment';
import { ProfileLabelWrapper,ProfileLabelWrapperAdjust, ProfileLabel, ProfileLabelName, UserCard, TextWrapper,  TextLabel,  UserProfileInfo, UserProfileImage, UserProfileName } from "../style"
import {apiURL} from '../../../api/index'
import "../../../scss/main.scss"
import jwt_decode from "jwt-decode"; 

const jwt2 = localStorage.getItem("jwt")
const decode = jwt_decode(jwt2)



const { Content } = Layout



class UserInfo extends React.Component {
  render() {

    
    const format2 = "MMM YYYY"
    var date2 = new Date(this.props.profileList.dateRegister);
    const dateTime2 = moment(date2).format(format2);


    const info = () => {
      Modal.info({
        title: 'Upload user Profile Picture',
        content: (
          <div style={{ padding: "10px" }}>
            <input type="file" onChange={this.props.handleInputChange} />

            <Button type="submit" onClick={() => this.props.submit(this.props.selectedFile)} icon={<UploadOutlined />}>Upload</Button>

          </div>
        ),

        onOk() { },
      });
    };



    return (
    <>
         

              <UserCard>

                <UserProfileInfo>
                  <div>
                    <UserProfileImage>  
                      <Badge color={this.props.profileList.online ? "#38ff6d" : null } style={{ width: "20px" ,height: "20px",position: "absolute",right:"21px",top:"105px"}} dot={true}>
                      <Avatar onClick={info} src={`${apiURL}${this.props.profileImage}`} size={120} icon={<UserOutlined />} />
                      </Badge> 
                    </UserProfileImage>
                    <UserProfileName>
                      <p className="username"> {this.props.profileList.userName}</p>
                    </UserProfileName>
                    <Button block>Preview Profile</Button>
                    <Divider />
                    <div>

                    </div>

                    <ProfileLabelWrapper>
                      <ProfileLabelWrapperAdjust>
                      <ProfileLabel ><UserOutlined />Name:</ProfileLabel>
                      <ProfileLabelName>{this.props.profileList.userName}</ProfileLabelName>
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
                      <ProfileLabelName>{this.props.profileList.country}</ProfileLabelName>
                      </ProfileLabelWrapperAdjust>
                    </ProfileLabelWrapper>
                    

                  </div>
                </UserProfileInfo>

              </UserCard>


            
      
        <Loading loading={this.props.loader} background="transparent" loaderColor="#3498db" />

        </>
    )

  }

  componentDidMount() {
    const token = decode.nameid
    this.props.getUserProfile(token)
    this.props.getUserImage(token)
  }

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

    },
    submit(props) {


      dispatch(loaderActionCreators.getLoader())
      dispatch(actionCreators.getUploadImage(props, decode.nameid))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);