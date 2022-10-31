import axios from 'axios';
import  * as actionTypes from './actionTypes'
import {apiURL} from '../../../api'



const changeHomeData =(result)=>({
    type: actionTypes.CHANGE_HOME_DATA,
    topicList:result.TopicList,
    articleList:result.articleList
})

export const getHomeInfo =()=>{
return(dispatch)=>{
    axios.get('/api/home.json')
    .then((res)=>{
     const result =res.data.data

     const action = changeHomeData(result);
     
     dispatch(action);
    })
    .catch(()=>{alert("error");})
    
}
}


export const getSlick =(data)=>({
    type:actionTypes.GETSLICK,
    data
})
    
