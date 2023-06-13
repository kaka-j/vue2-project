import axios from '../utils/request.js'

export const  getLogin = data => axios.post('/admin/login',data)