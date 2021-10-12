//types
import { AuditProgramGuidelines } from 'types/auditProgram'
import { Guideline } from 'types/guideline'

export const getGuidelinesModule = (
  guidelinePks: number[],
  guidelines: AuditProgramGuidelines
): Guideline[] => {
  const guidelinesModule: Guideline[] = []
  guidelinePks.forEach((guidelinePk: number) => {
    guidelinesModule.push(guidelines[guidelinePk])
  })
  return guidelinesModule
}

export const getGuidelinesModuleObject = (
  guidelinePks: number[],
  guidelines: AuditProgramGuidelines
): AuditProgramGuidelines => {
  const guidelinesModule: AuditProgramGuidelines = {}
  guidelinePks.forEach((guidelinePk: number) => {
    guidelinesModule[guidelinePk] = guidelines[guidelinePk]
  })
  return guidelinesModule
}
