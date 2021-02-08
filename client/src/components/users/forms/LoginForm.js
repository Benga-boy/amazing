import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import PropTypes from 'prop-types'

const LoginForm = ({ handleChange, formData, handleSubmit }) => {
  return (
    <Card className="w-50 m-auto">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Please enter email"
              onChange={handleChange}
              value={formData.email}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Please enter password"
              onChange={handleChange}
              value={formData.password}
            />
          </FormGroup>
          {/* {error && <small className="text-danger mb-4 p-2">{error}</small>} */}
          <Button className="mt-3" color="warning" outline block>
            Login
          </Button>
          <div className="pt-1">
            <small>
              Not registered? Register <Link to="/register">here</Link>
            </small>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm
