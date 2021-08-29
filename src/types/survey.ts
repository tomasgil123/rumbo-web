import { Answer } from './answer'
import { Task } from './tasks'

export interface SurveyInactive {
  url: string
}

interface SurveyAnswers {
  [key: number]: Answer
}

interface SurveyTasks {
  [key: number]: Task[]
}

export interface SurveyActiveRaw {
  url: string
  pk: number
  valid_since: string
  valid_until: string
  locked: boolean
  created_by: string
  author_role: string
  version: string
  prefix: string
  distributor_pk: number
  program: null
  answers: Answer[]
}

export type SurveyActive = Omit<SurveyActiveRaw, 'answers'> & {
  answers: SurveyAnswers
  tasks: SurveyTasks
}
