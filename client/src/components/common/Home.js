import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import Layout from '../Layout/Layout'

const Home = () => {
  return (
    <Fragment>
      <Layout title="Welcome to Amazing" description="Buy leading and best selling tech books">
        <Row>
          <Col>
            <h1>Books</h1>
          </Col>
        </Row>
      </Layout>
    </Fragment>
  )
}

export default Home
