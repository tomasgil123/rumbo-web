import { GuidelineRaw } from './guideline'

export interface ModuleRaw {
  pk: number
  name: string
  description: string
  module_type: string
  required_points: number
  color: string
  logo: string | null
  position: number
  sum_only_if_approved: boolean
  guidelines: GuidelineRaw[]
}

export type Module = Omit<ModuleRaw, 'guidelines'> & { guideline_pks: number[]; areaPk: number }
