import axios from '../utils/request.js'

export const  getpeoListAPI = (params) => axios.get('/pro/list',{
    params:params
})
export const updateFlagAPI = (data) => axios.post("/pro/updateFlag",data);  
export const updateIsSecondkillAPI = (data) => axios.post("/pro/updateFlag",{type:"isseckill",...data});
export const updateIsrecommendkillAPI = (data) => axios.post("/pro/updateFlag",{type:"isrecommend",...data});
export const getdetailListAPI = (params) => axios.get('/pro/detail',{
    params:params
})