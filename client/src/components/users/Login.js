import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../actions/auth'
import { connect } from 'react-redux'
import Layout from '../Layout/Layout'
import LoginForm from './forms/LoginForm'
import PropTypes from 'prop-types'

const Login = ({ loginUser, isAuth, user }) => {
  const [formdata, setFormData] = useState({ email: '', password: '' })


  // history to push user to homepage
  const history = useHistory()


  // If user is signed in and not admin then push them to homepage else push to admin dashboard
  if (isAuth && user.role === 0) {
    history.push('/user/dashboard')
  } else if (isAuth && user.role === 1) {
    history.push('/admin/dashboard')
  }

  // * Function to handle the change in formdata
  const handleChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value })

  // * Function to handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    loginUser(formdata)
    setFormData({ email: '', password: '' })
  }

  return (
    <Fragment>
      <Layout title="Welcome back" description="Login to your account here">
        <LoginForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formdata}
        />
      </Layout>
    </Fragment>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  user: state.auth.user,
})

export default connect(mapStateToProps, { loginUser })(Login)
