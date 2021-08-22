export interface Task {
  pk: number
  created_by: string
  assigned_to: string
  description: string
  deadline: string | null
  last_change: string
  status: string
  guideline_pk: string
}

export interface TaskStatus {
  status: string
  color: string
}
