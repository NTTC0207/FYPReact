import React, { Fragment,useState,useEffect} from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "../../../scss/main.scss"
import "slick-carousel/slick/slick-theme.css";
import {SliderWrapper, SliderTitle,Slide,SliderName} from '../style'
import {apiURL} from '../../../api/index'
import axios from 'axios'
import {connect} from 'react-redux'
import {Skeleton} from 'antd'
import * as actionCreators from '../store/actionCreators'

const skeletonSize={
  width:"239px",
  height:"345px",
  marginRight:"23px",

}


const skeletonClass=()=>{
  return(
    <div >
<Skeleton.Button  style={skeletonSize} active  />
<Skeleton.Button  style={skeletonSize} active  />
<Skeleton.Button  style={skeletonSize} active  />
<Skeleton.Button  style={skeletonSize} active  />
</div>
  )
}




const SlickSlider =(props)=>{
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div   {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div  {...props} />
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft  />,
    nextArrow: <SlickArrowRight  />,
  };

  //React Hook

  const [data,setCategory] =useState([])
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    (async()=>{
    try{
    axios.get( apiURL+"/api/category" ).then((res)=>{
      setCategory(res.data) 
    if(res.status===200){
         setLoading(false)
    }
    })
    
    
    }
    catch(error){
    console.log(error)
    }
    finally{
   
    }

    })()
    },[])

  return(
    <Slide>
    <SliderTitle>
     Popular professional services
     </SliderTitle>
 <SliderWrapper>

    {
      loading  ?   skeletonClass() : <Slider  {...settings} className="card__container--inner">
      
      {
       data.map((item)=>{
         return(
           <div
            key={item.categoryID}
           className="card__container--inner--card">
            
            <SliderName>
          {item.categoryName}
            </SliderName>
           
   
             <img  src={`${apiURL}${item.categorySrc}`} alt="hero_img" />
           
         
           </div>
         )
       })
      }
   
    
   
      </Slider>
    }
  
      
    
    



  </SliderWrapper>
  </Slide>
  )
}



export default SlickSlider