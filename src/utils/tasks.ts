// types
import { TaskStatus, Task, taskByStatus } from 'types/tasks'

export const STATUS_NEW = '0'
export const STATUS_PENDING = '1'
export const STATUS_DONE = '2'
export const STATUS_LOCKED = '4'
export const STATUS_DELETED = '5'
export const STATUS_DUE = '-1'

export const getStatusDisplay = (statusValue: string): TaskStatus => {
  switch (statusValue) {
    case STATUS_NEW:
      return { status: 'Nueva', color: 'text-danger' }
    case STATUS_PENDING:
      return { status: 'Pendiente', color: 'text-danger-light' }
    case STATUS_DONE:
      return { status: 'Realizada', color: 'text-success' }
    case STATUS_LOCKED:
      return { status: 'Bloqueada', color: 'text-disabled' }
    default:
      return { status: 'Nueva', color: 'text-danger' }
  }
}

// task with a status of pending can be expired if they have a deadline
// and that deadline is before yesterday
export const isTaskExpired = (task: Task): boolean => {
  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)
  return (
    task.deadline !== null && task.status === STATUS_PENDING && new Date(task.deadline) < yesterday
  )
}

export const getTaskByStatus = (arrayOfTasks: Task[]): taskByStatus => {
  const news = arrayOfTasks.filter((task: Task) => task.status === '0')
  const pending = arrayOfTasks.filter((task: Task) => task.status === '1' && !isTaskExpired(task))
  const expired = arrayOfTasks.filter((task: Task) => task.status === '1' && isTaskExpired(task))
  const resolved = arrayOfTasks.filter((task: Task) => task.status === '2')

  return { news: news, pending: pending, expired: expired, resolved: resolved }
}

export const getFlatArrayFromObjectValues = (survey: any): Task[] => {
  const arrayOfTaskArray = Object.values(survey.tasks)
  const arrayOfRealTask = arrayOfTaskArray.reduce(
    (acc: Task[], tasks: any): Task[] => acc.concat(tasks.map((task: Task) => task)),
    []
  )
  return arrayOfRealTask
}
