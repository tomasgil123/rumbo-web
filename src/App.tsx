import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
// Screens
import Login from 'screens/login'
import Dashboard from 'screens/dashboard'
import Tasks from 'screens/tasks'
import UnansweredGuidelines from 'screens/unansweredGuidelines'
// Utils
import { getLocalAccessToken } from 'utils/session'

const queryClient = new QueryClient()

const App = (): JSX.Element => {
  const token = getLocalAccessToken()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/dashboard">{token ? <Dashboard /> : <Redirect to="/" />}</Route>
          <Route path="/tareas">{token ? <Tasks /> : <Redirect to="/" />}</Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
