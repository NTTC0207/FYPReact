import styled from "styled-components"
import BannerPic from "../../statics/banner.png"


export const HomeWrapper =styled.div`
overflow:hidden;
width:100%;
margin: 0 auto;



`
export const HomeLeft =styled.div`
width:625px;
margin-left:15px;
margin-top:30px;
float:left;

.banner{
    background:url(${BannerPic});
    width:625px;
    height:270px;
    background-repeat:no-repeat;
    background-size:contain;
}


`
export const HomeRight =styled.div`
width:280px;
float:right;


`

export const TopicWrapper = styled.div`
padding: 20px 0 10px 0;
overflow:hidden;
margin-left:-10px;
border-bottom: 1px solid #dcdcdc;
`
export const TopicItem =styled.div`
float:left;
background:#f7f7f7;
height:32px;
margin-left:18px;
padding-right:10px;
margin-bottom:18px;
line-height:32px;
font-size:14px;
color:#000;
border:1px solid #dcdcdc;
border-radius:4px;


.item-pic{
    margin-right:10px;
    height:32px;
    width:32px;
    display:block;
    float:left;

}

`

export const ListItem =styled.div`
padding:20px 0;
border-bottom: 1px solid #dcdcdc;
overflow:hidden;

.listPic{
    width:125px;
    height:100px;
    display:block;
    float:right;
  border-radius:10px;
}

`
export const ListInfo =styled.div`

width:500px;
float:left;
.title{
    font-size:18px;
    line-height:27px;
    font-weight:bold;
    color:#333;
}
.desc{
    font-size:13px;
    line-height:24px;
    color:#999;

}

`
export const RecommendWrapper = styled.div`
margin:30px 0;
width:280px;


`
export const RecommendItem = styled.div`
width:280px;
height:50px;
background-size:contain;


`
export const LoadMore =styled.div`
width:100%;
height:40px;
line-height:40px;
background:#a5a5a5;
text-align:center;
border-radius:20px;
color:#fff;
cursor:pointer;
`

export const BackTop = styled.div`
position:fixed;
right:100px;
bottom:100px;
width:60px;
height:60px;
line-height:60px;
text-align:center;
border:1px solid black;

&.backtop{
    transition:all 0.2s ease-in-out;
}

`

//Hero

export const HeroWrapper = styled.div`
position:relative;
backgrounnd-color:#2b3247;
background-repeat:no-repeat;
background-size:cover;
background-position:center;
background-image:url(https://res.cloudinary.com/gurucom/image/upload/w_1000,ar_16:9,c_fill,g_auto/static/homepage/banner.svg);
height:70vh;

`

export const HeroTitleWrapper =styled.div`
display:flex;
align-items:center;
position:absolute;
width:63%;
margin-left:10%;
Top:30%;
`

export const HeroTitle = styled.div`
color: #fff;
line-height:1.2;
font-size:3rem;
.subTitle{
font-size:1.15rem;
line-height:1.15;
margin-top:10px;
width:63%;
}
`
export const HeroSubtitle = styled.div`
color:#fff;

`

export const HeroSearch = styled.div`
position:absolute;
top:69%;
left:10%;
.ant-input{
height:60px;
width:400px;
}
.ant-input:focus{
    outline: 0;
    border:0;
    box-shadow: none;
    border-bottom: none;
}
.ant-input-search-button{
height:60px;
border:none;

}
`

export const HeroButton= styled.div`
position:absolute;
top:69%; 
left:40%;
.ant-btn{
    height:60px;
    width:200px;
}

`

export const HeroFigure= styled.div`
position:absolute;
right:0;
width:30%;
bottom:0;
top:0;
background-size:cover;
background-repeat:no-repeat;
background-image: url(https://res.cloudinary.com/gurucom/image/upload/w_450,f_auto/static/homepage/bannerguy.png)

`

//Slick Slider 

export const  Slide = styled.div`
width:100%;
margin-top:40px;

`

export const  SliderWrapper = styled.div`
display:flex;
justify-content:center;
`
export const SliderTitle= styled.div`
font-size:32px;
margin-left:233px;
margin-bottom:10px;
font-weight:700;
`
export const SliderName= styled.div`
position:absolute;
font-size:24px;
font-weight:700;
padding:16px;

`

