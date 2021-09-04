import React from 'react'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import ProgressCircle from 'components/progressCircle'
import IconCircle from 'components/iconCircle'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useSurveyCalculations from 'hooks/useSurveyCalculations'
import useAreaCalculations from 'hooks/useAreaCalculations'
// types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

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
  const { isApproved, points, percentage } = useSurveyCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram
  )
  const essentialAreaPk = auditProgram?.areas
    ? Object.values(auditProgram?.areas).find((area) => area.essential)
    : 0
  const { isAreaApproved, numberUnapprovedRequiredGuidelines } = useAreaCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram,
    essentialAreaPk
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
      <div className="rounded shadow-lg p-4">
        <div className="text-center text-primary-dark text-base md:text-xl ">
          Tareas plan operativo
        </div>

        <div className="flex flex-row justify-center ">
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-danger-light text-sm md:text-2xl" />
              <span>{taskByStatus.news.length}</span>
            </div>
            <p>Nuevas</p>
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-fire text-danger text-sm md:text-2xl"></i>
              {taskByStatus.expired.length}
            </div>
            <p>Vencidas</p>
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-primary-light text-sm md:text-2xl"></i>
              {taskByStatus.pending.length}
            </div>
            <p>Pendientes</p>
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-success text-sm md:text-2xl"></i>
              {taskByStatus.resolved.length}
            </div>
            <p>Resueltas</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row rounded shadow-lg p-4 mt-4 bg-white">
        <div className="flex-1 flex flex-col items-center md:ml-16">
          <div className="flex-grow pb-2 md:pb-4 md:text-lg text-gray-700">Puntaje total</div>
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
          <div className="text-center pb-2 md:pb-4 md:text-lg text-gray-700">
            Porcentaje de aprobación
          </div>
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
      <div className="pt-6 md:pt-8">
        <div className="text-center pb-4 md:pb-4 md:text-lg font-bold text-gray-700">
          LINEAMIENTOS BASICOS
        </div>
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col items-center md:ml-16">
            <div className="pb-2 md:pb-4 md:text-lg text-gray-700">Desaprobados</div>
            <ProgressCircle
              progresses={[
                {
                  percent: 100,
                  color: isAreaApproved ? 'text-success-light' : 'text-danger-light',
                },
                { percent: 0, color: isAreaApproved ? 'text-success' : 'text-danger' },
              ]}
              value={numberUnapprovedRequiredGuidelines}
              isPercentage={false}
            />
          </div>
          <div className="flex-1 flex flex-col items-center md:mr-16">
            <div className="pb-2 md:pb-4 md:text-lg text-gray-700">No aprobado</div>
            {isAreaApproved ? (
              <IconCircle
                bgColor="text-success-light"
                icon={<i className="icon-like text-success"></i>}
              />
            ) : (
              <IconCircle
                bgColor="text-danger-light"
                icon={<i className="icon-dislike text-danger"></i>}
              />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Layout(DashboardScreen)
