
import * as actionTypes from './actionTypes'

const defaultState = {
profileList:[],
profileImage:[],
selectedFile:[],
checkImage:false,
online:false,
freeProfileList:[]

}

export default (state = defaultState, action) => {
   const newState = JSON.parse(JSON.stringify(state))
  
   if(action.type === actionTypes.GETPROFILELIST){
      newState.profileList =action.data
      return newState
   }
   if(action.type === actionTypes.GETPROFILEIMAGE){
      newState.profileImage =action.image
      return newState
   }
   if(action.type === actionTypes.GETINPUTFILE){
      newState.selectedFile =action.val

      return newState
   }
  if(action.type === actionTypes.GETCHECKIMAGE){
   newState.checkImage = action.value
   return newState
  }
  if(action.type === actionTypes.FRELANCERDATA){
   newState.freeProfileList =action.data
   return newState;
  }
 

   return state;

}