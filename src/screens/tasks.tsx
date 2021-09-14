import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'
import TaskCard from 'domain/tasks/taskCard'
import Spinner from 'components/spinner'
import StatusFilter from 'domain/tasks/filters/statusFilter'
import TasksByStatus from 'domain/tasks/TasksByStatus'
//types
import { Task as TaskModel } from 'types/tasks'

import { getTaskByStatus, getFlatArrayFromObjectValues } from 'utils/tasks'

//utils
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useInitialData from 'hooks/useInitialData'

const TaskList = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )
  const [statusFilter, setStatusFilter] = useState('')

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  const arrayFlatTasks = getFlatArrayFromObjectValues(survey)
  const taskByStatus = getTaskByStatus(arrayFlatTasks)

  const handleClick = (status: string): void => {
    setStatusFilter(status)
  }

  switch (statusFilter) {
    case 'news':
      return (
        <div className="flex flex-row justify-center content-between">
          <ul className="px-4">
            <div>
              <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
            </div>
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-danger-light'}
              label={'Nuevas'}
              status={'news'}
            />
          </ul>
        </div>
      )
    case 'expired':
      return (
        <div className="flex flex-row justify-center content-between">
          <ul className="px-4">
            <div>
              <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
            </div>
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-danger'}
              label={'Vencidas'}
              status={'expired'}
            />
          </ul>
        </div>
      )
    case 'pending':
      return (
        <div className="flex flex-row justify-center content-between">
          <ul className="px-4">
            <div>
              <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
            </div>
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-primary-light'}
              label={'Pendientes'}
              status={'pending'}
            />
          </ul>
        </div>
      )
    case 'resolved':
      return (
        <div className="flex flex-row justify-center content-between">
          <ul className="px-4">
            <div>
              <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
            </div>
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-success'}
              label={'Resueltas'}
              status={'resolved'}
            />
          </ul>
        </div>
      )
    default:
      return (
        <div className="flex flex-row justify-center content-between">
          <ul className="px-4">
            <div>
              <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
            </div>
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-danger-light'}
              label={'Nuevas'}
              status={'news'}
            />
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-danger'}
              label={'Vencidas'}
              status={'expired'}
            />
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-primary-light'}
              label={'Pendientes'}
              status={'pending'}
            />
            <TasksByStatus
              taskByStatus={taskByStatus}
              borderColor={'border-success'}
              label={'Resueltas'}
              status={'resolved'}
            />
          </ul>
        </div>
      )
  }
}

const TasksScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}

      <Switch>
        <Route path={`${match.path}/:taskId`}>
          <Task />
        </Route>
        <Route path={match.path}>
          <TaskList />
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(TasksScreen)
