import React,{ useState,useEffect} from "react";
import {Row,Col,Avatar,Image,Divider,Rate,Button} from 'antd'
import {DetailTitle,DetailAvatarWrapper,DetailAvatarName,DetailDescWrapper,DetailDescTitle,DetailDesc,Wrapper2 } from './style'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import {apiURL} from '../../api/index'
import {useSelector} from 'react-redux'
import ReactPlayer from 'react-player'
import { Widget } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';





const ServiceDetail=(props)=>{


  const [data, setDetail] =useState([])

  const[format,setFormat]=useState("")



  const  getData=async ()=>{
 await  axios({
    method: 'GET',
    url:apiURL+"/api/sellservicepublic/detail/"+props.match.params.id
})
.then((res)=>( setFormat(res.data.serviceUrl.slice(-3)) ,setDetail(res.data)))
  }

    useEffect(()=>{
       getData()

    },[])
   
   
    const handleToken=(token)=>{
   console.log(token)
    }

    const handleCheckout=(data)=>{
    
     axios({
      method: 'POST',
      url:apiURL+"/api/payments/create-checkout-session/",
      data:data,
      headers: { 'Content-Type': 'application/json'}
     })
       .then((res)=>{  window.location.href = res.data })


    }

return(
    <Wrapper2>
    <Row style={{marginTop:"40px"}} >
        <Col span={12} push={4}>
            <DetailTitle>{data.serviceTitle}</DetailTitle>
          
          <DetailAvatarWrapper style={{display:"flex"}}>
            <Avatar style={{display: 'block',marginBottom:"20px"}} src={`${apiURL}${data.userImageSrc}`}  />
            <DetailAvatarName>{data.userName}</DetailAvatarName>
            <Divider style={{display:"inline-block"}} type="vertical"  />
            <Rate  allowHalf disabled value={data.rating} style={{fontSize:"13px",color:"#ffb33e"}} />
            <span style={{fontSize:"14px",color:"#ffb33e",fontWeight:"700",marginLeft:'5px'}}>5</span>
            </DetailAvatarWrapper>
   
   {
     format === "mp4" ?   <ReactPlayer className="lazyload"  height={427}  url={`${apiURL}${data.serviceUrl}`} controls config={{ file: { attributes: { controlsList: 'nodownload' } } }} /> :   <Image  style={{objectFit:"cover",width:"100%"}}  height={427}  src={`${apiURL}${data.serviceUrl}`}/> 
   }
  

           <Divider />
           
           <DetailDescWrapper>
            <DetailDescTitle>Description </DetailDescTitle>
            
            <DetailDesc dangerouslySetInnerHTML={{__html:data.serviceDesc}}></DetailDesc>
          

           </DetailDescWrapper>

        </Col>
        
        
        
        
        <Col span={12} push={4}>
          <div>
            prototype checkout
            <br/>
     {
      props.login ?  <Button onClick={()=>{handleCheckout(data)}} > Checkout</Button>  :<Link exact="true" to="/signIn"> <Button  > Checkout</Button></Link>
     }
          </div>
       
        </Col>
    </Row>


    
    <Widget
   profileAvatar={`${apiURL}${data.userImageSrc}`}
   titleAvatar={`${apiURL}${data.userImageSrc}`}
    title={`Chat with ${data.userName}`}
    subtitle={data.serviceTitle}
   emojis={true}
    />

    </Wrapper2>
)


}

const mapStateToProps =(state) => {
    return{
 login :state.login.login
    }
}

export default connect(mapStateToProps,null)(ServiceDetail);