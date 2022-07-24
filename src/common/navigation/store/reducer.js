import * as actionTypes from './actionTypes'


const defaultState = {

    focused :false,
    // list:[]
   }
   
   export default (state=defaultState ,action) =>{

    if(action.type === actionTypes.SEARCH_FOCUS){
      const newState = JSON.parse(JSON.stringify(state))
      newState.focused = true;
      return newState;
    }
    if(action.type === actionTypes.SEARCH_BLUR){
      const newState = JSON.parse(JSON.stringify(state))
      newState.focused = false;
      return newState;
    }
 


    // switch (action.type) {
    //     case actionTypes.SEARCH_FOCUS:
    //   return state.set('focused',true)
    //   case actionTypes.SEARCH_BLUR:
    //   return state.set('focused',false)
    //   case actionTypes.CHANGE_LIST:
    //   return state.set('list',action.data)
 
    //   default: 
    //   return state;
    // }
   
     return state;
   }