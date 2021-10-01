import { AxiosResponse } from 'axios'
import axios from 'interceptors'
// utils
import { flatInitialDataDistributorSurvey } from 'utils/initialData'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

interface InitialDataDistributorResponse {
  status: number
  data: SurveyActive | SurveyInactive | null
}

export const getInitialDataDistributor = async (
  distributorId: number,
  auditProgram: AuditProgram | null
): Promise<InitialDataDistributorResponse> => {
  const response: AxiosResponse<any> = await axios.get(
    `/api/v1/initialData?distributor_id=${distributorId}&version=2`
  )
  const surveyActive = response.data
    ? flatInitialDataDistributorSurvey(
        response.data.distributors[0].surveys[0],
        auditProgram as AuditProgram
      )
    : null
  return { status: response.status, data: surveyActive }
}
