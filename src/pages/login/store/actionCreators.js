import axios from 'axios';
import * as actionTypes from './actionTypes'
import Swal from 'sweetalert2'
import localStorage from 'redux-persist/es/storage';
import {apiURL} from '../../../api/index'
import {history} from '../history/history'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

// axios.defaults.withCredentials = true;



const getStoreToken=(data)=>({
  type:actionTypes.TOKENSTORE,
  data
})

export const countrydata=(data)=>({
  type:actionTypes.CountryList,
  data
})

const changeLogin=()=>({
 type:actionTypes.CHANGE_LOGIN,
 value:true
})
const resetRegister=()=>({
    type:actionTypes.RESETREGISTER
})


export const getEmail=(data)=>({
   type:actionTypes.SIGNINEMAIL,
   data
})

export const getPassword=(data)=>({
    type:actionTypes.SIGNINPASSWORD,
    data
})

export const getSignUpUsername=(data)=>({
    type:actionTypes.SIGNUPUSERNAME,
    data
})

export const getSignUpEmail=(data)=>({
type:actionTypes.SIGNUPEMAIL,
data
})
export const getSignUpPassword=(data)=>({
type:actionTypes.SIGNUPPASSWORD,
data
})

export const getSignUpConfirmPasswords=(data)=>({
    type:actionTypes.SIGNUPCONFIRMPASSWORD,
    data
})

export const getPasswordAlert=()=>({
type:actionTypes.ALERTPASSWORD
})


export const getCheckbox=()=>({
    type:actionTypes.CHECKBOX
})

export const getICon=()=>({
    type:actionTypes.ICON
})

export const getLoader=()=>({
    type:actionTypes.LOADER
})

export const getLoaderOff=()=>({
    type:actionTypes.LOADEROFF
})

export const register=(registerInfo)=>{
    return(dispatch)=> {       
axios.post( apiURL + "/api/register",registerInfo)
.then((res)=>{

if(res.status===200){
   dispatch(resetRegister())
    // window.location = "/login#/sign-in"
    let timerInterval
    Swal.fire({
      title: 'Successfully Registered',
      html: 'Redirecting <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      //  window.location="/signIn"
      history.push('/signIn')
      }
    })
}

})
.catch(()=>{
    dispatch(resetRegister())
    Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      
})
.finally(()=>{ dispatch(getLoaderOff())})


    }
}


export const userLogin=(login)=>{
    return(dispatch)=>{
axios( apiURL+'/api/login',{
  method:"post",
  data:login,
  // withCredentials:true
})
.then((res)=>{
 
  if(res.status === 200){

    dispatch(getStoreToken(res.data))
  cookies.set("jwt",res.data)
  localStorage.setItem("jwt",res.data)
 

    let timerInterval
Swal.fire({
  title: 'Login Successful!',
  html: 'Redirect to Home Page in<b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    dispatch(changeLogin())
       
 
  }
})
  }

 })
.catch(()=>{   
  Swal.fire({
  icon: 'warning',
  text: 'Wrong Password or Email',
})
})
.finally(()=>{dispatch(getLoaderOff())})
    }
}

