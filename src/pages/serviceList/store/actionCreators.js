import axios from 'axios';
import {apiURL} from '../../../api/index'
import * as actionTypes from './actionTypes'


export const getList=(data)=>({
    type: actionTypes.GETSERVICELIST,
    data
})