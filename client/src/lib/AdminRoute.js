import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Route, Redirect } from 'react-router-dom'
import { logout } from './api'


// * If user has been verified and logged then take them to requested page, else if logged out, redirect them to the login page
const AdminRoute = ({ component: Component, auth: { isAuth, user: { role } }, ...rest }) => {
  if (isAuth && role === 1) return <Route {...rest} component={Component} />
  logout()
  return <Redirect to="/" />
}


AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(AdminRoute)