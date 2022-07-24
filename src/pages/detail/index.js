import React from "react";
import {DetailWrapper,Header,Content} from './style'
import {connect} from 'react-redux'
import {actionCreators } from './store'
import {withRouter} from 'react-router-dom'
 


class Detail extends React.Component {
    render() {
       
      console.log(this.props)
        return (
          <DetailWrapper>
         <Header>{this.props.title}  </Header>

        <Content dangerouslySetInnerHTML={{__html: this.props.content}}>

        </Content>

          </DetailWrapper>
        )
    }
    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
}

const mapStateToProps =(state) => {
    return{
title: state.getIn(['detail','title']),
content:state.getIn(['detail','content'])
    }
}
const mapDispatchToProps=(dispatch) => {
    return {
   getDetail(id){
    dispatch(actionCreators.getDetail(id))
   }

    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withRouter(Detail))