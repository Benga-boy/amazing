// * Set users token in local storage when they sign in
export const setToken = token => {
  window.localStorage.setItem('token', token)
}

// * Get the users token
export const getToken = () => {
  return window.localStorage.getItem('token')
}

// * Remove users token when they have logged out
export const removeToken = () => {
  return localStorage.removeItem('token')
}


// * Check if user is Authenticated
export const isAuthenticated = () => {
  if (window.localStorage.getItem('token')) {
    return window.localStorage.getItem('token')
  } else {
    return false
  }
}
