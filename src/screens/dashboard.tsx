import React from 'react'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import ProgressCircle from 'components/progressCircle'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
// calculations
import Survey from 'calculations/surveys'
import StatisticsHelpers from 'calculations/statisticsHelpers'
// types
import { SurveyActive } from 'types/survey'

import { arrayOfTasks } from 'arrayOfTask'
import { getTaskByStatus } from 'utils/tasks'

const DashboardScreen = (): JSX.Element => {
  const taskByStatus = getTaskByStatus(arrayOfTasks)
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
        <div className="text-center text-primary-dark text-sm md:text-1xl ">
          Tareas plan operativo
        </div>

        <div className="flex flex-row justify-center ">
          <div className="p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-danger-light text-sm md:text-2xl" />
              <span>{taskByStatus.news.length}</span>
            </div>
            <p>Nuevas</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-around">
              <i className="icon-fire text-danger text-sm md:text-2xl"></i>
              {taskByStatus.expired.length}
            </div>
            <p>Vencidas</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-primary-light text-sm md:text-2xl"></i>
              {taskByStatus.pending.length}
            </div>
            <p>Pendientes</p>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-success text-sm md:text-2xl"></i>
              {taskByStatus.resolved.length}
            </div>
            <p>Resueltas</p>
          </div>
        </div>
      </div>
      <div className="rounded shadow-lg p-4">
        <div>Performance</div>
        <div>
          <ProgressCircle
            progresses={[
              { percent: 100, color: '#cde1c9' },
              { percent: 20, color: '#5c9551' },
            ]}
            percentage={20}
            active={true}
          />
        </div>
      </div>
    </div>
  )
}

export default Layout(DashboardScreen)
