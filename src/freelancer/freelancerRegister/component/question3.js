import React,{useEffect,useState} from "react";
import { FreelancerWrapper, FreelancerTitle, FreelancerSubtitle, FreelanncerLangTitle } from '../style'
import { UploadOutlined } from '@ant-design/icons';
import {connect,useDispatch} from 'react-redux'
import { Divider, Form, Input,Select,Steps,Progress,Button,Space,Upload,Tooltip, message } from 'antd';
import { actionCreators as freeAction } from '../store'
import {actionCreators as proAction} from '../../../pages/profile/store'
import axios from "axios";
import {  Link ,useHistory,Redirect} from 'react-router-dom'
import { apiURL } from '../../../api/index'


const { Dragger } = Upload;

const layout = {
    labelCol: {
      span: 2,
    }
  };

const Question3 =(props)=>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [current, setCurrent] = useState(0);
    //file update
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    useEffect(()=>{
        axios.get(apiURL+"/api/freelancerlanguage/dd").then((res)=>{dispatch(freeAction.getProgress(res.data))})
      
      },[])

//axios for upload file
const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files', file);
    });
    console.log(formData)
    setUploading(true); // You can use any AJAX library you like

    axios({
      method: 'POST',
       url: apiURL+"/api/freelancerform3",
      data: formData,
    })
      .then((res) => {
        if(res.data==="NO PROBLEM"){
        setFileList([]);
        message.success('upload successfully.');
        history.push("/")
        }
    
        alert(res.data)

      axios({
        method: 'GET',
        url:apiURL + '/api/profile/freelancer'
      })
      .then((res)=>{dispatch(proAction.getFreelancerData(res.data))})

      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props1 = {
    listType: 'picture',
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
  fileList,
  };
  if(props.progess.profileCompleteRate === 70){
    return(
        <>
        <Steps
                type="navigation"
                current={2}
                onChange={setCurrent}
                className="site-navigation-steps">
                <Steps.Step title={"Basic Information"} disabled />
                <Steps.Step title={"Professional Skill"} disabled />
                <Steps.Step title={<Link to="/freelancerRegistertest/questionn3"> Reesume and Proposal</Link>} />
              
            </Steps>

            <div style={{padding:"5% 10%"}}>
            {/* props.progess.profileCompleteRate */}
        
    <FreelancerWrapper>
    <Progress percent={props.progess.profileCompleteRate} style={{float:'right',width:"200px",marginLeft:"5px"}} />
      <FreelancerTitle>
       Resume and Proposal
      </FreelancerTitle>
      <FreelancerSubtitle>
       Upload your resume and proposal to let other know more about you
      </FreelancerSubtitle>
      <Divider />

      <FreelanncerLangTitle>
      <Tooltip title="Upload your previous project to let other know your skill">
        Project Done
        </Tooltip>
      </FreelanncerLangTitle>
   

  
   {/* start upload */}
   <Upload {...props1} >
   <Tooltip title="Upload maximum 3 files in any format">
        <Button icon={<UploadOutlined />}>Select File</Button>
        </Tooltip>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
{/* //end upload */}


{/*    
      <Form {...layout} onFinish={null} style={{marginTop:"20px"}}>
        <Form.Item label="Proposal:" name="Introduction" rules={[{ required: true, message: 'Please input your Description!' },]} >
          
        </Form.Item>
        <Form.Item>
         
        </Form.Item>
      </Form> */}
    </FreelancerWrapper>
</div>



        </>
    )
  }else if(props.progess.profileCompleteRate === 40){
    return <Redirect exact="true" to="/freelancerRegistertest/questionn2" />
  }else if(props.progess.profileCompleteRate === 0){
    return <Redirect exact="true" to="/freelancerRegistertest/questionn1" />
  }
}

const mapStateToProps = (state)=>{
    return{
        progess:state.freelancerRegister.progress,
        uploadProposal:state.freelancerRegister.uploadProposal
    }
}



export default connect(mapStateToProps)(Question3);