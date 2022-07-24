export function setLoginState(data){
    console.log('setLoginState',data)
    return(dispatch,getState)=>{
        dispatch({type:'SET_LOGIN_STATE',data:data})
    }
}