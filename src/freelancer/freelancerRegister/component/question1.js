import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { Divider, Form, Input, Table, Steps, Space, Button, Modal, Select ,Progress} from 'antd';
import { FreelancerWrapper, FreelancerTitle, FreelancerSubtitle, FreelanncerLangTitle } from '../style'
import {  Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../../../api/index'
import { connect, useDispatch } from "react-redux"
import { actionCreators } from '../store/index'
import _ from 'lodash';
import { actionCreators as freeAction } from '../store'
import jwt_decode from "jwt-decode";
// ES6 Modules or TypeScript

// CommonJS
const jwt2 = localStorage.getItem("jwt")
const decode = jwt_decode(jwt2)


//loadash
const destroyAll = () => {
  Modal.destroyAll();
};

const { confirm } = Modal;
const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 2,
  }
};
const Question1 = (props) => {
  const history =useHistory()
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const [languageData, setLanguage] = useState([]);
  const [selectLang, setLang] = useState([]);
  const [realData, setReal] = useState([]);
  const [useSe, setUse] = useState([]);

  useEffect(() => {

    axios.get(apiURL + "/api/freelancerlanguage/" + decode.nameid)
      .then((res) => (setLanguage(res.data), dispatch(actionCreators.getLang(res.data))))


  }, [])

  useEffect(() => {


    axios.get(apiURL + "/api/language")
      .then((res) => (setLang(res.data), dispatch(actionCreators.getSelecctLang(res.data))))


  }, [])
  useEffect(() => {
    axios.get(apiURL + "/api/language/" + decode.nameid)
      .then((res) => (setReal(res.data), dispatch(actionCreators.getReal(res.data))))
      .catch((error) => { console.log(error) })
  }, [])

  //get fid
  useEffect(() => {
    axios.get(apiURL + "/api/freelancerlanguage/fid/" + decode.nameid).then((res) => (dispatch(actionCreators.getFtoken(res.data)), localStorage.setItem("fkey", res.data[0].freelancerID)))
  }, [])


  useEffect(() => {
    setUse(compareArray())
  }, [props.real])

//load
useEffect(()=>{
  axios.get(apiURL+"/api/freelancerlanguage/dd/"+decode.nameid).then((res)=>{dispatch(freeAction.getProgress(res.data))})

},[])

useEffect(()=>{
  axios.get(apiURL+"/api/freelancerform/"+decode.nameid).then((res)=>( dispatch(freeAction.getIntro(res.data))))
},[])


  const [isSending, setIsSending] = useState(false)
  const deleteLanguage = useCallback(async (key) => {

    // don't send again while we are sending
    if (isSending) return
    // // update state
    setIsSending(true)
    // // send the actual request
    await axios.delete(apiURL + "/api/freelancerlanguage/" + decode.nameid+ "/" + key)
      .then((() => {

        axios.get(apiURL + "/api/freelancerlanguage/" + decode.nameid)
          .then((res) => (setLanguage(res.data), dispatch(actionCreators.updateLang(res.data))))
        axios.get(apiURL + "/api/language/" + decode.nameid)
          .then((res) => (setReal(res.data), dispatch(actionCreators.getReal(res.data))))
      }))
    // // once the request is sent, update state again
    setIsSending(false)
  })

  const deleteConfirm = (freeID) => {
    confirm({
      title: 'Do you want to delete these items?',
      //   icon: <ExclamationCircleOutlined />,
      content: 'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        return new Promise((resolve, reject) => {
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          resolve(deleteLanguage(freeID));

        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() { },
    });
  };

  //have not done
  const compareArray = () => _(props.lang, 'languageID', 'languageName')
    .differenceWith(props.real, 'languageID', 'languageName', _.isEqual)
    .map(_.partial(_.pick, _, 'languageID', 'languageName'))
    .value()

  //  console.log(compareArray())

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const fid = localStorage.getItem('fkey')


    axios.post(apiURL + "/api/language/" + fid, values).then(

      (res) => (
        onReset,
        axios.get(apiURL + "/api/freelancerlanguage/" + decode.nameid)
          .then((res) => (setLanguage(res.data), dispatch(actionCreators.getLang(res.data))))

        , axios.get(apiURL + "/api/language/" + decode.nameid)
          .then((res) => (setReal(res.data), dispatch(actionCreators.getReal(res.data))))
      ))
      .finally(form.resetFields)


  };

  const onReset = () => {
    form.resetFields();
  };

  const showConfirm = () => {
    confirm({
      title: 'Do you Want to delete these items?',

      content: (
        <>
          <Form form={form} {...layout} name="control-hooks" initialValues={{ FreelancerID: props.ftoken[0].freelancerID }} onFinish={onFinish} >
            <Form.Item name="FreelancerID" >
              <Input hidden />

            </Form.Item>
            <Form.Item name="LanguageID" rules={[{ required: true, },]}>
              <Select placeholder="Select your best Language" allowClear >
                {
                  useSe.map((item) => {
                    return (
                      <>
                        <Option value={item.languageID} key={item.languageID
                        } > {item.languageName}  </Option>
                      </>
                    )
                  })

                }
              </Select>
            </Form.Item>
            <Form.Item name="LanguageLevel" rules={[{ required: true, },]}>

              <Select placeholder="Select level for the Language" allowClear>
                <Option value="Basic">Basic</Option>
                <Option value="Good">Good</Option>
                <Option value="Excellent">Excellent</Option>
                <Option value="Native">Native</Option>

              </Select>
            </Form.Item>

            <Form.Item >
              <Button onClick={destroyAll} type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </>
      ),

      onOk() {
        console.log('OK');
      },

      onCancel() {
        console.log('Cancel');
      },
    });
  };

  //desc
  const SubmitDes = (values) => {


    axios(apiURL + "/api/freelancerform/" + decode.nameid,
      {
        method: 'put',
        data: values

      })
      .then(() => (
        axios.get(apiURL + "/api/freelancerlanguage/dd/" + decode.nameid).then((res) => ( dispatch(freeAction.getProgress(res.data)) ))
        
        , history.push("/freelancerRegistertest/questionn2")

      ))
   
   

  }

  const columns = [
    {
      title: 'Language',
      width: "40%",
      dataIndex: 'languageName',
      key: 'freelancerLanguageID',

    },
    {
      title: 'Level',
      width: "30%",
      dataIndex: 'languageLevel',
      key: 'freelancerLanguageID',
    },
    {

      title: (props.languageList.length >= 4 ? null : <Button onClick={showConfirm} style={{ float: "right" }}>Add Record</Button>),
      width: "30%",
      key: 'freelancerLanguageID',
      render: (_, languageData) => (
        <Space size="middle">
          {/* <a onClick={(e)=>deleteLanguage(languageData.freelancerLanguageID)}>Delete</a> */}
          <a onClick={() => deleteConfirm(languageData.freelancerLanguageID)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>

         <Steps
                type="navigation"
                current={current}
                onChange={setCurrent}
                className="site-navigation-steps">
                <Steps.Step title={<Link to="/freelancerRegistertest/questionn1">Basic Information </Link>} />
                <Steps.Step title={"Professional Skill"} disabled  />
                <Steps.Step title={"Resume and Proposal"} disabled />
              
            </Steps>
            <div style={{padding:"5% 10%"}}>
            {/* props.progess.profileCompleteRate */}
        
    <FreelancerWrapper>
    <Progress percent={props.progess.profileCompleteRate} style={{float:'right',width:"200px",marginLeft:"5px"}} />
      <FreelancerTitle>
        Basic Information of freelancer
      </FreelancerTitle>
      <FreelancerSubtitle>
        Fill up your information
      </FreelancerSubtitle>
      <Divider />
   
      <FreelanncerLangTitle>
        Language (Optional)
      </FreelanncerLangTitle>
      <Table rowKey={languageData => languageData.freelancerLanguageID} style={{ border: '1px solid #e5e5e5' }} columns={columns} dataSource={props.languageList} pagination={false} />

      <Form {...layout} onFinish={SubmitDes} style={{marginTop:"20px"}}>
        <Form.Item label="Desciption:" name="Introduction" rules={[{ required: true, message: 'Please input your Description!' },]} >
          <TextArea name="Introduction" className="textareaStyle" showCount minLength="100" maxLength={500} style={{ padding: "5px", height: 200, width: "70%", float: "right" }} onChange={props.handleIntro} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ padding: "5px", float: "right",marginTop:"10px",width:"100px" }}>Continue</Button>
        </Form.Item>
      </Form>
    </FreelancerWrapper>
</div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    languageList: state.freelancerRegister.languageList,
    lang: state.freelancerRegister.lang,
    real: state.freelancerRegister.real,
    userSelect: state.freelancerRegister.userSelect,
    ftoken: state.freelancerRegister.ftoken,
    profileList: state.profile.profileList,
    introduction: state.freelancerRegister.introduction,
    current:state.freelancerRegister.current,
    token:state.login.token,
    progess:state.freelancerRegister.progress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ClickUP(val) {
      dispatch(actionCreators.userSelect(val))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Question1);