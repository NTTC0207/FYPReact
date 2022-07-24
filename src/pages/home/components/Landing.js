import React from 'react';
import {HeroWrapper, HeroTitle,HeroSubtitle, HeroTitleWrapper,HeroSearch,HeroButton,HeroFigure } from '../style';
import { Input,Button } from 'antd';


const { Search } = Input;

const Landing=() =>{
return(
    <HeroWrapper>

 <HeroTitleWrapper>
    <HeroTitle>
        Find and Hire
  <br/>
  Expert Freelancer
  <br/>
<HeroSubtitle className="subTitle"> Work with the best freelance talent from around the world on our secure,
 flexible and cost-effective platform.
 What skill are you looking for?
 </HeroSubtitle>

    </HeroTitle>


 </HeroTitleWrapper>

<HeroSearch>
<Search placeholder="What Service you are looking for?" style={{width:"200px"}}/> 

</HeroSearch>

<HeroButton> 
<Button type="primary" >Post a Job</Button>
</HeroButton>


<HeroFigure>

</HeroFigure>

    </HeroWrapper>
)
}

export default Landing;