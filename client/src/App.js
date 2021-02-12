import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


import Home from './components/common/Home'
import NavbarTop from './components/common/Navbar'
import Dashboard from './components/users/Dashboard'
import Login from './components/users/Login'
import Register from './components/users/Register'
import SecureRoute from './lib/SecureRouter'
import AdminRoute from './lib/AdminRoute'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import AdminDashboard from './components/admin/AdminDashboard'
import CreateCategory from './components/admin/category/CreateCategory'

const App = () => {



  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavbarTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <SecureRoute exact path="/user/dashboard" component={Dashboard} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/create/category" component={CreateCategory} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
