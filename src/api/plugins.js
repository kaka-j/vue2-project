import axios from '../utils/request'

export const getSimpleDataAPI = (params) => axios.get('/data/simpleData',{params:params})
export const getkDataAPI = (params) => axios.get('/data/kData',{params:params})