export interface TaskRaw {
  pk: number
  created_by: string
  assigned_to: string
  description: string
  deadline: string | null
  last_change: string
  status: string
}

export type TaskUpdate = Omit<TaskRaw, 'created_by' | 'last_change'>

export interface Task extends TaskRaw {
  areaPk: number
  modulePk: number
  guidelinePk: number
  guidelineName: string
  answerType: 'b' | 'n' | 'p'
}

export enum TaskStatus {
  new = 'Nuevas',
  pending = 'Pendientes',
  expired = 'Vencidas',
  done = 'Hechas',
}

export interface TasksGroupedByStatus {
  Nuevas: Task[]
  Pendientes: Task[]
  Vencidas: Task[]
  Hechas: Task[]
}

export type TypeTaskStatus =
  | TaskStatus.new
  | TaskStatus.pending
  | TaskStatus.expired
  | TaskStatus.done
