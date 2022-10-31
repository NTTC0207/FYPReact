import styled from "styled-components"
import LoginPic from '../../statics/Login.jpg'
import work from '../../statics/work.jpg'

export const LoginWrapper = styled.div`
z-index:0;
position:absolute;
left:0;
right:0;
bottom:0;
top:56px;
background:#eee;

`
export const LoginBox =styled.div`
width:400px;
height:180px; 
margin:100px auto;
background:#fff;
box-shadow:0 0 8px rgba(0, 0, 0, 0.1);
padding-top:20px;

`
export const Input =styled.input`
display:block;
width:200px;
height:30px;
line-height:30px;
padding:0 10px;
color:#777;
margin:10px auto;

`

export const Button=styled.div`
width:220px;
height:30px;
line-height:30px;
color:#fff;
background:#3194d0;
border-radius:15px;
margin:10px auto;
text-align:center;

`


export const FormWrapper= styled.div `

margin-bottom: 100px;
.ant-input {
    width: 85%;
background-color: transparent;
border: none;
color: white;
outline: none;
border-bottom: 1px solid #445366;
font-size: 1em;
font-weight: 300;
padding-bottom: 10px;
margin-top: 10px;
padding:0px;
}
.ant-input:focus{
    outline: 0;
    border:0;
    box-shadow: none;
    border-bottom: 1px solid #445366;
}

.ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input{
    background-color: transparent;
    box-shadow: none;
}



`

export const Form1 =styled.form `

`

export const FormField =styled.div `

`

export const FormFieldLabel =styled.label `
display: block;
text-transform: uppercase;
font-size: 0.3em;
color: white;
`

export const FormFieldInput =styled.input`
width: 85%;
background-color: transparent;
border: none;
color: white;
outline: none;
border-bottom: 1px solid #445366;
font-size: 1em;
font-weight: 300;
padding-bottom: 10px;
margin-top: 10px;
`

export const FormFieldCheckBoxLabel =styled.label`
color: #646f7d;
font-size: 0.9em;
`
export const FormFieldCheckbox =styled.input`
position: relative;
top: 1.5px;
`
export const FormFieldTermsLink =styled.a`
color: white;
border-bottom: 1px solid #6b5b95;
text-decoration: none;
display: inline-block;
padding-bottom: 2px;
margin-left: 5px;
`
export const FormFieldButton =styled.button`
background-color: #1890ff;
color: white;
border: none;
outline: none;
border-radius: 25px;
padding: 15px 70px;
font-size: 0.8em;
font-weight: 500;
cursor:pointer;
`
export const SocialMediaButtons= styled.div`
padding: 10px 100px 10px 0px;
`
export const FacebookButton=styled.div`

`

export const InstagramButton=styled.div`

`

export const AppWrapper=styled.div`
height: 100vh;
display: flex;
color: white;
`
export const AppAside =styled.div`
width: 50%;
background: url(${work});
background-size:cover;
opacity:1;
`
export const AppForm =styled.div`
width: 50%;
background-color: #12130f;
padding: 25px 40px;
overflow: auto;
`

export const PageSwitcher =styled.div`
display: flex;
justify-content: flex-end;
margin-bottom: 10%;
`
export const FormTitle =styled.div`
color: #707c8b;
font-weight: 300;
margin-bottom: 50px;
`
