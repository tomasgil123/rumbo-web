import React, { useState } from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import ProgressCircle from 'components/progressCircle'
import IconCircle from 'components/iconCircle'
import SurveySummaryPresentational from 'domain/dashboard/surveySummaryPresentational'
import SurveySummaryContainer from 'domain/dashboard/surveySummaryContainer'
import UnansweredGuidelines from './unansweredGuidelines'
import UnansweredGuidelineButton from 'domain/dashboard/unansweredGuidelineButton'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useSurveyCalculations from 'hooks/useSurveyCalculations'
import useAreaCalculations from 'hooks/useAreaCalculations'
import { getTaskByStatus, getFlatArrayFromObjectValues, getUnansweredGuidelines } from 'utils/tasks'
import { capitalizeFirstLetter } from 'utils'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { TaskStatus } from 'types/tasks'

const Dashboard = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey, previousSurveys } =
    useInitialDataDistributor(distributorId, auditProgram)

  const { isApproved, points, percentage } = useSurveyCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram
  )

  const [visiblePreviousSurveys, setVisiblePreviousSurveys] = useState<SurveyInactive[]>([])

  const onSeeMore = (): void => {
    const surveysToSee = (previousSurveys as SurveyInactive[])?.slice(
      visiblePreviousSurveys.length,
      visiblePreviousSurveys.length + 3
    )
    setVisiblePreviousSurveys([...visiblePreviousSurveys, ...surveysToSee])
  }

  const onSeeLess = (): void => {
    setVisiblePreviousSurveys([])
  }

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

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  const arrayFlatTasks = getFlatArrayFromObjectValues(survey as SurveyActive)
  const taskByStatus = getTaskByStatus(arrayFlatTasks)
  const arrayOfUnansweredGuidelines = getUnansweredGuidelines(
    survey as SurveyActive,
    auditProgram as AuditProgram
  )
  if (arrayFlatTasks.length === 0) {
    return <div>Todavia no se ha creado ninguna tarea</div>
  }

  console.log('visiblePreviousSurveys', visiblePreviousSurveys)

  const surveyDate = new Date((survey as SurveyActive).valid_since)
  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="rounded shadow-lg p-4 bg-white">
        <div className="text-center text-primary-dark text-base md:text-xl ">
          Tareas plan operativo
        </div>

        <div className="flex flex-row justify-center ">
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-danger-light text-sm md:text-2xl" />
              <span>{taskByStatus[TaskStatus.new].length}</span>
            </div>
            <p>{TaskStatus.new}</p>
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-fire text-danger text-sm md:text-2xl"></i>
              {taskByStatus[TaskStatus.expired].length}
            </div>
            <p>{TaskStatus.expired}</p>
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-primary-light text-sm md:text-2xl"></i>
              {taskByStatus[TaskStatus.pending].length}
            </div>
            <p>{TaskStatus.pending}</p>
          </div>
          <div className="p-2 md:p-4">
            <div className="flex items-center justify-around">
              <i className="icon-note text-success text-sm md:text-2xl"></i>
              {taskByStatus[TaskStatus.done].length}
            </div>
            <p>{TaskStatus.done}</p>
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
      <Link to={`/area/${essentialAreaPk.pk}`}>
        <div className="pt-6 md:pt-8">
          <div className="text-center pb-4 md:text-lg font-bold text-gray-700">
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
              <div className="pb-2 md:pb-4 md:text-lg text-gray-700">
                {isAreaApproved ? 'Aprobado' : 'No aprobado'}
              </div>
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
          </div>
        </div>
      </Link>

      <div className="m-4 w-30 py-8">
        {arrayOfUnansweredGuidelines.length > 0 && <UnansweredGuidelineButton />}
      </div>
      <SurveySummaryPresentational
        points={points}
        isApproved={isApproved}
        percentage={percentage}
        month={`${capitalizeFirstLetter(
          surveyDate.toLocaleString('es-ES', {
            month: 'long',
          })
        )}-${surveyDate.getFullYear()}`}
      />
      <div className="my-4 md:my-6">
        {visiblePreviousSurveys.map((surveyUrl) => (
          <SurveySummaryContainer
            surveyUrl={surveyUrl.url}
            auditProgram={auditProgram as AuditProgram}
          />
        ))}
      </div>
      {(previousSurveys as SurveyInactive[]).length > 0 && (
        <div className="flex flex-col md:flex-row justify-center">
          <button
            onClick={onSeeMore}
            className=" mx-2 h-12 cursor-pointer rounded-lg w-40 p-2 bg-primary-light text-white font-bold"
          >
            Ver más
          </button>
          {visiblePreviousSurveys.length > 0 && (
            <button
              onClick={onSeeLess}
              className="mx-2 h-12 cursor-pointer rounded-lg w-40 p-2 border border-solid border-primary-light text-primary-light bg-white font-bold"
            >
              Ver menos
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const DashboardScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}

      <Switch>
        <Route path={`${match.path}/lineamientos-sin-contestar`}>
          <UnansweredGuidelines />
        </Route>
        <Route path={match.path}>
          <Dashboard />
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(DashboardScreen)
