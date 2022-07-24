import {combineReducers} from 'redux'
import defaultState from './actionTypes'

const loginState =(satte =defaultState.loginState ,action)=>{
    switch(action.type){
        case 'SET_LOGIN_STATE':
            return action.data;
            default:
                return state
    }
}


export default combineReducers({
    loginState
})