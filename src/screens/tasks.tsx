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
          <div className="py-4">
            <div className=" text-center border-t border-b border-danger-light w-44 mx-auto ">
              Nuevas
            </div>
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
          <div className="py-4">
            <div className=" text-center border-t border-b border-danger w-44 mx-auto ">
              Vencidas
            </div>
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
          <div className="py-4">
            <div className=" text-center border-t border-b border-primary-light w-44 mx-auto ">
              Pendientes
            </div>
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
          <div className="py-4">
            <div className=" text-center border-t border-b border-success w-44 mx-auto ">
              Resueltas
            </div>
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
