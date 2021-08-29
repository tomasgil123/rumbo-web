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
  //area_pk: number
  guidelinePk: number
  //guideline_name: string
}

export interface TaskStatus {
  status: string
  color: string
}
