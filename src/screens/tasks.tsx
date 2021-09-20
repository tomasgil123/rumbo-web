import React, { useState } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'

import Spinner from 'components/spinner'
import StatusFilter from 'domain/tasks/filters/statusFilter'
import TasksByStatus from 'domain/tasks/TasksByStatus'
import GuidelineNameFilter from 'domain/tasks/filters/GuidelineNameFilter'

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
  const [guidelineNameFilter, setGuidelineNameFilter] = useState('')

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

  const handleSearchChange = (event: any): void => {
    setGuidelineNameFilter(event.target.value)
  }

  const filteredByGuiline = arrayFlatTasks.filter((task) =>
    task.guidelineName.includes(guidelineNameFilter.toUpperCase())
  )
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
              icon={'icon-note text-danger-light'}
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
              icon={'icon-fire text-danger'}
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
              icon={'icon-note text-primary-ligh'}
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
              icon={'icon-note text-primary-light'}
            />
          </ul>
        </div>
      )
    default:
      return (
        <div className="flex flex-row justify-center content-between">
          <ul className="px-4">
            <div>
              <GuidelineNameFilter
                handleSearchChange={handleSearchChange}
                guidelineNameFilter={guidelineNameFilter}
              />
              <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
            </div>
            {taskByStatus.news.length > 0 ? (
              <TasksByStatus
                taskByStatus={taskByStatus}
                borderColor={'border-danger-light'}
                label={'Nuevas'}
                status={'news'}
                icon={'icon-note text-danger-light'}
              />
            ) : (
              <div> </div>
            )}
            {taskByStatus.expired.length > 0 ? (
              <TasksByStatus
                taskByStatus={taskByStatus}
                borderColor={'border-danger'}
                label={'Vencidas'}
                status={'expired'}
                icon={'icon-fire text-danger'}
              />
            ) : (
              <div> </div>
            )}

            {taskByStatus.pending.length > 0 ? (
              <TasksByStatus
                taskByStatus={taskByStatus}
                borderColor={'border-primary-light'}
                label={'Pendientes'}
                status={'pending'}
                icon={'icon-note text-primary-light'}
              />
            ) : (
              <div> </div>
            )}
            {taskByStatus.resolved.length > 0 ? (
              <TasksByStatus
                taskByStatus={taskByStatus}
                borderColor={'border-success'}
                label={'Resueltas'}
                status={'resolved'}
                icon={'icon-note text-success'}
              />
            ) : (
              <div> </div>
            )}
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
