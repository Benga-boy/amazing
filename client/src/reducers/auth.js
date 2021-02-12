import { LOGIN, LOGOUT } from '../actions/types'
import { isAuthenticated, removeToken, setToken } from '../lib/auth'


const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      setToken(payload.token)
      return {
        ...state,
        ...payload,
        isAuth: isAuthenticated(),
        loading: false,
        user: payload.user,
      }
    case LOGOUT:
      removeToken()
      return {
        ...state,
        isAuth: null,
        loading: false,
        token: null,
        user: null,
      }
    default:
      return state
  }
}



