import { useState, useEffect } from 'react'
// calculations
import Area from 'calculations/areas'
import StatisticsHelpers from 'calculations/statisticsHelpers'
// types
import { AuditProgram } from 'types/auditProgram'
import { SurveyActive } from 'types/survey'

interface Calculations {
  isAreaApproved: boolean
  areaPoints: number
  areaPercentage: number
  numberUnapprovedRequiredGuidelines: number
}

const useAreaCalculations = (
  survey: SurveyActive,
  auditProgram: AuditProgram,
  areaPk: number
): Calculations => {
  const [isAreaApproved, setIsAreaAprroved] = useState(false)
  const [areaPoints, setAreaPoints] = useState(0)
  const [areaPercentage, setAreaPercentage] = useState(0)
  const [numberUnapprovedRequiredGuidelines, setNumberUnapprovedRequiredGuidelines] = useState(0)

  useEffect(() => {
    if (survey) {
      if ((survey as SurveyActive)?.answers) {
        const chosenArea = auditProgram.areas[areaPk]
        const areaResults = new Area(
          chosenArea,
          auditProgram?.guidelines,
          StatisticsHelpers.generateAnswers(
            (survey as SurveyActive)?.answers,
            Object.keys(auditProgram?.guidelines)
          ),
          auditProgram?.modules,
          false
        )

        setIsAreaAprroved(areaResults.isApproved())
        setAreaPoints(areaResults.getGivenPoints())
        setAreaPercentage(areaResults.getPointsPercent())
        setNumberUnapprovedRequiredGuidelines(areaResults.getNumberUnapprovedRequiredGuidelines())
      }
    }
  }, [survey])

  return {
    isAreaApproved,
    areaPoints,
    areaPercentage,
    numberUnapprovedRequiredGuidelines,
  }
}

export default useAreaCalculations
