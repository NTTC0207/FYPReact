import React, { useState, useEffect } from "react";
import { Col, Row, Input, Avatar, List, Space, Carousel, Image, Tooltip, Select, Form, Button, Collapse } from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ListWrapper } from './style'
import { connect, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { actionCreators } from './store/index'
import axios from "axios"
import { apiURL } from '../../api/index'
import ReactPlayer from 'react-player'

const { Panel } = Collapse;
const { Option } = Select;
const { Search } = Input;
const ListStyle = {
  background: "#fff",
  margin: "20px 0"
}




const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const getFormat = (val) => {
  return val.slice(-3)
}
const sliceTitle = (val) => {
  return val.slice(0, 20)
}

const ServiceList = (props) => {
  const dispatch = useDispatch();







  useEffect(() => {

    axios({
      method: 'GET',
      url: apiURL + "/api/sellservicepublic"
    })
      .then((res) => (console.log(res.data), dispatch(actionCreators.getList(res.data))))

  }, [])


  const onSearch = (val) => {
    axios({
      method: 'GET',
      url: apiURL + "/api/sellservicepublic?serviceTitle=" + val
    })
      .then((res) => {
        dispatch(actionCreators.getList(res.data))
      })
  }

  const FilterPrice = (val) => {

    console.log(val)
    axios({
      method: 'GET',
      url: apiURL + "/api/sellservicepublic?minPrice=" + val.Price + "&maxPrice=" + val.qwe
    })
      .then((res) => { dispatch(actionCreators.getList(res.data)) })
  }


  return (
    <ListWrapper>

      <div style={{ padding: "0 10%" }}>
        <Row justify="space-around">
          <Col span={6} style={{ padding: "3% 0" }}>
            <Collapse  >
              <Panel header="Budget" key="1">
                <div style={{ background: "white", padding: "10px" }} >
                  <Form onFinish={FilterPrice}>
                    <Form.Item name="Price" label="min" rules={[{ required: true, message: 'Please input minimum value!', },]}>
                      <Input title="please enter number only" pattern="[0-9]+" />
                    </Form.Item>
                    <Form.Item name="qwe" label="max" rules={[{ required: true, message: 'Please input maximum value!', },]}>
                      <Input title="please enter number only" pattern="[0-9]+" />
                    </Form.Item>

                    <Button style={{ marginTop: "10px" }} type="primary" htmlType="submit">
                      Submit
                    </Button>


                  </Form>

                </div>
              </Panel>
              <Panel header="Local Seller" key="2">
                <p>e</p>
              </Panel>
              <Panel header="Delivery In?" key="3">
                <p>e</p>
              </Panel>
            </Collapse>



          </Col>

          <Col span={16} style={{ padding: "3% 0" }}>

            <Search allowClear onSearch={onSearch} placeholder="Freelancer Filter" />


            <List
              //   style={{marginTop:"20px"}}
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={props.serviceList}
              footer={
                <div>
                  <b>{props.serviceList.length}</b> results found
                </div>
              }
              renderItem={(item) => (
                <List.Item
                  style={ListStyle}
                  key={item.title}
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]}
                  extra={

                    <>
                      <Tooltip title="Click to view more pictures">
                        {
                          getFormat(item.serviceUrl) === "mp4" ? <ReactPlayer height={168} width={272} url={`${apiURL}${item.serviceUrl}`} controls /> : <Image width={272} src={`${apiURL}${item.serviceUrl}`} />
                        }


                      </Tooltip>
                    </>
                  }
                >
                  <List.Item.Meta

                    avatar={<Avatar src={`${apiURL}${item.userImageSrc}`} />}
                    title={<> <Link key={item.serviceID} to={'/serviceDetail/' + item.serviceID} > {sliceTitle(item.serviceTitle) + "..."}</Link><span style={{ position: "absolute", left: "55%" }}>{item.servicePrice + "$"}</span> </>}
                    description={<div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: item.serviceDesc + "..." }} ></div>}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </ListWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    serviceList: state.service.serviceList
  }
}

export default connect(mapStateToProps, null)(ServiceList);
