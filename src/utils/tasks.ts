// types
import { TaskStatus } from 'types/tasks'

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
