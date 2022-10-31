import  * as actionTypes from './actionTypes'


const defaultState = {
 topicList:[],
 articleList:[],
 slickList:[]

   }
   
   export default (state=defaultState ,action) =>{

      if(action.type === actionTypes.CHANGE_HOME_DATA){
   const newState = JSON.parse(JSON.stringify(state));
    newState.topicList =action.topicList
    return newState
      }
      
      if(action.type === actionTypes.CHANGE_HOME_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.articleList =action.articleList
        return newState
      }
      if(action.type === actionTypes.GETSLICK){
        const newState = JSON.parse(JSON.stringify(state));
        newState.slickList =action.data
        return newState
      }

  
// if(action.type === actionTypes.CHANGE_HOME_DATA){
//    return state.merge({
//       topicList:fromJS(action.topicList),
//       articleList:fromJS(action.articleList)
//    })
// }

  return state;
   
     
   }