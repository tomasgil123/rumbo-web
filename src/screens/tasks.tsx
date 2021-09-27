import React, { ChangeEvent } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'

import Spinner from 'components/spinner'
import StatusFilter from 'domain/tasks/filters/statusFilter'
import TasksByStatus from 'domain/tasks/TasksByStatus'
import GuidelineNameFilter from 'domain/tasks/filters/GuidelineNameFilter'

import { getFlatArrayFromObjectValues, TasksStyles } from 'utils/tasks'

//utils
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useInitialData from 'hooks/useInitialData'
import useTaskFilters from 'hooks/useTaskFilters'

//types
import { TypeTaskStatus } from 'types/tasks'
import { SurveyActive } from 'types/survey'

const TaskList = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )
  const arrayFlatTasks = survey ? getFlatArrayFromObjectValues(survey as SurveyActive) : []

  const {
    statusFilters,
    addFilterStatus,
    guidelineNameFilter,
    addGuidelineNameFilter,
    tasksToShowGrouped,
  } = useTaskFilters(arrayFlatTasks)

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    addGuidelineNameFilter(event.target.value)
  }

  const onApplyFilterStatus = (status: TypeTaskStatus): void => {
    addFilterStatus(status)
  }

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <ul className="px-4">
        <div className="shadow-md rounded bg-white w-full">
          <StatusFilter taskByStatus={tasksToShowGrouped} handleClick={onApplyFilterStatus} />
          <GuidelineNameFilter
            guidelineNameFilter={guidelineNameFilter}
            handleSearchChange={handleSearchChange}
          />
        </div>
        {Object.keys(tasksToShowGrouped).map(
          (groupTasks): JSX.Element => (
            <TasksByStatus
              tasks={(tasksToShowGrouped as any)[groupTasks]}
              borderColor={(TasksStyles as any)[groupTasks].borderColor}
              label={groupTasks}
              icon={(TasksStyles as any)[groupTasks].icon}
            />
          )
        )}
      </ul>
    </div>
  )
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
        <Route path={`${match.path}/:guidelinePk`}>
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
