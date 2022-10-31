import React,{Fragment} from 'react';
import UserInfo from './component/userInfo'
import PostRequest from './component/postRequest'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {ProfileLabelWrapper} from './style'
import { Col, Row } from 'antd';
import {apiURL}from '../../api/index'

class Profile extends React.Component {
    render() {
      if(this.props.login){
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

  <Row gutter={[400,0]} justify="center" align="center" style={{padding:"5% 0" }}>
    <Col span={6}>
   {
    this.props.role ==="freelancer" ?   
    <>
    <div>{this.props.freelist.introduction}</div>
    <div>Rating:{this.props.freelist.rating}</div>
    <div> 
  {
    this.props.freelist.proposalFree.map((item)=>{
      return(
        <>
       <a href={`${apiURL}${item.proposalName}`} download>
         <a>{item.proposalName} </a>
       </a>
        </>
      )
    })
  }

    </div>
    
    </>
    : null
   }
    </Col>


    <Col span={15}>
    
    </Col>
  </Row>



</>
        )
  }else{
   return <Redirect exact="true" to='/unauthorized' />
  }
    }

    }
 
const mapStateToProps=(state) => {
return{
login:state.login.login,
role:state.login.role,
freelist: state.profile.freeProfileList
}
}

const mapDispatchToProps=(dispatch) => {
  return {
 

  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Profile);