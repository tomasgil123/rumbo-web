import { AuditProgram, AuditProgramRaw } from 'types/auditProgram'
import { AreaRaw, Area } from 'types/area'
import { SurveyActive, SurveyActiveRaw, SurveyInactive } from 'types/survey'
import { Answer } from 'types/answer'

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
      module_pks: modules.map((module) => module.pk),
    }
    flatAuditProgram.areas[area.pk] = areWithModulePks

    modules.forEach((module) => {
      const { guidelines, ...mainSpecsModule } = module
      const moduleWithGuidelinePks = {
        ...mainSpecsModule,
        areaPk: area.pk,
        guideline_pks: guidelines.map((guideline) => guideline.pk),
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
  initialData: SurveyActiveRaw | SurveyInactive,
  auditProgram: AuditProgram
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
      if (tasks.length > 0) {
        const tasksWithGuidelinePk = tasks.map((task) => {
          const areaPk = auditProgram.guidelines[answer.guideline_pk].areaPk
          const modulePk = auditProgram.guidelines[answer.guideline_pk].modulePk
          const guidelineName = auditProgram.guidelines[answer.guideline_pk].name
          const evaluationLines = [...auditProgram.guidelines[answer.guideline_pk].evaluation_lines]
          const answerType = auditProgram.guidelines[answer.guideline_pk].answer_type
          const valueMin = auditProgram.guidelines[answer.guideline_pk].value_min
          const valueMax = auditProgram.guidelines[answer.guideline_pk].value_max

          const taskWithGuidelinePk = {
            ...task,
            guidelinePk: answer.guideline_pk,
            guidelineName,
            modulePk,
            areaPk,
            evaluationLines,
            answerType,
            valueMin,
            valueMax,
          }
          return taskWithGuidelinePk
        })
        flatMainSurvey.tasks[answer.guideline_pk] = tasksWithGuidelinePk
      }
    })
    return flatMainSurvey
  } else {
    return mainSurvey
  }
}
