/* eslint-disable no-constant-condition */
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'
// components
import SurveySummaryPresentational from './surveySummaryPresentational'
// utils
import useSurveyData from 'hooks/useSurveyData'
import useSurveyCalculations from 'hooks/useSurveyCalculations'
import { capitalizeFirstLetter } from 'utils'
// types
import { AuditProgram } from 'types/auditProgram'
import { SurveyActive } from 'types/survey'

interface SurveySummaryContainerModel {
  surveyUrl: string
  auditProgram: AuditProgram
}

const SurveySummaryContainer = ({
  surveyUrl,
  auditProgram,
}: SurveySummaryContainerModel): JSX.Element => {
  const { isLoadingSurvey, errorSurvey, survey } = useSurveyData(surveyUrl, auditProgram)
  const { isApproved, points, percentage } = useSurveyCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram
  )
  if (isLoadingSurvey)
    return (
      <div className="my-4">
        <ContentLoader
          speed={2}
          width={'100%'}
          height={300}
          viewBox="0 0 900 460"
          backgroundColor="#E5E7EB"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="60" rx="2" ry="2" width="100%" height="400" />
        </ContentLoader>
      </div>
    )

  if (errorSurvey)
    return <div className="rounded shadow-lg p-4 md:p-6 mt-4 bg-white">Ha ocurrido un error</div>
  const surveyDate = new Date((survey as SurveyActive).valid_since)
  return (
    <Link to={`encuesta/${(survey as SurveyActive).pk}`}>
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
    </Link>
  )
}

export default SurveySummaryContainer
