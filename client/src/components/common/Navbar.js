import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem
} from 'reactstrap'

// Function to set active link
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#fff' }
  }
}

const NavbarTop = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Fragment>
      <Navbar expand="sm" dark={true} color="dark" className="mt-0">
        <Container>
          <Link className="navbar-brand" to="/">Amazing</Link>
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
                <Link to="/services" className="nav-link">
                  Services
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/blog" className="nav-link">
                  Contact
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/login"
                  className="nav-link"
                  style={isActive(history, '/login')}
                >
                  Login
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default withRouter(NavbarTop)
