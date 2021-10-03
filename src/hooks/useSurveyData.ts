import { useQuery } from 'react-query'
// service
import { getSurveyData } from 'services/survey'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

interface SurveyData {
  isLoadingSurvey: boolean
  errorSurvey: unknown
  survey: SurveyActive | SurveyInactive | null | undefined
}

const useSurveyData = (surveyUrl: string, auditProgram: AuditProgram): SurveyData => {
  const { isLoading, error, data } = useQuery(
    ['survey', surveyUrl],
    () => getSurveyData(surveyUrl, auditProgram),
    {
      enabled: !!auditProgram,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const survey = data?.data

  return {
    isLoadingSurvey: isLoading,
    errorSurvey: error,
    survey,
  }
}

export default useSurveyData
