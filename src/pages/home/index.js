import React from "react";
import {HomeWrapper,HomeLeft,HomeRight} from './style'
import Topic from './components/Topic'
import Recommend from './components/Recommend'
import List from './components/List'
import Landing from './components/Landing'
import SlickSlider from "./components/SlickSlider";
import {actionCreators} from './store'
import {connect} from 'react-redux'
import Carousel1 from './components/Carousel'

class Home extends React.Component {

    render() {
        return (
          <HomeWrapper>
            <Landing/>
            <SlickSlider />
            {/* <Carousel1 /> */}
         {/* <HomeLeft >
             <img className="banner"></img>
             
             <Carousel1 />
             
             <Topic/>
             <List/>
             </HomeLeft>
         <HomeRight>
         <Recommend/>
        
         </HomeRight> */}

          </HomeWrapper>
        )
    }
    componentDidMount() {
this.props.changeHomeData();

    }
}

const mapStateToProps=(state) => {
   return {

   }
}
const mapDispatchToProps=(dispatch) =>{
    return{
   changeHomeData(){
   const action =actionCreators.getHomeInfo();
   dispatch(action) 
   }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)