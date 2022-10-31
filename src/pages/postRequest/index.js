import React, { useState } from "react";
import { FreelancerWrapper, FreelancerTitle, FreelancerSubtitle, FreelanncerLangTitle } from '../../freelancer/freelancerRegister/style'
import { Form, Input, Button, Select, Row, Col, Upload, Tooltip, message, Divider, Slider } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { apiURL } from '../../api/index'

const jwt2 = localStorage.getItem("jwt")




const { Dragger } = Upload;
const fkey1 = localStorage.getItem('fkey');
const uploadURL = apiURL + '/api/freelancerform3/' + fkey1;

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

const ClientRequest = (props) => {
    const history = useHistory();

    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const onFinish = (values) => {
        console.log(values)
    }

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

    //axios for upload file
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files', file);
        });
        setUploading(true); // You can use any AJAX library you like

        axios(uploadURL, {
            method: 'POST',
            data: formData,
        })
            .then((res) => {
                if (res.data === "NO PROBLEM") {
                    setFileList([]);
                    message.success('upload successfully.');
                    history.push("/")
                }

                alert(res.data)
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    return (
        <>
            <div style={{ padding: "5% 10%" }}>
                <FreelancerWrapper>
                    <FreelancerTitle>
                        Post Your Project
                    </FreelancerTitle>
                    <FreelancerSubtitle>
                        Describe the service you're looking to purchase - please be as detailed as possible:
                    </FreelancerSubtitle>
                    <Divider />
                    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name='introduction' label="Project Title" rules={[{ required: true, message: 'Please enter your project Title!' },]}>
                            <Input.TextArea style={{ height: 50 }} maxLength={55} placeholder="Please enter projet title" showCount />
                        </Form.Item>

                        <Form.Item name='description' label="Describe the project in detail:" rules={[{ required: true, message: 'Please dont leave this field empty !' },]}>
                            <Input.TextArea style={{ height: 100 }} maxLength={2000} placeholder="Please enter projecct detail" showCount />
                        </Form.Item>

                        <Form.Item label="Category" >
                            <Select style={{ width: "50%" }} placeholder="Select Category" rules={[{ required: true, message: 'Please select 1 category' },]}>
                                <Option>asdd</Option>
                                <Option>asdd</Option>
                                <Option>asdd</Option>
                            </Select>
                            <Select style={{ width: "50%" }} placeholder="Select SubCategory" disabled={true} rules={[{ required: true, message: 'Please select 1 sub category' },]}>
                                <Option>asdd</Option>
                                <Option>asdd</Option>
                                <Option>asdd</Option>
                            </Select>
                        </Form.Item>




                        <Form.Item name='Price' label="Budget" rules={[{ min: 1, max: 5, required: true, message: 'Please select at least Skill!' },]} >
                            <Input title="please enter number only" pattern="[0-9]+" placeholder="Enter at least 10$" maxLength={5} showCount />
                        </Form.Item>

                        <Form.Item name='day' label="Deliver in:" rules={[{ required: true, message: 'Please select at least Skill!' },]}>
                            <Slider marks={marks} max={30} />
                        </Form.Item>

                        <Form.Item name="file">
                            <Upload {...props1} style={{ marginRight: "20px" }}>
                                <Tooltip title="Upload maximum 7 files in any format">
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
                            <Button type="primary" htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </FreelancerWrapper>
            </div>

        </>
    )
}

export default ClientRequest;