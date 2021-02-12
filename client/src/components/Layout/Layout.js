import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Container, Jumbotron } from 'reactstrap'

const Layout = ({ title, description, children }) => {
  return (
    <Fragment>
      <Jumbotron>
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </Jumbotron>
      <Container>
        {children}
      </Container>
    </Fragment>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default Layout
