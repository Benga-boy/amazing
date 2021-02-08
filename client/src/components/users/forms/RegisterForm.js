import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'

const RegisterForm = ({ handleChange, formData, handleRegister }) => {
  return (
    <Card className="w-50 m-auto">
      <CardBody>
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              type="text"
              value={formData.name}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              name="email"
              onChange={handleChange}
              type="email"
              value={formData.email}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              onChange={handleChange}
              name="password"
              type="password"
              value={formData.password}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password Confirmation</Label>
            <Input
              placeholder="Password"
              onChange={handleChange}
              name="passwordConfirmation"
              type="password"
              value={formData.passwordConfirmation}
            />
          </FormGroup>
          <Button block color="dark" outline>
            Join Now
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

RegisterForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  handleRegister: PropTypes.func.isRequired,
}

export default RegisterForm
