import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
// Screens
import Login from 'screens/login'
import Dashboard from 'screens/dashboard'
import Tasks from 'screens/tasks'
import Area from 'screens/area'
import Survey from 'screens/survey'
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
          <Route path="/area">{token ? <Area /> : <Redirect to="/" />}</Route>
          <Route path="/encuesta">{token ? <Survey /> : <Redirect to="/" />}</Route>
        </Switch>
      </Router>
      <ToastContainer autoClose={5000} />
    </QueryClientProvider>
  )
}

export default App
