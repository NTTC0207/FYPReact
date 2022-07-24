import React,{Fragment} from 'react';
import UserInfo from './component/userInfo'
import PostRequest from './component/postRequest'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {ProfileLabelWrapper} from './style'
import { Col, Row } from 'antd';

class Profile extends React.Component {
    render() {
      // if(this.props.login){
        return (
<>
  <Row gutter={[400,0]} justify="center" align="center" style={{padding:"5% 0" }}>
    <Col span={6}>
    <UserInfo />
    </Col>


    <Col span={15}>
    <PostRequest />
    </Col>
  </Row>



</>
        )
  // }else{
  //  return <Redirect exact="true" to='/' />
  // }
    }

    }
 
const mapStateToProps=(state) => {
return{
login:state.login.login
}
}

const mapDispatchToProps=(dispatch) => {
  return {
 

  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Profile);