import styled from "styled-components"


//top component 

export const ProfileWrapper = styled.div`  

`
export const PRequest = styled.div`  
.ant-modal-confirm .ant-modal-confirm-btns{
    display:none !important;
}
`


//sub component
export const UserCard= styled.div`
position: relative;
background-color: #fff;
border: 1px solid #dadbdd;
padding: 30px;
font-size: 14px;
line-height: 130%;
width:400px;
`
export const UserProfileInfo= styled.div`


`

export const UserProfileImage= styled.div`
justify-content:center;
display:flex;



`

export const UserProfileName= styled.div`
justify-content:center;
display:flex;
margin-top:15px;
.username{
    font-size: 20px;
    font-weight: 700;
    color: #222325;
    text-align: center;
    display: block;
    padding-bottom: 10px;
}

`
export const ProfileLabelWrapper= styled.div`
display:flex;
justify-content:left;
width:100%;
margin-bottom:15px;
`
export const ProfileLabelWrapperAdjust= styled.div`
margin-left:70px;
width:100%;
`

export const ProfileLabel= styled.div`
width:50%;
float:left;
font-weight:bold

`

export const ProfileLabelName= styled.div`

font-size: 14px;
line-height: 130%;
font-weight:bold

`