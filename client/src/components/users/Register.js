import React, { useState } from 'react'
import { register } from '../../lib/api'
import Layout from '../Layout/Layout'
import RegisterForm from './forms/RegisterForm'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const [formdata, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  // * history to push user to login page
  const history = useHistory()

  // Function to handle formData change
  const handleChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value })

  // Function to handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await register(formdata)
      setFormData({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      })
      toast.success(res.data.message.toString())
      history.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section id="register">
      <ToastContainer />
      <Layout
        title="Join Amazing here"
        description="Signup to Amazing and never miss the best books Tech books"
      >
        <RegisterForm
          handleChange={handleChange}
          handleRegister={handleRegister}
          formData={formdata}
        />
      </Layout>
    </section>
  )
}

export default Register
