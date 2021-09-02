import { ModuleRaw } from './module'

export interface AreaRaw {
  pk: number
  name: string
  description: string
  color: string
  logo: string | null
  approved: boolean
  essential: boolean
  required_points: number
  position: number
  attachments_count: number
  sum_only_if_approved: boolean
  modules: ModuleRaw[]
}

export type Area = Omit<AreaRaw, 'modules'> & { module_pks: number[] }
