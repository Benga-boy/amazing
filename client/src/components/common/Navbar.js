import React, { Fragment, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavLink,
  NavItem
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/auth'


// Function to set active link
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#fff' }
  }
}

const NavbarTop = ({ history, logoutUser, auth: { isAuth } }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const redirect = useHistory()

  // * Function to logout
  const userLogout = async () => {
    logoutUser()
    redirect.push('/login')
  }


  return (
    <Fragment>
      <Navbar expand="sm" dark={true} color="dark" className="mt-0">
        <Container>
          <Link className="navbar-brand" to="/">
            Amazing
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link
                  to="/"
                  className="nav-link"
                  style={isActive(history, '/')}
                >
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/about" className="nav-link">
                  About Us
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/blog" className="nav-link">
                  Contact
                </Link>
              </NavItem>
              {!isAuth && <NavItem>
                <Link
                  to="/login"
                  className="nav-link"
                  style={isActive(history, '/login')}
                >
                  Login
                </Link>
              </NavItem>}
              {isAuth && <NavItem>
                <NavLink style={{ 'cursor': 'pointer' }} onClick={userLogout}>
                  Logout
                </NavLink>
              </NavItem>}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  )
}

NavbarTop.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logoutUser })(withRouter(NavbarTop))
