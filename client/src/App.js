import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Home from './components/common/Home'
import NavbarTop from './components/common/Navbar'
import Dashboard from './components/users/Dashboard'
import Login from './components/users/Login'
import Register from './components/users/Register'
import SecureRoute from './lib/SecureRouter'

// Redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => {



  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavbarTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <SecureRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
