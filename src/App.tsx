import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Screens
import Login from 'screens/login'
import Dashboard from 'screens/dashboard'
// en el proceso de login el usuario obtiene un token y un refresh token

// con axios interceptors agregamos el token a las requests

// si alguna request devuelve 401, usamos el refresh token
// para pedir un nuevo token
// que pasa con la request que se hizo y fallo? tenemos que volver a hacerla?

// si el refresh token falla o no existe
// redirigimos al usuario a la pagina de login

// podemos implementar tambien un sistema que se anticipe a la expiracion
// del token y lo refresque en ciertos momentos

const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
