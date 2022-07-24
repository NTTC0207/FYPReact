import * as actionTypes from './actionTypes'
import axios from 'axios'
import {fromJS} from 'immutable';
import jwt_decode from "jwt-decode";
import {apiURL} from '../../../api/index'

export const searchFocus =()=>({
    type: actionTypes.SEARCH_FOCUS
})


export const searchBlur =() =>({
    type:actionTypes.SEARCH_BLUR
})



export const getList =() =>{ // use redux thunk so can return a function
  return (dispatch)=>{

   axios.get('/api/headerList.json')
   .then((res)=>{

const data= res.data.data;
const action ={
    type: actionTypes.CHANGE_LIST,
    data: fromJS(data)
}
dispatch(action)

   })
   .catch(()=>{alert('Error')})

  }
}






export const getLang =()=>({
    
})