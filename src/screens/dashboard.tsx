import React from 'react'
// components
import Layout from 'components/layout'

const DashboardScreen = (): JSX.Element => {
  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="rounded shadow-lg p-4">
        <div>Tareas plan operativo</div>
        <div>
          <i className="icon-note"></i>
        </div>
      </div>
    </div>
  )
}

export default Layout(DashboardScreen)
