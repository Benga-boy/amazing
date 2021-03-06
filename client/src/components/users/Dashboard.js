import React, { Fragment } from 'react'
import { Card, CardHeader, Col, ListGroup, ListGroupItem, Row } from 'reactstrap'
import Layout from '../Layout/Layout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Dashboard = ({ auth: { user: { name, email, role } } }) => {


  // * Users Links
  const userLinks = () => {
    return (
      <Card className="mt-4">
        <CardHeader>User Links</CardHeader>
        <ListGroup>
          <ListGroupItem>
            <Link className="nav-link" to="/cart">My Cart</Link>
          </ListGroupItem>
          <ListGroupItem>
            <Link className="nav-link" to="/profile/update">Profile Update</Link>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }

  // * Users Info
  const userInfo = () => {
    return (
      <Fragment>
        <Card className="w-75 m-auto">
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


  // * Purchase histories
  const purchaseHistory = () => {
    return (
      <Card className="w-75 m-auto">
        <CardHeader>Purchase History</CardHeader>
        <ListGroup>
          <ListGroupItem>Name: </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }


  return (
    <Fragment>
      <Layout title={`${name.split(' ')[0]}'s Dashboard`} description="Welcome to your dashboard">
        <Row>
          <Col lg="3" md="3">
            {userLinks()}
          </Col>
          <Col lg="9" md="9">
            {userInfo()}
            {purchaseHistory()}
          </Col>
        </Row>
      </Layout>
    </Fragment>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, null)(Dashboard)
