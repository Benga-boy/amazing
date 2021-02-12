import axios from 'axios'
import { removeToken } from './auth'
// import { getToken } from './auth'

const amazing = '/api'


// * Authenticate user permissions
// const withHeaders = () => {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   }
// }

// ! AUTH

// * REGISTER A USER
export const register = formData => {
  return axios.post(`${amazing}/register`, formData)
}

// * LOGIN A USER
export const login = formData => {
  return axios.post(`${amazing}/login`, formData)
}

// * LOGOUT A USER
export const logout = () => {
  removeToken()
  return axios.get(`${amazing}/logout`)
}

// * GET USERS PROFILE
export const getProfile = id => {
  return axios.get(`${amazing}/user/${id}`)
}

