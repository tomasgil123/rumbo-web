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
      <div className="flex flex-row justify-between items-start shadow-md w-full py-2 md:w-72">
        <span className="w-20 justify-self-center">{task.guidelinePk}</span>
        <div className="flex flex-col justify-center px-4">
          <h1 className="uppercase">{task.guidelineName}</h1>
          <ul className="text-disabled">
            <li>limite:{task.deadline}</li>
            <li>persona asignada:{task.assigned_to}</li>
            <li>descripcion:{task.description}</li>
          </ul>
        </div>
        <div className="w-20  ">
          <i className={icon} />
        </div>
      </div>
    </Link>
  )
}

const TaskList = (): JSX.Element => {
  const taskByStatus = getTaskByStatus(arrayOfTasks)
  return (
    <div className="flex flex-row justify-center content-between">
      <ul>
        <div>
          <div className="flex justify-center divide-y divide-danger-light p-2 divide-opacity-50">
            <div> </div>
            <div>Nuevas</div>
            <div> </div>
          </div>
          {taskByStatus.news.map((task: Task) => (
            <li>
              <div>
                <TaskPresentation task={task} icon={'icon-note text-danger-light'} />
              </div>
            </li>
          ))}
        </div>
        <div>
          <div className="flex justify-center divide-y divide-danger divide-opacity-50 ">
            <div> </div>
            <div>Vencidas</div>
            <div> </div>
          </div>
          {taskByStatus.expired.map((task: Task) => (
            <li>
              <div>
                <TaskPresentation task={task} icon={'icon-fire text-danger'} />
              </div>
            </li>
          ))}
        </div>
        <div>
          <div className="flex justify-center divide-y divide-primary-light divide-opacity-50  ">
            <div> </div>
            <div>Pendientes</div>
            <div> </div>
          </div>
          {taskByStatus.pending.map((task: Task) => (
            <li>
              <div>
                <TaskPresentation task={task} icon={'icon-note text-primary-light'} />
              </div>
            </li>
          ))}
        </div>
        <div>
          <div className="flex justify-center divide-y divide-success divide-opacity-50 ">
            <div> </div>
            <div>Resueltas</div>
            <div> </div>
          </div>
          {taskByStatus.resolved.map((task: Task) => (
            <li>
              <div>
                <TaskPresentation task={task} icon={'icon-note text-success'} />
              </div>
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
