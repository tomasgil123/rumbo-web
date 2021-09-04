import React from 'react'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import ProgressCircle from 'components/progressCircle'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useSurveyCalculations from 'hooks/userSurveyCalculations'
// types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

const DashboardScreen = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )
  const { isApproved, points, percentage } = useSurveyCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram
  )

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>An error has occurred</div>

  console.log('data', auditProgram)
  console.log('survey', survey)

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="rounded shadow-lg p-4 bg-white">
        <div>Tareas plan operativo</div>
        <div>
          <i className="icon-note"></i>
        </div>
      </div>
      <div className="flex flex-row rounded shadow-lg p-4 mt-4 bg-white">
        <div className="flex-1 flex flex-col items-center md:ml-16">
          <div className="flex-grow pb-2 md:pb-4 md:text-lg">Puntaje total</div>
          <ProgressCircle
            progresses={[
              { percent: 100, color: isApproved ? 'text-success-light' : 'text-danger-light' },
              { percent: points, color: isApproved ? 'text-success' : 'text-danger' },
            ]}
            value={points}
            isPercentage={false}
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:mr-16">
          <div className="text-center pb-2 md:pb-4 md:text-lg">Porcentaje de aprobación</div>
          <ProgressCircle
            progresses={[
              { percent: 100, color: isApproved ? 'text-success-light' : 'text-danger-light' },
              { percent: percentage, color: isApproved ? 'text-success' : 'text-danger' },
            ]}
            value={percentage}
            isPercentage={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Layout(DashboardScreen)
