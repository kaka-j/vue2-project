import axios from '../utils/request'

export const getAdminListAPI = (params) => axios.get('/admin/list',{params:params})
export const addAdminAPI = (data) => axios.post('/admin/add',data)
export const deleteAdminAPI = (data) => axios.post('/admin/delete',data)
