import React from 'react'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
// calculations
import Survey from 'calculations/surveys'
import StatisticsHelpers from 'calculations/statisticsHelpers'
// types
import { SurveyActive } from 'types/survey'

const DashboardScreen = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>An error has occurred</div>

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
  }

  console.log('data', auditProgram)
  console.log('survey', survey)

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="rounded shadow-lg p-4">
        <div>Tareas plan operativo</div>
        <div>
          <i className="icon-note"></i>
        </div>
      </div>
      <div className="rounded shadow-lg p-4">
        <div>Performance</div>
      </div>
    </div>
  )
}

export default Layout(DashboardScreen)
