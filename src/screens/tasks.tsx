import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'
import TaskPresentation from 'domain/tasks/taskPresentation'
//types
import { Task as TaskModel } from 'types/tasks'

import { getTaskByStatus } from 'utils/tasks'
import arrayOfTasks from 'arrayOfTasks'

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
          {taskByStatus.news.map((task: TaskModel) => (
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
          {taskByStatus.expired.map((task: TaskModel) => (
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
          {taskByStatus.pending.map((task: TaskModel) => (
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
          {taskByStatus.resolved.map((task: TaskModel) => (
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
