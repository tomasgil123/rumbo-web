import { TaskRaw } from './tasks'

export interface Answer {
  guideline_pk: number
  value: string
  pk: number
  tasks: TaskRaw[]
}

export interface AnswerPost {
  guideline: number
  sent_by: string
  survey: number
  value: string | number
}

export interface AnswerResponse extends AnswerPost {
  edited: boolean
  approved: boolean
  last_change_user: Date
}
