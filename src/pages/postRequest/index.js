import React from "react";
import {FreelancerWrapper, FreelancerTitle, FreelancerSubtitle, FreelanncerLangTitle} from '../../freelancer/freelancerRegister/style'
import { Form ,Input,Button,Select,Row,Col} from "antd";

const {Option} =Select


const ClientRequest = ()=>{
    const onFinish=(values)=>{
console.log(values)
    }
return(
    <>
<div style={{padding:"5% 10%"}}>
    <FreelancerWrapper>
   <Form onFinish={onFinish}>

    <Form.Item label="Title" name="title"  rules={[ {  required: true, message: 'Please input your username!', },  ]}>
        <Input.TextArea showCount  maxLength={80} placeholder="Input your title" />
    </Form.Item>
<Row>
    <Col span={12}>
    <Form.Item > 
<Select placeholder="Select Category">
    <Option>1</Option>
    <Option>2</Option>
</Select>
    </Form.Item>
    </Col>

    <Col span={12}>
    <Form.Item> 
<Select placeholder="Select SubCategory">
    <Option>1</Option>
    <Option>2</Option>
</Select>
    </Form.Item>
    </Col>
    </Row>

   <Form.Item>
    <Button htmlType="submit">Submit</Button>
   </Form.Item>
   </Form>
    </FreelancerWrapper>
    </div>

    </>
)
}

export default ClientRequest;