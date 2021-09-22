// types
import { Task, TasksGroupedByStatus } from 'types/tasks'

export const STATUS_NEW = '0'
export const STATUS_PENDING = '1'
export const STATUS_DONE = '2'
export const STATUS_LOCKED = '4'
export const STATUS_DELETED = '5'
export const STATUS_DUE = '-1'

// task with a status of pending can be expired if they have a deadline
// and that deadline is before yesterday
export const isTaskExpired = (task: Task): boolean => {
  const yesterday = new Date()
  yesterday.setDate(new Date().getDate() - 1)
  return (
    task.deadline !== null && task.status === STATUS_PENDING && new Date(task.deadline) < yesterday
  )
}

export const TasksStyles = {
  Nuevas: { icon: 'icon-note text-danger-light', borderColor: 'border-danger-light' },
  Pendientes: { icon: 'icon-note text-primary-light', borderColor: 'border-primary-light' },
  Vencidas: { icon: 'icon-note text-border-danger', borderColor: 'border-danger' },
  Hechas: { icon: 'icon-note text-border-success', borderColor: 'border-success' },
}

export const getTaskByStatus = (arrayOfTasks: Task[]): TasksGroupedByStatus => {
  const newT = arrayOfTasks.filter((task: Task) => task.status === '0')
  const pending = arrayOfTasks.filter((task: Task) => task.status === '1' && !isTaskExpired(task))
  const expired = arrayOfTasks.filter((task: Task) => task.status === '1' && isTaskExpired(task))
  const done = arrayOfTasks.filter((task: Task) => task.status === '2')

  return {
    Nuevas: newT,
    Pendientes: pending,
    Vencidas: expired,
    Hechas: done,
  }
}

export const getFlatArrayFromObjectValues = (survey: any): Task[] => {
  const arrayOfTaskArray = Object.values(survey.tasks)
  const arrayFlatTasks = arrayOfTaskArray.reduce(
    (acc: Task[], tasks: any): Task[] => acc.concat(tasks.map((task: Task) => task)),
    []
  )
  return arrayFlatTasks
}

export const getUnansweredGuidelines = (survey: any, auditProgram: any): any => {
  const answeredGuide = Object.values(survey.answers)
  const totalGuidelines = Object.values(auditProgram.guidelines)
  const pkOfAnsweredGuide = answeredGuide.map((answer: any) => answer.guideline_pk)

  const unansGuideline = totalGuidelines.filter(
    (guideline: any) => pkOfAnsweredGuide.indexOf(guideline.pk) === -1
  )

  return unansGuideline
  debugger
}
