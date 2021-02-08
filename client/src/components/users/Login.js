import React, { Fragment, useState } from 'react'
import { login } from '../../lib/api'
import Layout from '../Layout/Layout'
import LoginForm from './forms/LoginForm'

const Login = () => {
  const [formdata, setFormData] = useState({ email: '', password: '' })

  // * Function to handle the change in formdata
  const handleChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value })

  // * Function to handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(formdata)
      setFormData({ email: '', password: '' })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
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

export default Login
