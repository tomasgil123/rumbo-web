import React from 'react'
import { useParams } from 'react-router-dom'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import Area from './area'
// utils
import useInitialData from 'hooks/useInitialData'
import useSurveyData from 'hooks/useSurveyData'
import { capitalizeFirstLetter } from 'utils'
// types
import { AuditProgram } from 'types/auditProgram'
import { SurveyActive } from 'types/survey'
// context
import { ChangesMadeProvider } from 'domain/area/changesMadeContext'

type SurveyPk = {
  surveyPk: string
}

const Survey = (): JSX.Element => {
  const { surveyPk } = useParams<SurveyPk>()

  const { isLoading, error, auditProgram } = useInitialData()
  const { isLoadingSurvey, errorSurvey, survey } = useSurveyData(
    `/api/v1/surveys/${surveyPk}/`,
    auditProgram as AuditProgram
  )

  if (isLoading || isLoadingSurvey)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorSurvey)
    return <div>Ha ocurrido un error al cargar los datos de la encuesta</div>

  const areas = Object.values((auditProgram as AuditProgram).areas)
  const surveyDate = new Date((survey as SurveyActive).valid_since)
  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="shadow-md rounded bg-white w-full p-4 md:text-xl font-bold text-gray-700 text-center">{`${capitalizeFirstLetter(
        surveyDate.toLocaleString('es-ES', {
          month: 'long',
        })
      )}-${surveyDate.getFullYear()}`}</div>
      <div>
        {areas.map((area) => (
          <Link to={`${surveyPk}/area/${area.pk}`} key={area.pk}>
            <div className="bg-white shadow-md w-full my-2 p-2">{area.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const SurveyScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route exact path={`${match.path}/:surveyPk`}>
          <Survey />
        </Route>
        <Route exact path={`${match.path}/:surveyPk/area/:areaPk`}>
          <ChangesMadeProvider>
            <Area />
          </ChangesMadeProvider>
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(SurveyScreen)
