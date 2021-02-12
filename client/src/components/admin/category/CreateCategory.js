import React, { useState } from 'react'
import { Button, Card, CardBody, Form, Input } from 'reactstrap'
import Layout from '../../Layout/Layout'
import { connect } from 'react-redux'
import { createCat } from '../../../actions/categories'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom'

const CreateCategory = ({ createCat }) => {
  const [name, setName] = useState('')


  const history = useHistory()

  // * Function to handle text change
  const handleChange = e => {
    setName(e.target.value)
  }

  // Submit function to add a category
  const handleSubmit = e => {
    e.preventDefault()
    createCat({ name })
    setName('')
    toast.success('New category added')
    history.push('/admin/dashboard')
  }

  return (
    <Layout title="Add categoty" description="Add book categories">
      <ToastContainer />
      <Card className="m-auto w-50">
        <CardBody>
          <Form onSubmit={handleSubmit} className="w-50 m-auto">
            <Input placeholder="Add category" onChange={handleChange} value={name} />
            <Button outline className="mt-2">Add</Button>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  )
}

CreateCategory.propTypes = {
  createCat: PropTypes.func.isRequired,
}

export default connect(null, { createCat })(CreateCategory)
