import React,{Fragment} from 'react';
import { Carousel } from 'antd';

import Picture1 from '../../../statics/singing.jpg'
import Picture2 from '../../../statics/code.jpg'
import Picture3 from '../../../statics/writing.jpg'
import Picture4 from '../../../statics/people.jpg'
const contentStyle = {
    height: '270px',
    
  
    background: '#364d79',
  };
  const  carouselStyle={
height:"270px"


  }
  const carouselImage={
    objectFit: "cover",
    height:"270px",
    width: "625px"
  
  }

  
class Carousel1 extends React.Component {
    render() {
        return(
            <Fragment>
                <Carousel autoplay className={carouselStyle}>
                  
    {/* <div>
    <img  style={carouselImage} src={Picture1} />
    
    </div>
    <div>
    <img style={carouselImage} src={Picture2} />
     
    </div>
    <div>
    <img style={carouselImage} src={Picture3} />
    
    </div>
    <div>
    <img style={carouselImage} src={Picture4} />
     
    </div> */}
  </Carousel>
            </Fragment>
        )
    }
}

export default Carousel1;