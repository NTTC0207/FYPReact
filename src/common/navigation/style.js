import styled from 'styled-components';


export const HeaderWrapper = styled.div`

position:relative;
width:100%;
height:63px;
border-bottom:1px solid #f0f0f0

`


export const Logo = styled.div`


font-size:40px;
float: left;
width: 120px;
height: 31px;
background: rgba(255, 255, 255, 0.3);

`


export const SearchWrapper= styled.div`

position:relative;
wifth:100%;
top:0;
height:56px;


.iconfont{
    position:absolute;
    margin-left:-29px;
   margin-top:2px;
   
    font-size:20px;
    width:30px;
    top:11px;
    padding:4.2px 0;
    line-height:30px;
  
    text-align:center;
    &.focused{
        background:#777;
        color:#fff
    }
}


`

export const NavSearch =styled.input`
width:200px;
height:38px;
padding: 0 35px 0 20px;
margin-top:9px;
border:none;
outline:none;
border-radius:3px;
background:#eee;
padding:0 20px;
box-sizing:border-box;
color:#666;
font-size:14px;
margin-left:20px;
&.slide-enter{
    transition:all .2s ease-out; 
    }
    &.slide-enter-active{
    width:500px;
    }
    &.slide-exit{
        transition:all .2s ease-out; 
    }

&::placeholder{
    color:#999;
}

&.focused{
    width:500px;
}


`

export const SearchInfo =styled.div`
position:absolute;
left:0;
top:56px;
width:240px;
padding: 0 20px;
box-shadow: 0 0 8px rgba(0,0,0,.2);
background:white;


`
export const SearchInfoTitle =styled.div`
margin-top:20px;
margin-bottom:15px;
line-height:20px;
font-size:14px;
color:#969696;


`
export const SearchInfoSwitch = styled.span`
float:right;
font-size:13px;
cursor:pointer;

`
export const SearchInfoItem =styled.div`
float:left;
display:block;
font-size:12px;
padding:0 5px;
line-height:20px;
border:1px solid #ddd;
color: #787878;
border-radius:3px;
margin-right:10px;
margin-bottom:10px;

`
export const SearchInfoList = styled.div`
overflow:hidden;
`



export const Addition =styled.div`
position:absolute;
right:0;
top:0;
height:56px;


`
export const Button = styled.div`

float:right;
line-height:38px;
border-radius:19px;
margin-top:9px;
border:1px solid #ec6149;
margin-right:20px;
padding:0 20px;
font-size:14px;
&.reg{
    color:#ec6149;
}
&.writing{
    color:#fff;
    background:#ec6149;
}
`


export const SignIn = styled.div`
color:#1890ff;
float:right;
line-height:38px;
font-weight:600;
text-decoration:none;
margin-top:12px;
cursor:pointer;
white-space:nowrap;
margin-right:20px;
padding:0 20px;
font-size:17px;
border:1px solid #1890ff;
border-radius:5%;

:hover{
    color:white;
    background:#1890ff;
}

`

export const LogIn = styled.div`

float:right;
line-height:38px;
font-weight:600;
text-decoration:none;
margin-top:12px;
cursor:pointer;
white-space:nowrap;

padding:0 20px;
font-size:17px;

:hover{
    color:#1890ff;
}

`


export const Aa = styled.div`

float:right;
line-height:38px;
font-weight:600;
text-decoration:none;
margin-top:12px;
cursor:pointer;
white-space:nowrap;

padding:0 20px;
font-size:17px;

:hover{
    color:#1890ff;
}

`

export const MenuWrapper = styled.div`

position:relative;
width:100%;
height:63px;
border-bottom:1px solid #f0f0f0

`


