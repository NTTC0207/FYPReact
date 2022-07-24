import React from "react";
import { ProfileLabelWrapper,ProfileLabelWrapperAdjust, ProfileLabel, ProfileLabelName, UserCard, TextWrapper,  TextLabel,  UserProfileInfo, UserProfileImage, UserProfileName } from "../style"
import {Card ,Row,Col} from 'antd'
import { PlusCircleFilled } from '@ant-design/icons';





const PostRequest =()=>{
    
const addRequest =()=>{

}

return(
    <>
<UserCard style={{width:"100%",padding:"20px "}}>
<div style={{fontSize:"20px", fontWeight:"600",display:"flex",alignItems:"center"}}>Post Request</div>
</UserCard>

<Row justify="space-between" align="left">
    <Col  span={7}>
<Card onClick={addRequest} bordered={false} style={{marginTop:"20px" ,width: 232,  height: 260,  display: "flex", justifyContent: "center",  alignItems: "center" }}>
    <PlusCircleFilled style={{fontSize:"70px",color:"#69c0ff",display: "flex", justifyContent: "center",alignItems: "center"}}/>
    <p style={{ display: "flex", justifyContent: "center",alignItems: "center", fontWeight:"bold"}}>Create your request</p>
    </Card>
    </Col>

 

    </Row>

    </>
)
}


export default PostRequest;