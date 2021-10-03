// types
import { Guideline } from 'types/guideline'
import { Answer } from 'types/answer'
import { AuditProgram } from 'types/auditProgram'
import { SurveyActive } from 'types/survey'
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

export const getFlatArrayFromObjectValues = (survey: SurveyActive): Task[] => {
  const arrayOfTaskArray = Object.values(survey.tasks)
  const arrayFlatTasks = arrayOfTaskArray.reduce(
    (acc: Task[], tasks: Task[]): Task[] => acc.concat(tasks.map((task: Task) => task)),
    []
  )

  return arrayFlatTasks
}

export const getUnansweredGuidelines = (
  survey: SurveyActive,
  auditProgram: AuditProgram
): Guideline[] => {
  const answers = Object.values(survey.answers)
  const guidelines = Object.values(auditProgram.guidelines)
  const answerPks = answers.map((answer: Answer) => answer.guideline_pk)

  const unansweredGuidelines = guidelines.filter(
    (guideline: Guideline) => answerPks.indexOf(guideline.pk) === -1
  )

  return unansweredGuidelines
}

export const getPriorityToTask = (
  taskData: Task,
  guideline: Guideline,
  isAreaEssential: boolean
): number => {
  let priorityValues

  if (taskData.status === '2') {
    priorityValues = [
      10000000 * Number(taskData.status),
      taskData && guideline.required ? 0 : 1000000,
      taskData && isAreaEssential ? 0 : 100000,
      taskData && !guideline.code.includes('P') ? 0 : 10000,
      taskData && taskData.last_change ? new Date(taskData.last_change).getTime() / 100000000 : 0,
      taskData && guideline.code ? Number(guideline.code.replace(/\D/g, '')) / 1000 : 1,
    ]
  } else {
    priorityValues = [
      10000000 * Number(taskData.status),
      taskData && guideline.required ? 0 : 1000000,
      taskData && isAreaEssential ? 0 : 100000,
      taskData && !guideline.code.includes('P') ? 0 : 10000,
      taskData && taskData.deadline ? new Date(taskData.deadline).getTime() / 100000000 : 0,
      taskData && guideline.code ? Number(guideline.code.replace(/\D/g, '')) / 1000 : 1,
    ]
  }
  return priorityValues.reduce((x, y) => x + y, 0)
}

export const getAreas = (auditProgram: AuditProgram): { name: string; pk: number }[] => {
  const areas = Object.values(auditProgram.areas)

  const areasNamesAndPks = areas.map((area) => ({ name: area.name, pk: area.pk }))
  return areasNamesAndPks
}
