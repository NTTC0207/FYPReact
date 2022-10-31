import  * as actionTypes from './actionTypes'


const defaultState = {
   //common
   loader: false,
  
   //login
   login: false,
   signInEmail: "",
   signInPassword: "",
   redirectHome:false,
   role:"",
 
   //SignUP
   country: [],
   signUpUsername: "",
   signUpEmail: "",
   signUpPassword: "",
   signUpConfirmPassword: "",
   signUpEye: false,
   signUpEyeC: false,
   passwordAlert: false,
   registerCheckbox: false,


}

export default (state = defaultState, action) => {
   const newState = JSON.parse(JSON.stringify(state))
   if (action.type === actionTypes.CHANGE_LOGIN) {
      newState.login = action.value
      return newState
   }

   // if (action.type === actionTypes.LOGOUT) {
   //    newState.login = action.value
 
   //    return newState
   // }

   if(action.type === actionTypes.CountryList){
      newState.country = action.data
      return newState
   }
   if(action.type === actionTypes.TOKENSTORE){
      newState.role = action.data
      return newState
   }

   if (action.type === actionTypes.SIGNINEMAIL) {
      newState.signInEmail = action.data
      return newState
   }

   if (action.type === actionTypes.SIGNINPASSWORD) {
      newState.signInPassword = action.data
      return newState
   }

   if (action.type === actionTypes.SIGNUPEMAIL) {
      newState.signUpEmail = action.data
      return newState
   }

   if (action.type === actionTypes.SIGNUPPASSWORD) {
      newState.signUpPassword = action.data
      return newState
   }

   if (action.type === actionTypes.SIGNUPUSERNAME) {
      newState.signUpUsername = action.data
      return newState
   }

   if (action.type === actionTypes.SIGNUPCONFIRMPASSWORD) {
      newState.signUpConfirmPassword = action.data
      return newState
   }

   if (action.type === actionTypes.ALERTPASSWORD) {
      if (newState.passwordAlert === true) {
         newState.passwordAlert = false;
      } else {
         newState.passwordAlert = true;
      }
      return newState
   }

   if (action.type === actionTypes.CHECKBOX) {
      if (newState.registerCheckbox === true) {
         newState.registerCheckbox = false
      } else {
         newState.registerCheckbox = true
      }
      return newState
   }

   if (action.type === actionTypes.LOADER) {
      newState.loader = true
      return newState
   }

   if (action.type === actionTypes.LOADEROFF) {
      newState.loader = false
      return newState
   }

   if (action.type === actionTypes.RESETREGISTER) {
      newState.signUpEmail = ''
      newState.signUpUsername = ''
      newState.signUpPassword = ''
      newState.signUpConfirmPassword = ''
      newState.registerCheckbox = ''
      newState.passwordAlert = ''
      return newState
   }
 
   if(action.type===actionTypes.REDIRECTHOME){
      if(newState.redirectHome === false){
         newState.redirectHome= true;
      }else{
         newState.redirectHome= false;
      }
     return newState
   }
 

   return state;

}