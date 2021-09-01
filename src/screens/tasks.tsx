import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
// components
import Layout from 'components/layout'
import TaskD from 'domain/tasks/task'
//types
import { Task } from 'types/tasks'
import { MouseEventHandler } from 'react'

import { isTaskExpired, getTaskByStatus } from 'utils/tasks'
import arrayOfTasks from 'arrayOfTasks'

interface myProps {
  task: Task
  icon: string
}
const TaskPresentation = ({ task, icon }: myProps): JSX.Element => {
  return (
    <Link to={`tareas/${task.pk}`}>
      <div className="flex flex-row justify-center items-start flex-wrap shadow-md w-full md:w-72">
        <span className="w-20">{task.guideline_pk}</span>
        <div className="flex flex-col justify-center px-4">
          <h1 className="uppercase">{task.guideline_name}</h1>
          <ul className="text-disabled">
            <li>limite:{task.deadline}</li>
            <li>persona asignada:{task.assigned_to}</li>
            <li>descripcion:{task.description}</li>
          </ul>
        </div>
        <div className="w-20">
          <i className={icon} />
        </div>
      </div>
    </Link>
  )
}

const TaskList = (): JSX.Element => {
  const taskByStatus = getTaskByStatus(arrayOfTasks)
  return (
    <div className="flex flex-row justify-center content-between ">
      <ul>
        <h2 className="text-center underline">Nuevas</h2>
        {taskByStatus.news.map((task: Task) => (
          <li>
            <div>
              <TaskPresentation task={task} icon={'icon-note text-danger-light'} />
            </div>
          </li>
        ))}
        <h2 className="text-center underline">Vencidas</h2>
        {taskByStatus.expired.map((task: Task) => (
          <li>
            <TaskPresentation task={task} icon={'icon-fire text-danger'} />
          </li>
        ))}
        <h2 className="text-center underline">Pendientes</h2>
        {taskByStatus.pending.map((task: Task) => (
          <li>
            <TaskPresentation task={task} icon={'icon-note text-primary-light'} />
          </li>
        ))}
        <h2 className="text-center underline">Resueltas</h2>
        {taskByStatus.resolved.map((task: Task) => (
          <li>
            <TaskPresentation task={task} icon={'icon-note text-success'} />
          </li>
        ))}
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
          <TaskD />
        </Route>
        <Route path={match.path}>
          <TaskList />
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(TasksScreen)
