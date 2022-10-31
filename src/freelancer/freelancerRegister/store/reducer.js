import * as actionTypes from './actionTypes'


const defaultState = {
languageList:[],
lang:[],
real:[],
userSelect:[],
ftoken:[],
progress:[],
introduction:[],
uploadProposal:[],
html:""

   }
   
   export default (state=defaultState ,action) =>{
    const newState = JSON.parse(JSON.stringify(state))
  if(action.type === actionTypes.GETLANG){
    newState.languageList= action.data
    return newState
  }
  if(action.type === actionTypes.UPDATELANG){
    newState.languageList= action.data
    return newState
  }
  if(action.type=== actionTypes.SELECTLANG){
    newState.lang=action.data
    return newState;
  }
  if(action.type=== actionTypes.SELECTREAL){
    newState.real=action.data
    return newState;
  }
  if(action.type=== actionTypes.USERSELECT){
    newState.userSelect =action.data
    return newState;
  }
  if(action.type=== actionTypes.FTOKEN){
    newState.ftoken =action.data
    return newState;
  }
  if(action.type=== actionTypes.PROGRESS){
    newState.progress =action.data
    return newState;
  }
  if(action.type=== actionTypes.INTRO){
    newState.introduction =action.data
    return newState;
  }
  if(action.type=== actionTypes.PROPOSAL){
    newState.uploadProposal =action.data
    return newState;
  }
  if(action.type=== actionTypes.GETHTML){
    newState.html = action.data
    return newState
  }

     return state;
   }