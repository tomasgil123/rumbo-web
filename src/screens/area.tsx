import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const Area = (): JSX.Element => {
  return <div>Area</div>
}

const AreaScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:areaPk`}>
          <Area />
        </Route>
      </Switch>
    </div>
  )
}

export default AreaScreen
