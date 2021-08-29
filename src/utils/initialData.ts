import { AuditProgram, AuditProgramRaw } from 'types/auditProgram'
import { AreaRaw, Area } from 'types/area'

export const flatInitialData = (initialData: AuditProgramRaw): AuditProgram => {
  let flatAuditProgram: AuditProgram = {} as AuditProgram
  const auditProgram = JSON.parse(JSON.stringify(initialData))
  const { areas, ...mainSpecs } = auditProgram
  flatAuditProgram = { ...flatAuditProgram, ...mainSpecs }
  flatAuditProgram.areas = {}
  flatAuditProgram.modules = {}
  flatAuditProgram.guidelines = {}

  areas.forEach((area: AreaRaw) => {
    const { modules, ...mainSpecsArea } = area
    const areWithModulePks: Area = {
      ...mainSpecsArea,
      modulePks: modules.map((module) => module.pk),
    }
    flatAuditProgram.areas[area.pk] = areWithModulePks

    modules.forEach((module) => {
      const { guidelines, ...mainSpecsModule } = module
      const moduleWithGuidelinePks = {
        ...mainSpecsModule,
        areaPk: area.pk,
        guidelinePks: guidelines.map((guideline) => guideline.pk),
      }

      flatAuditProgram.modules[module.pk] = moduleWithGuidelinePks
      guidelines.forEach((guideline) => {
        const guidelineExtra = {
          ...JSON.parse(JSON.stringify(guideline)),
          areaPk: area.pk,
          modulePk: module.pk,
        }
        flatAuditProgram.guidelines[guideline.pk] = guidelineExtra
      })
    })
  })
  return flatAuditProgram
}
