import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import NavbarTop from './components/common/Navbar'
import Login from './components/users/Login'
import Register from './components/users/Register'

const App = () => {
  return (
    <BrowserRouter>
      <NavbarTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
