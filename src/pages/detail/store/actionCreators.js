import axios from 'axios';
import {actionTypes} from './index'

const changeDetail=(title,content) => ({
    type:actionTypes.CHANGE_DETAIL,
    title:title,
    content:content
})

export const getDetail =(id) =>{
    return(dispatch) =>{
        axios.get('/api/detail.json?id=' +id)
        .then((res)=>{
       const result = res.data.data;
        
        dispatch(changeDetail(result.title, result.content));
        })
        .catch(()=>{alert("failed")})
    }
} 