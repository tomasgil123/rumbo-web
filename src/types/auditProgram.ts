import { Area, AreaRaw } from './area'
import { Module } from './module'
import { Guideline } from './guideline'

export interface AuditProgramAreas {
  [key: number]: Area
}

export interface AuditProgramModules {
  [key: number]: Module
}

export interface AuditProgramGuidelines {
  [key: number]: Guideline
}

export interface AuditProgramRaw {
  pk: number
  name: string
  last_updated: string
  published: boolean
  editable: boolean
  country: string
  areas: AreaRaw[]
}

export type AuditProgram = Omit<AuditProgramRaw, 'areas'> & {
  areas: AuditProgramAreas
  modules: AuditProgramModules
  guidelines: AuditProgramGuidelines
}
