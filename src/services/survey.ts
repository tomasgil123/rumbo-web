import { AxiosResponse } from 'axios'
import axios from 'interceptors'
// utils
import { flatInitialDataDistributorSurvey } from 'utils/initialData'
// types
import { SurveyActiveRaw, SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
interface AnswerResponse {
  status: number
  data: SurveyActive | null
}

export const getSurveyData = async (
  surveyUrl: string,
  auditProgram: AuditProgram | null
): Promise<AnswerResponse> => {
  const response: AxiosResponse<SurveyActiveRaw> = await axios.get(`${surveyUrl}?version=2`)
  const surveyActive = response.data
    ? (flatInitialDataDistributorSurvey(
        response.data,
        auditProgram as AuditProgram
      ) as SurveyActive)
    : null

  return { status: response.status, data: surveyActive }
}
