import React, { Fragment } from 'react'
import { Card, CardHeader, Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { connect } from 'react-redux'
import Layout from '../Layout/Layout'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AdminDashboard = ({ auth: { user: { name, email, role } } })=> {


  // * Admin Links
  const adminLinks = () => {
    return (
      <Card>
        <CardHeader>User Links</CardHeader>
        <ListGroup>
          <ListGroupItem>
            <Link className="nav-link" to="/create/category">Create Category</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link className="nav-link" to="/create/product">Create Product</Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
  
  // * Admin Info
  const adminInfo = () => {
    return (
      <Fragment>
        <Card className="m-auto">
          <CardHeader>User Information</CardHeader>
          <ListGroup>
            <ListGroupItem>Name:  {name} </ListGroupItem>
            <ListGroupItem>Email:  {email} </ListGroupItem>
            <ListGroupItem>Role:  {role === 1 ? 'Admin' : 'Registered user'} </ListGroupItem>
          </ListGroup>
        </Card>
      </Fragment>
    )
  }
  

  return (
    <Fragment>
      <Layout title={`${name.split(' ')[0]}'s Dashboard`} description="Welcome to your dashboard">
        <Row>
          <Col lg="3" md="3">
            {adminLinks()}
          </Col>
          <Col lg="9" md="9">
            {adminInfo()}
          </Col>
        </Row>
      </Layout>
    </Fragment>
  )
}

AdminDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(AdminDashboard)
