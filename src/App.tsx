import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
// Screens
import Login from 'screens/login'
import Dashboard from 'screens/dashboard'
// Utils
import { getLocalAccessToken } from 'utils/session'

const App = (): JSX.Element => {
  const token = getLocalAccessToken()
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">{token ? <Dashboard /> : <Redirect to="/" />}</Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
