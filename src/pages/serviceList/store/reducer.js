
import * as actionTypes from './actionTypes'

const defaultState = {
serviceList:[]

}

export default (state = defaultState, action) => {
   const newState = JSON.parse(JSON.stringify(state))
  
   if(action.type === actionTypes.GETSERVICELIST){
      newState.serviceList = action.data
      return newState
   }


   return state;

}