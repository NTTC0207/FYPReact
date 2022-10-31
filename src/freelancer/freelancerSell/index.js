import React, { useState,useEffect,useCallback } from "react";
import { FreelancerWrapper, FreelancerTitle, FreelancerSubtitle, FreelanncerLangTitle } from '../freelancerRegister/style'
import { Form, Input, Button, Select, Row, Col, Upload, Tooltip, message,Divider ,Slider,Spin} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { useHistory,Redirect } from "react-router-dom";
import {actionCreators as freeAction} from '../freelancerRegister/store'
import { apiURL } from '../../api/index'
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, convertToRaw ,EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import './index.css'
import {connect} from 'react-redux'




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

const { Option } = Select
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const FreelancerPost = (props) => {
    const history = useHistory();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const [fileList, setFileList] = useState("");
    const [data,setCate] =useState([]);
    const [subData,setSubD] =useState([]);
    const [uploading, setUploading] = useState(false);
    const [disable , setDisable] = useState(true);

    const [editorState, setEditorState] = useState( () => EditorState.createEmpty(),);
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw)
    const  [convertedContent, setConvertedContent] = useState(null);
    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e?.fileList;
      };

    useEffect(() => {
   axios({
    method:"GET",
    url:apiURL +"/api/category/fss"
   })
   .then((res)=>(setCate(res.data)))
    },[])


    const getSubItem=(val)=>{
        axios.get(apiURL +"/api/subcategory/"+val).then((res)=>(setSubD(res.data),setDisable(false) ))
    }

    const [isSending, setIsSending] = useState(false)

    const onFinish = useCallback (async( values) => {
   console.log(values)
   
   const convert = createMarkup(convertedContent).__html 

        const formData = new FormData();
    
            formData.append('files', values.files[0].originFileObj);
            formData.append('ServiceDelivery',values.ServiceDelivery);
            formData.append('ServiceDesc',convert);
            formData.append('ServiceTitle',values.ServiceTitle);
            formData.append('SubCategoryID',values.subCategoryID);
            formData.append('ServicePrice',values.ServicePrice);
    
        if(isSending) return
        setIsSending(true)

       await axios({
            method: "post",
            url: apiURL + "/api/sellservice",
            data:formData

        })
        .then((res)=> {
            if(res.status === 200){
                setIsSending(false)
                history.push("/profile")
                message.success('Message added successfully :D ');
            }
        })
       
    });

    

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

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }
      const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }
  

      useEffect(() => {
        form.setFieldsValue({
            ServiceDesc: createMarkup(convertedContent),
        });
      }, [handleEditorChange]);

     if(props.login && props.role === 'freelancer'){
    return (
        <>
        <Spin style={{display: 'flex', justifyContent:"center",alignItems: 'center'}} spinning={isSending}>
            <div style={{ padding: "5% 10%" }}>
                <FreelancerWrapper>
                    <FreelancerTitle>
                      Freelancer Sell Service
                    </FreelancerTitle>
                    <FreelancerSubtitle>
                    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, ... Lorem Ipsum idu
                    </FreelancerSubtitle>
                    <Divider />
                    <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name= 'ServiceTitle' label="Title and Category" rules={[{ required: true, message: 'Please enter title' },]}>
                            <Input.TextArea style={{ height: 50 }} maxLength={55} placeholder="Please enter  title" showCount/>
                        </Form.Item>


                       <Row >
                        <Col span={12} push={8} >
                        <Form.Item  rules={[{ required: true, message: 'Please select Category!!' },]}>
                            <Select  onChange={(value)=>{getSubItem(value)}} style={{ width: "100%",display: "inline-block"}} placeholder="Select Category">
                                {
                                    data.map((item)=>{
                                        return (
                                            <>
                                            <Option key={item.categoryID} value={item.categoryID} >{item.categoryName} </Option>
                                            </>
                                        )
                                    })
                                }
                            </Select>
                            </Form.Item>
                            </Col>
                            <Col span={12} push={4} >
                            <Form.Item  name="subCategoryID"  rules={[{ required: true, message: 'Please select sub Category!!' },]}>
                            <Select style={{ width: "100%",display:"inline-blo" }} placeholder="Select SubCategory" disabled={disable}>
                            {
                                subData.map((item)=>{
                                    return(
                                        <>
                                        <Option key={item.subCategoryID} value={item.subCategoryID} >{item.subCategoryName} </Option>
                                        </>
                                    )
                                })
                            }
                            </Select>


                        </Form.Item>
                        </Col>
                        </Row>

                        {/* <Form.Item name='ServiceDesc' label="Service Description:" rules={[{ required: true, message: 'Please enter Description' },]}>
                            <Input.TextArea style={{ height: 100 }} maxLength={2000} placeholder="Please enter Description" showCount/>
                        </Form.Item> */}
                        
                         <Form.Item   label="Service Description:" rules={[{ required: true, message: 'Please enter Description' },]}>
                         <Editor
                             editorState={editorState}
                             onEditorStateChange={handleEditorChange}
                             wrapperClassName="wrapper-class"
                             editorClassName="editor-class"
                             toolbarClassName="toolbar-class"
                         />
                        </Form.Item>
                        <Form.Item name='ServiceDesc' hidden >
                       <Input.TextArea />
                        </Form.Item>
                        {/* {
                            console.log(createMarkup(convertedContent))
                        }
                        <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
                        {/* {
                            console.log(createMarkup(convertedContent).__html)
                        } */}

                        <Form.Item name= 'ServicePrice' label="Price"  rules={[{ required: true, message: 'Please enter price' },]} >
                            <Input title="please enter number only" pattern="[0-9]+" placeholder="Enter at least 10$" maxLength={5} showCount  />
                        </Form.Item>

                        {/* <Form.Item name= 'ServiceDelivery' label="Deliver in:" rules={[{ min: 1, max: 2, },]} >
                            <Input title="please enter number only" pattern="[0-9]+" placeholder="Deliver in days" maxLength={2} showCount />
                        </Form.Item> */}
                        <Form.Item name='ServiceDelivery' label="Deliver in:" rules={[{ required: true, message: 'Please select at least Skill!' },]}>
                            <Slider marks={marks} max={30} />
                        </Form.Item>

                        <Form.Item name="files" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: 'Please Upload 1 picture' },]}>
                        <Upload {...props1} maxCount={1} >
                            <Tooltip title="Upload maximum 1 file in any format">
                                <Button icon={<UploadOutlined />}>Upload Picture or Video</Button>
                            </Tooltip>
                        </Upload>
                        </Form.Item>


                     
                        {/* <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16,}}></Button> */}


                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 22 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </FreelancerWrapper>
            </div>
            </Spin>
        </>
    )
    }else{
        return <Redirect exact="true" to='/unauthorized' />
    }
}


const mapStateToProps = (state) => {
    return{
        role: state.login.role,
        login: state.login.login
    }
}


export default connect(mapStateToProps,null)( FreelancerPost);