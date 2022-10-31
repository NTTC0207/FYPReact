import React from "react"; 
import { Link, Redirect,withRouter} from "react-router-dom";
import { FormWrapper, FormField, FormFieldLabel, FormFieldButton, SocialMediaButtons, FacebookButton, InstagramButton } from "../style"
import { FacebookLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import { Form, Input } from 'antd';
import Loading from 'react-fullscreen-loading';
import { AppWrapper, AppAside, AppForm,  FormTitle } from '../style'



const formTitleLink={
  color: '#707c8b',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '1.7em',
  margin: '0 10px',
  paddingBottom: '5px',
}

class SignInForm extends React.Component {
  render() {
    if(!this.props.login){
    return (
      <AppWrapper>
          <AppAside ></AppAside>
          <AppForm>
          <FormTitle>
            <Link exact='true'  to="/signIn" activeclassname="formTitleLink-active" style={formTitleLink}>Sign In</Link>
            {" "}or{" "}
              <Link exact='true' to="/signUp" activeclassname="formTitleLink-active" style={formTitleLink}>Sign Up</Link>
            </FormTitle>
      <FormWrapper>
      <Form name="login" onFinish={this.props.handleLogin}>

        <FormField>
          <FormFieldLabel>E-Mail Address</FormFieldLabel>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input type="email" id="email" placeholder="Enter your email" name="email" value={this.props.signInEmail} onChange={this.props.handleEmailChange} />
          </Form.Item>
        </FormField>

        <FormField>
          <FormFieldLabel >Password</FormFieldLabel>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input type="password" id="password" placeholder="Enter your password" name="password" value={this.props.signInPassword} onChange={this.props.handlePasswordChange} />
          </Form.Item>
        </FormField>

        <FormFieldButton >Login</FormFieldButton>
        <Link to="/signUp" className="formFieldLink">
         <span style={{marginLeft:"5px"}}>Create an account</span> 
        </Link>


        <br />
        <SocialMediaButtons>
          <FacebookButton>
            <FacebookLoginButton onClick={() => alert("Hello")} />
          </FacebookButton>
          <InstagramButton>
            <InstagramLoginButton onClick={() => alert("Hello")} />
          </InstagramButton>
        </SocialMediaButtons>
      </Form>

      <Loading loading={this.props.loader} background="transparent" loaderColor="#3498db" />
     
    </FormWrapper>
    </AppForm>
    </AppWrapper>
    )
    }
    else{
      return <Redirect to="/" />
    }
  }
}




const mapStateToProps = (state) => {
  return {
    signUpEmail: state.login.signUpEmail,
    signUpPassword: state.login.signUpPassword,
    loader: state.login.loader,
    login:state.login.login
 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleEmailChange(e) {
      dispatch(actionCreators.getEmail(e.target.value))
    },
    handlePasswordChange(e) {
      dispatch(actionCreators.getPassword(e.target.value))
    },
    handleLogin(values) {

      const login = {
        Email: values.email,
        Password: values.password
      }
       

      dispatch(actionCreators.getLoader())
      dispatch(actionCreators.userLogin(login))


    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInForm));
