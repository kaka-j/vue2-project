import axios from '../utils/request.js'

export const getBannerListAPI = (params) => axios.get('/banner/list',{params:params})
export const AddBannerListAPI = data => axios.post('/banner/add',data)
export const deleteSomeoneBannerListAPI = (params) => axios.get('/banner/list',{params:params})
export const deleteAllBannerListAPI = (params) => axios.get('/banner/removeAll',{params:params})