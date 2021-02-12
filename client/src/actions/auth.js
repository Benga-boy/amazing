import { login, logout } from '../lib/api'
import { LOGIN, LOGOUT } from './types'


// Action to log a user in
export const loginUser = data => async dispatch => {
  try {
    const res = await login(data)
    dispatch({
      type: LOGIN,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}


// Action to log a user out
export const logoutUser = () => async dispatch => {
  try {
    await logout()
    dispatch({
      type: LOGOUT,
    })
  } catch (err) {
    console.log(err)
  }
}