import React,{useState,useEffect,useCallback} from "react";
import { PRequest} from "../style"
import { Card, Row, Col, Tabs,Image,Modal,Button,Form,Input,Slider,Upload,Spin,message} from 'antd'
import { PlusCircleFilled ,EditOutlined,  DeleteOutlined,ExclamationCircleOutlined, UploadOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios";
import {apiURL} from '../../../api/index'
import ReactPlayer from 'react-player'



const { confirm } = Modal;
const { Meta } = Card;
const { TabPane } = Tabs;
const onChange = (key) => {
    console.log(key);
  };
  const getFormat =(val)=>{
    return val.slice(-3)
  }
  const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const marks = {
    1: '1day',
    7: '7days',
    15: '15days',
    30: {
        style: {
            color: '#f50',
        },
        label: <strong>over 30days</strong>,
    },
};
  const sliceDesc = (val)=>{
  return  val.slice(0,20)
  }
  const sliceTitle = (val)=>{
    return  val.slice(0,10)
    }
 

const PostRequest = (props) => {

   

    const [data, setFreelancer]=useState([]);
    const [fileList, setFileList] = useState("");

    useEffect(()=>{
     
        axios({
            method:"get",
            url: apiURL+"/api/sellservice" 
        }).then((res)=>{setFreelancer(res.data)})

    },[])

    const [isSending, setIsSending] = useState(false)
    const deleteService=  (val)=>{
   
              
            confirm({
              title: 'Are you sure delete this service?',
              icon: <ExclamationCircleOutlined />,
              content:<>You wont be able to revert this! <br/> <b>Service Title:</b> {val.serviceTitle} </> ,
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
          
              onOk() {
                setIsSending(true)
          axios({
                method:"delete",
                url: apiURL+"/api/sellservice/"+val.serviceID
              })
              .then(()=>(
              
                axios({
                    method:"get",
                    url: apiURL+"/api/sellservice"
                }).then((res)=>(setFreelancer(res.data)))
                .finally(setIsSending(false))
        
              ))
              },
          
              onCancel() {
                console.log('Cancel');
              },
            });
       
    }

    const onFinish = (val) => {
   console.log(val)

   axios({
    method:"PUT",
    url:apiURL+"/api/sellservice",
    data:val
   }).then(()=>(
    Modal.destroyAll(),
     axios({
    method:"get",
    url: apiURL+"/api/sellservice"
}).then((res)=>{setFreelancer(res.data)})
))
    }

    const editService = (val) => {
        console.log(val)
        confirm({

          title: 'Update your service?',
          icon: <ExclamationCircleOutlined />,
          okButtonProps:{hidden:true},
          // cancelButtonProps:{hidden:true},
          content: (
            <>
            <Form {...layout}  name="nest-messages" onFinish={onFinish} initialValues={{ServiceID:val.serviceID,ServiceTitle:val.serviceTitle,ServiceDelivery:val.serviceDelivery,ServicePrice:val.servicePrice,ServiceDesc:val.serviceDesc,files:val }} >
      <Form.Item name= 'ServiceID' label="ID:" rules={[ { required: true,},]} hidden>
        <Input />
      </Form.Item>
      <Form.Item name= 'ServiceTitle' label="Title:" rules={[ { required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name='ServiceDesc' label="Description:"  >
        <Input.TextArea />
      </Form.Item>
      <Form.Item name= 'ServicePrice'  label="Price:"   >
      <Input title="please enter number only" pattern="[0-9]+" placeholder="Enter at least 10$" maxLength={5} showCount  />
      </Form.Item>
      <Form.Item name='ServiceDelivery' label="Deliver in:">
      <Slider marks={marks} max={30} />
      </Form.Item>

      <Form.Item  style={{position:"absolute", bottom:0,right:"30%"}}>
        <Button type="primary" htmlType="submit" >
          Update
        </Button>
      </Form.Item>
    </Form>
            </>
          ),
      
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
          },
      
          onCancel() {},
        });
      };
   

      const props1 = {
        listType: 'picture',
        // onRemove: (file) => {
        //     const index = fileList.indexOf(file);
        //     const newFileList = fileList.slice();
        //     newFileList.splice(index, 1);
        //     setFileList(newFileList);
        // },
        beforeUpload: (file) => {
          
            const isPNG = file.type === 'image/png';
            const isJPEG = file.type === 'image/jpeg';
            const isMP4 = file.type === 'video/mp4';
          

            if (!(isPNG || isJPEG || isMP4) ) {
              message.error(`${file.name} is not a png/jpeg/mp4 file`);
            
            }
            else{
                setFileList([file]);
                return false
            }
       
            return isPNG || isJPEG || isMP4 || Upload.LIST_IGNORE;
           
        }, onChange: (info) => {
            
            console.log(info.fileList);
          },
        fileList,
        
    };
    const addRequest = () => {

    }

    return (
        <PRequest>
          <Spin spinning={isSending}>
      
        <Tabs defaultActiveKey="1" onChange={onChange} style ={{width: '100%',padding: '0 20px'}}>
        <TabPane tab="Post Project" key="1"  >
        <Row justify="space-between" align="left" >
                <Col span={7}>
                    <Link to="/clientrequest">
                        <Card onClick={addRequest} bordered={false} style={{ margin: "20px 0", width: 232, height: 285, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <PlusCircleFilled style={{ fontSize: "70px", color: "#69c0ff", display: "flex", justifyContent: "center", alignItems: "center" }} />
                            <p style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold",marginTop:"10px"  }}>Create your request</p>
                        </Card>
                        
                    </Link>
                </Col>
                
            </Row>
    </TabPane>
 {
    props.role ==="freelancer" ?    <TabPane tab="Sell Service" key="2">
  {
    props.completeRate.profileCompleteRate === 100 ?
     <Row justify="space-between" align="left" >
    <Col span={7}>
        <Link to="/freelancerpost">
            <Card  onClick={addRequest} bordered={false} style={{ margin: "20px 0", width: 232, height: 285, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <PlusCircleFilled style={{ fontSize: "70px", color: "#69c0ff", display: "flex", justifyContent: "center", alignItems: "center" }} />
                <p style={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold",marginTop:"10px" }}>Create Service</p>
            </Card>
            
        </Link>
    </Col>
    {
        data.map((item)=>{
            return(
                <>
                   <Col >
    
       <Card  hoverable bordered style={{ margin: "20px 0", width: 232, height: 285}}
       
cover={
  getFormat(item.serviceUrl) === "mp4" ? <ReactPlayer width={232} height={133}   url={`${apiURL}${item.serviceUrl}`} controls  /> 
: <Image style={{height: "140px", objectFit:"cover"}} alt="example" src={`${apiURL}${item.serviceUrl}`}/>
}
actions={[

<EditOutlined onClick={()=>{editService(item)}} key={item.serviceID} />,
<DeleteOutlined  onClick={()=>{deleteService(item)}} key={item.serviceID}/>                                                                     

]}>
<Meta  title={<>{sliceTitle(item.serviceTitle)+"..."}  <span style={{position:"absolute", right:"12%"}}> {item.servicePrice+"$"} </span>  </>}    description={sliceDesc(item.serviceDesc)+"  ...."} />
</Card>

   </Col>
                </>
            )
        })
    }
    



 


    
   




    
</Row> : <p>Please complete your profile before sell services</p>
  }

  
    </TabPane>   :null
 }
   
        
            </Tabs>
            </Spin>
        </PRequest>
    )
}


const mapStateToProps = (state) => {
    return{
   completeRate:state.profile.freeProfileList,
   change:state.profile.change,
   role:state.login.role
    }
}



export default connect(mapStateToProps,null) ( PostRequest);