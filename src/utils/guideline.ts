//types
import { Module } from 'types/module'
import { Area } from 'types/area'
import { AuditProgram } from 'types/auditProgram'

export type EvaluationLine = string[] | []
interface EvaluationLines {
  cleanDescription: string
  evaluationLines: EvaluationLine
}

export const getEvaluationLinesFromDescription = (
  guidelineDescription: string
): EvaluationLines => {
  let cleanDescription = ''
  let evaluationLines: EvaluationLine = []
  const indexFirstAsterisk = guidelineDescription.indexOf('*')
  if (indexFirstAsterisk > -1) {
    try {
      cleanDescription = guidelineDescription.slice(0, indexFirstAsterisk)
      const evaluationLinesText = guidelineDescription
        .slice(indexFirstAsterisk, -1)
        .replace(/(\r\n|\n|\r)/gm, '')
      const listOfEvalutationLines = evaluationLinesText.split('*').filter((text) => text)
      evaluationLines = listOfEvalutationLines
    } catch (err) {
      cleanDescription = guidelineDescription
    }
  } else {
    cleanDescription = guidelineDescription
  }
  return {
    cleanDescription,
    evaluationLines,
  }
}

export const doesGuidelineBelongEssentialArea = (
  guidelinePk: number,
  auditProgram: AuditProgram
): boolean => {
  const modules: Module[] = Object.values(auditProgram.modules)
  const moduleGuideline = modules.find((module) => module.guideline_pks.includes(guidelinePk))
  if (moduleGuideline) {
    const areas: Area[] = Object.values(auditProgram.areas)
    const areaGuideline = areas.find((area) => area.module_pks.includes(moduleGuideline.pk))
    return areaGuideline ? areaGuideline.essential : false
  } else {
    return false
  }
}
