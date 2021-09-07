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
  modulesApprovedStatus: boolean[]
  requiredGuidelinesApprovedStatus: boolean[]
  numberRequiredGuidelines: number
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
  const [modulesApprovedStatus, setModulesApprovedStatus] = useState<boolean[]>([])
  const [requiredGuidelinesApprovedStatus, setRequiredGuidelinesApprovedStatus] = useState<
    boolean[]
  >([])
  const [numberRequiredGuidelines, setNumberRequiredGuidelines] = useState(0)

  useEffect(() => {
    console.log('use effect useAreaCalculations')
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
          survey.is_audit
        )

        setIsAreaAprroved(areaResults.isApproved())
        setAreaPoints(areaResults.getGivenPoints())
        setAreaPercentage(areaResults.getPointsPercent())
        setNumberUnapprovedRequiredGuidelines(areaResults.getNumberUnapprovedRequiredGuidelines())
        setModulesApprovedStatus(
          areaResults.getModulesApprovedStatus().map((module) => module.approved)
        )
        setRequiredGuidelinesApprovedStatus(
          areaResults.getRequiredGuidelinesApprovedStatus().map((guideline) => guideline.approved)
        )
        setNumberRequiredGuidelines(areaResults.getNumberRequiredGuidelines())
      }
    }
  }, [survey?.pk])

  return {
    isAreaApproved,
    areaPoints,
    areaPercentage,
    numberUnapprovedRequiredGuidelines,
    modulesApprovedStatus,
    requiredGuidelinesApprovedStatus,
    numberRequiredGuidelines,
  }
}

export default useAreaCalculations
