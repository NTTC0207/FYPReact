import axios from 'axios';
import * as actionTypes from './actionTypes'
import { actionCreators as loaderActionCreators } from '../../login/store';
import { apiURL } from '../../../api/index'




export const profileList = (data) => ({
    type: actionTypes.GETPROFILELIST,
    data
})

export const profileImage = (image) => ({
    type: actionTypes.GETPROFILEIMAGE,
    image
})



export const getUserData = (token) => {
    return (dispatch) => {
      

        axios.get(apiURL + "/api/profile/" + token)
            .then((res) => {
                // console.log(res.data)
                dispatch(profileList(res.data))

            })

    }
}

export const getProfileImage = (token) => {
    return (dispatch) => {

      
        axios.get(apiURL + "/api/profile/" + token + "/UploadFile")
            .then((res) => {
                if (res.status === 200) {


                    dispatch(profileImage(res.data.src))

                }

            })
            .catch(() => { console.log("no image found") })
    }
}



export const getUploadImage = (props, token) => {
    return (dispatch) => {
    
        const data = new FormData()
        data.append('files', props)
        console.log(props)

        let url = apiURL + "/api/ProfileUpload/" + token;

        axios.put(url, data, {})
            .then((res) => {
                // window.location.href="/profile"

                if (res.status === 200) {

                    // dispatch(ImageExist())
                    // window.location="/profile"

                    axios.get(apiURL + "/api/profile/" + token + "/UploadFile")
                        .then((res) => {
                            if (res.status === 200) {

                      

                                dispatch(profileImage(res.data.src))

                            }

                        })
                        .catch(() => { console.log("no image found") })


                }

            })
            .finally(() => {
                dispatch(loaderActionCreators.getLoaderOff())

            })



    }
}

export const getInput = (val) => ({
    type: actionTypes.GETINPUTFILE,
    val
})

export const getFreelancerData =(data)=>({
    type: actionTypes.FRELANCERDATA,
    data
})

export const getChange =()=>({
    type:actionTypes.CHANGE,
   
})
