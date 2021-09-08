import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'
import TaskCard from 'domain/tasks/taskCard'
import Spinner from 'components/spinner'
//types
import { Task as TaskModel } from 'types/tasks'

import { getTaskByStatus } from 'utils/tasks'
import arrayOfTasks from 'arrayOfTasks'
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

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>An error has occurred</div>

  const arrayOfTaskArray = Object.values((survey as any).tasks)

  const arrayOfRealTask = arrayOfTaskArray.reduce(
    (acc: TaskModel[], tasks: any): TaskModel[] => acc.concat(tasks.map((task: TaskModel) => task)),
    []
  )
  const taskByStatus = getTaskByStatus(arrayOfRealTask)

  return (
    <div className="flex flex-row justify-center content-between">
      <ul className="px-4">
        <div>
          <div className="py-4">
            <div className=" text-center border-t border-b border-danger-light w-44 mx-auto ">
              Nuevas
            </div>
          </div>
          {taskByStatus.news.map((task: TaskModel) => (
            <li>
              <TaskCard task={task} icon={'icon-note text-danger-light'} />
            </li>
          ))}
        </div>
        <div>
          <div className="py-4">
            <div className=" text-center border-t border-b border-danger w-44 mx-auto ">
              Vencidas
            </div>
          </div>
          {taskByStatus.expired.map((task: TaskModel) => (
            <li>
              <TaskCard task={task} icon={'icon-fire text-danger'} />
            </li>
          ))}
        </div>
        <div>
          <div className="py-4">
            <div className=" text-center border-t border-b border-primary-light w-44 mx-auto ">
              Pendientes
            </div>
          </div>

          {taskByStatus.pending.map((task: TaskModel) => (
            <li>
              <TaskCard task={task} icon={'icon-note text-primary-light'} />
            </li>
          ))}
        </div>
        <div>
          <div className="py-4">
            <div className=" text-center border-t border-b border-success w-44 mx-auto ">
              Resueltas
            </div>
          </div>

          {taskByStatus.resolved.map((task: TaskModel) => (
            <li>
              <TaskCard task={task} icon={'icon-note text-success'} />
            </li>
          ))}
        </div>
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
