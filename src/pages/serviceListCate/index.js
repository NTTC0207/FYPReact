import React,{useEffect,useState} from "react";
import axios from "axios";
import {apiURL} from '../../api/index'

const  ServiceListCate=(props)=>{
    useEffect(() => {
        axios({
          method:'GET',
          url:apiURL+"/api/home/"+props.match.params.id
        })
        .then((res)=>{console.log(res.data)})
        },[])
    return(
        <>
        </>
    )
}


export default ServiceListCate;