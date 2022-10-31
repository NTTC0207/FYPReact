import React from "react";
import {ListItem,ListInfo,TopicWrapper} from '../style'
import {connect} from 'react-redux'
import pic from '../../../statics/listpic.png'
import {Link} from 'react-router-dom'

class List extends React.Component {
    render() {
        return (

            <div>
                {
                    this.props.articleList.map((item,index) =>{
                        return (   
                            <Link key={index} to={'/detail/' +item.id}  > 
                        <ListItem key={item.id}>
                            <img className="listPic" src={pic} alt="article" />
                            <ListInfo>
                            <h3 className="title">{item.title}</h3>
                            <p className="desc">{item.desc}</p>
                            </ListInfo>
                        </ListItem>
                        </Link>     )
                    })
                }
   
           </div>
          
        )
    }
}

const mapStateToProps=(state) => {
    return {
    articleList :state.home.articleList

    }
}

const mapDispatchToProps=(dispatch) => {
    return {


    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List)