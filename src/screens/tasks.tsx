import React, { ChangeEvent, useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'

import Spinner from 'components/spinner'
import StatusFilter from 'domain/tasks/filters/statusFilter'
import TasksByStatus from 'domain/tasks/TasksByStatus'
import GuidelineNameFilter from 'domain/tasks/filters/GuidelineNameFilter'
import TaskByAreaFilter from 'domain/tasks/filters/taskByAreaFilter'
//utils
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useInitialData from 'hooks/useInitialData'
import useTaskFilters from 'hooks/useTaskFilters'
import { getFlatArrayFromObjectValues, TasksStyles, getPriorityToTask, getAreas } from 'utils/tasks'
import { doesGuidelineBelongEssentialArea } from 'utils/guideline'
//types
import { TypeTaskStatus, TaskWithPriority } from 'types/tasks'
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

const TaskList = (): JSX.Element => {
  const [arrayTasksOrdered, setArrayTasksOrdered] = useState<TaskWithPriority[]>([])
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )

  const arrayFlatTasks = survey ? getFlatArrayFromObjectValues(survey as SurveyActive) : []

  useEffect(() => {
    arrayFlatTasks.forEach((task) => {
      const guidelineTask = auditProgram?.guidelines[task.guidelinePk]
      if (guidelineTask) {
        ;(task as TaskWithPriority).priority = getPriorityToTask(
          task,
          guidelineTask,
          doesGuidelineBelongEssentialArea(guidelineTask.pk, auditProgram as AuditProgram)
        )
      } else {
        ;(task as TaskWithPriority).priority = 0
      }
    })
    setArrayTasksOrdered(
      (arrayFlatTasks as TaskWithPriority[]).sort(function (a, b) {
        return a.priority - b.priority
      })
    )
  }, [arrayFlatTasks.length])

  const areasNames = getAreas(auditProgram as AuditProgram)

  console.log('areas', areasNames)

  const {
    areaFilter,
    addAreaFilter,
    statusFilters,
    addFilterStatus,
    guidelineNameFilter,
    addGuidelineNameFilter,

    tasksToShowGrouped,
  } = useTaskFilters(arrayTasksOrdered)

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
      <ul>
        <div className="shadow-md rounded bg-white w-full p-4">
          <StatusFilter taskByStatus={tasksToShowGrouped} handleClick={onApplyFilterStatus} />
          <div className="text-center">
            <GuidelineNameFilter
              guidelineNameFilter={guidelineNameFilter}
              handleSearchChange={handleSearchChange}
            />
          </div>
          <TaskByAreaFilter areas={areasNames} addAreaFilter={addAreaFilter} />
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
