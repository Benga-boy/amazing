import React, { Fragment } from 'react'
import { Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap'
import Layout from '../Layout/Layout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Dashboard = ({ auth: { user: { name, email, role } } }) => {



  return (
    <Fragment>
      <Layout title="User Dashboard" description="Welcome to your dashboard">
        <Card className="w-75 m-auto">
          <CardHeader>User Information</CardHeader>
          <ListGroup>
            <ListGroupItem>Name:  {name} </ListGroupItem>
            <ListGroupItem>Email:  {email} </ListGroupItem>
            <ListGroupItem>Role:  {role} </ListGroupItem>
          </ListGroup>
        </Card>
        <Card className="w-75 m-auto">
          <CardHeader>Purchase History</CardHeader>
          <ListGroup>
            <ListGroupItem>Name: </ListGroupItem>
          </ListGroup>
        </Card>
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
