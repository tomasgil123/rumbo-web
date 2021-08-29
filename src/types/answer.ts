import { TaskRaw } from './tasks'

export interface Answer {
  guideline_pk: number
  value: string
  pk: number
  tasks: TaskRaw[]
}
