import { AuditProgram, AuditProgramRaw } from 'types/auditProgram'
import { AreaRaw, Area } from 'types/area'
import { SurveyActive, SurveyActiveRaw, SurveyInactive } from 'types/survey'
import { Answer } from 'types/answer'
import { Task } from 'types/tasks'

export const flatInitialData = (initialData: AuditProgramRaw): AuditProgram => {
  let flatAuditProgram: AuditProgram = {} as AuditProgram
  const auditProgram = JSON.parse(JSON.stringify(initialData))
  const { areas, ...mainSpecs } = auditProgram
  flatAuditProgram = { ...mainSpecs }
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

export const flatInitialDataDistributorSurvey = (
  initialData: SurveyActiveRaw | SurveyInactive
): SurveyActive | SurveyInactive => {
  let flatMainSurvey: SurveyActive = {} as SurveyActive
  const mainSurvey = JSON.parse(JSON.stringify(initialData))

  if (mainSurvey.pk) {
    const { answers, ...mainSpecs } = mainSurvey
    flatMainSurvey = { ...mainSpecs }
    flatMainSurvey.answers = {}
    flatMainSurvey.tasks = {}

    answers.forEach((answer: Answer) => {
      flatMainSurvey.answers[answer.guideline_pk] = JSON.parse(JSON.stringify(answer))
      const { tasks } = answer
      const tasksWithGuidelinePk = tasks.map((task) => {
        const taskWithGuidelinePk = { ...task, guidelinePk: answer.guideline_pk }
        return taskWithGuidelinePk
      })
      flatMainSurvey.tasks[answer.guideline_pk] = tasksWithGuidelinePk
    })
    return flatMainSurvey
  } else {
    return mainSurvey
  }
}
