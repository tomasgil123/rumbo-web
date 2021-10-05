//types
import { Module } from 'types/module'
import { AuditProgram, AuditProgramModules, AuditProgramAreas } from 'types/auditProgram'

export const getModulesArea = (modulePks: number[], modules: AuditProgramModules): Module[] => {
  const modulesArea: Module[] = []
  modulePks.forEach((modulePk: number) => {
    modulesArea.push(modules[modulePk])
  })
  return modulesArea
}

export const getUnEsentialAreas = (auditPogram: AuditProgram): any => {
  const flatAreas = Object.values(auditPogram.areas)

  const unEsentialAreas = flatAreas.filter((area: any) => area.essential === false)
  return unEsentialAreas
}
