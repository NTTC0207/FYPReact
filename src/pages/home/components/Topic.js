import React from "react";
import {TopicWrapper,TopicItem} from '../style'
import {connect} from 'react-redux'

class Topic extends React.Component {
    render() {
        return (
            <TopicWrapper>
                {
                    this.props.topicList.map((item) => {
                        return(
                         
                        <TopicItem key={item.id}>
                      
                        <img className="item-pic" src={item.imgUrl} alt="" />
                        {item.title}
                      </TopicItem>
                        )
                      })
                }


            </TopicWrapper>
        )
    }
}


const mapStateToProps=(state) => {
    return{
        topicList:state.home.topicList,
    //  topicList: state.getIn(['home','topicList'])
    }
}

const mapDispatchToProps=(dispatch) => {
    return {}
}

export default connect(mapStateToProps,mapDispatchToProps) (Topic)