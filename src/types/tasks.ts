export interface Task {
  pk: number
  created_by: string
  assigned_to: string
  description: string
  deadline: string | null
  last_change: string
  status: string
  area_pk: number
  guideline_pk: number
  guideline_name: string
}

export interface TaskStatus {
  status: string
  color: string
}
