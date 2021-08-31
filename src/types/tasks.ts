export interface TaskRaw {
  pk: number
  created_by: string
  assigned_to: string
  description: string
  deadline: string | null
  last_change: string
  status: string
}

export interface Task extends TaskRaw {
  areaPk: number
  modulePk: number
  guidelinePk: number
  guidelineName: string
}

export interface TaskStatus {
  status: string
  color: string
}
