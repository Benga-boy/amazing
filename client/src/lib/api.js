import axios from 'axios'

const amazing = '/api'

// ! AUTH

// * REGISTER A USER
export const register = formData => {
  return axios.post(`${amazing}/register`, formData)
}

// * LOGIN A USER
export const login = formData => {
  return axios.post(`${amazing}/login`, formData)
}