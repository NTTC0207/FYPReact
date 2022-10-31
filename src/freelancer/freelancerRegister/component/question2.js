import React,{useEffect,useState} from "react";
import { FreelancerWrapper, FreelancerTitle, FreelancerSubtitle, FreelanncerLangTitle } from '../style'
import {connect,useDispatch} from 'react-redux'
import { Divider, Form, Input,Select,Checkbox,Col,Row,Button,Steps,Progress ,notification} from 'antd';
import { actionCreators as freeAction } from '../store'
import axios from "axios";
import {  Link ,useHistory,Redirect} from 'react-router-dom'
import { apiURL } from '../../../api/index'
const jwt2 = localStorage.getItem("jwt")



const {Option} = Select;

const layout = {
    labelCol: {
      span: 2,
    }
  };

const Question2 = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [current, setCurrent] = useState(0);
    const [cate,setCate] =useState([]);
    const [sub,setSub] =useState([]);


    useEffect(() => {
    axios.get(apiURL+"/api/freelancerform2/").then((res)=>(setCate(res.data)))
    },[])
 

    const getSubCate=(val)=>{
    axios.get(apiURL +"/api/subcategory/"+val).then((res)=>{setSub(res.data)})
       
    }

    useEffect(()=>{
        axios.get(apiURL+"/api/freelancerlanguage/dd").then((res)=>{dispatch(freeAction.getProgress(res.data))})
      
      },[])

      const selectBefore = (
        <Select defaultValue="http://" className="select-before">
          <Option value="http://">http://</Option>
          <Option value="https://">https://</Option>
        </Select>
      );
      const selectAfter = (
        <Select defaultValue=".com" className="select-after">
          <Option value=".com">.com</Option>
          <Option value=".jp">.jp</Option>
          <Option value=".cn">.cn</Option>
          <Option value=".org">.org</Option>
          <Option value=".edu">.org</Option>
        </Select>
      );

 

 const onChange = (e) => {
console.log( e.target.value )
 }

 const onFinish = (values) => {
 if(values.SubCategoryID.length > 4){
  notification.open({
    message: 'Maximum limit reach',
    description:
      'Please select maximum 4 sub-category!',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
 }else{ 
axios(apiURL + "/api/subcategory/expert",
{
  method:'POST',
  data: values

}).then((res) => ( res.data==="Success" ? null: alert(res.data),dispatch(freeAction.getProgress(res.data)) ))
.finally(history.push('/freelancerRegistertest/questionn3'))
 }

 }
   if(props.progess.profileCompleteRate === 40){
    return (
        <>
       
          <Steps
                type="navigation"
                current={1}
                onChange={setCurrent}
                className="site-navigation-steps">
                <Steps.Step title={"Basic Information"} disabled />
                <Steps.Step title={<Link to="/freelancerRegistertest/questionn2"> Professional Skill</Link>} />
                <Steps.Step title={"Resume and Proposal"} disabled />
              
            </Steps>

      <div style={{padding:"5% 10%"}}>
      
        <FreelancerWrapper>
        <Progress percent={props.progess.profileCompleteRate} style={{float:'right',width:"200px",marginLeft:"5px"}} />
            <FreelancerTitle>
                Professional Field
            </FreelancerTitle>
            <FreelancerSubtitle>
                Select your professional skill from these categories
            </FreelancerSubtitle>
            <Divider />

            <Form {...layout} onFinish={onFinish}>

            <Form.Item label="Skill:"  >
          <Select onChange={(value) => {getSubCate(value)}} style={{ padding: "5px",  width: "77%", float: "right" }}>
           {
            cate.map((item) =>{
                return(
                    <Option key={item.categoryID} value={item.categoryID} >
                      {item.categoryName}
                    </Option>
                )
            })
           }
          </Select>
          </Form.Item>
          <Form.Item  name="SubCategoryID" rules={[{ required: true, message: 'Please select at least Skill!' },]} >
         {/* <div style={{ padding: "5px",  width: "70%", float: "right" }}>Select at most 5 sub category</div> */}
          <Checkbox.Group name="SubCategoryID" style={{ padding: "5px",  width: "70%", float: "right" }} >
          <Row gutter={[24,12]}>
            {
                sub.map((item) =>{
                    return(
                      
                            <Col span={6} >
                                <div style={{display:'flex'}}>
                        <Checkbox  key={item.subCategoryID} disabled={false} value={item.subCategoryID} style={{float:'left'}} onChange={onChange} >
                            {item.subCategoryName}
                        </Checkbox>
                        </div>
                        </Col>
                      
                    )

                })
            }
             </Row>
          </Checkbox.Group>
            </Form.Item>


            {/* <Form.Item  label="Website:" name="SocialMediaUrl" rules={[{ required: true, message: 'Please input your Website or Social Meida URL!' },]} >
              <Input name="SocialMediaUrl" addonBefore={selectBefore} addonAfter={selectAfter}  style={{ padding: "5px",  width: "77%", float: "right" }} />
           </Form.Item> */}



           <Form.Item>
          <Button type="primary" htmlType="submit" style={{ padding: "5px", float: "right",marginTop:"10px",width:"100px" }}>Continue</Button>
        </Form.Item>


            </Form>



        </FreelancerWrapper>
        </div>
        </>
    )
  }else if(props.progess.profileCompleteRate === 0){
    return <Redirect exact="true" to="/freelancerRegistertest/questionn1" />
  }else if(props.progess.profileCompleteRate === 70){
    return <Redirect exact="true" to="/freelancerRegistertest/questionn3" />
  }


}



const mapStateToProps = (state) => {
    return{
        progess:state.freelancerRegister.progress
    }
}

export default connect(mapStateToProps,null)(Question2);