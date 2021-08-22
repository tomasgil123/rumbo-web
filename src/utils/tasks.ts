// types
import { TaskStatus, Task } from 'types/tasks'

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
      return { status: 'Realizada', color: 'text-sucess' }
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
