import React from 'react'
import { useQuery } from 'react-query'
import axios from 'interceptors'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'

const DashboardScreen = (): JSX.Element => {
  const { isLoading, error, data } = useQuery('initialData', () =>
    axios.get('/api/v1/initialData?distributors_ids=true').then((res) => res)
  )

  if (isLoading)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error) return <div>An error has occurred</div>

  console.log('data', data)

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
