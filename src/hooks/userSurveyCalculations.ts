import { useState, useEffect } from 'react'
// calculations
import Survey from 'calculations/surveys'
import StatisticsHelpers from 'calculations/statisticsHelpers'
// types
import { AuditProgram } from 'types/auditProgram'
import { SurveyActive } from 'types/survey'

interface Calculations {
  isApproved: boolean
  points: number
  percentage: number
}

const useSurveyCalculations = (survey: SurveyActive, auditProgram: AuditProgram): Calculations => {
  const [isApproved, setIsAprroved] = useState(false)
  const [points, setPoints] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (survey) {
      // we create a Survey object to find out if the survey is approved
      // and the points the user got
      if ((survey as SurveyActive)?.answers) {
        const surveyResults = new Survey(
          { isAudit: false },
          auditProgram?.guidelines,
          StatisticsHelpers.generateAnswers(
            (survey as SurveyActive)?.answers,
            auditProgram?.guidelines
          ),
          Object.values(auditProgram?.areas as any),
          auditProgram?.modules
        )
        console.log('percent', surveyResults.getPointsPercent())
        console.log('is aproved', surveyResults.isApproved())
        console.log('points', surveyResults.getGivenPoints())
        setIsAprroved(surveyResults.isApproved())
        setPoints(surveyResults.getGivenPoints())
        setPercentage(surveyResults.getPointsPercent())
      }
    }
  }, [survey])

  return {
    isApproved,
    points,
    percentage,
  }
}

export default useSurveyCalculations
