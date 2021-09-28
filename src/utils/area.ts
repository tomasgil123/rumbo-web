//types
import { Module } from 'types/module'
import { AuditProgramModules } from 'types/auditProgram'

export const getModulesArea = (modulePks: number[], modules: AuditProgramModules): Module[] => {
  const modulesArea: Module[] = []
  modulePks.forEach((modulePk: number) => {
    modulesArea.push(modules[modulePk])
  })
  return modulesArea
}
