import axios from '../utils/request.js'

export const  getSearchProListAPI = (params) => axios.get('/pro/getCategory',{params:params})
export const  SearchKeywordListAPI = data => axios.post('/pro/searchPro',data)