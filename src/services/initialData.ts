import { AxiosResponse } from 'axios'
import axios from 'interceptors'
// utils
import { flatInitialDataDistributorSurvey, flatInitialData } from 'utils/initialData'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'
import { AuditProgram, AuditProgramRaw } from 'types/auditProgram'

interface InitialDataDistributorResponse {
  status: number
  data: {
    surveyActive: SurveyActive | SurveyInactive | null
    previousSurveys: SurveyInactive[]
    distributorName: string
    distributorLogo: string
  }
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

  const previousSurveys = response.data.distributors[0].surveys.filter(
    (survey: { pk: any }) => !survey.pk
  )

  const distributorName = response.data ? response.data.distributors[0].name : null

  const distributorLogo = response.data ? response.data.distributors[0].logo : null

  return {
    status: response.status,
    data: { surveyActive, previousSurveys, distributorName, distributorLogo },
  }
}

interface InitialDataResponse {
  status: number
  data: {
    auditProgram: AuditProgram | null
    distributorIds: number[] | null
    userName: string | null
  }
}

export const getInitialData = async (): Promise<InitialDataResponse> => {
  const response: AxiosResponse<any> = await axios.get(`/api/v1/initialData?distributors_ids=true`)

  const auditProgram = response?.data
    ? flatInitialData((response?.data as any).audit_programs[0] as AuditProgramRaw)
    : null
  const distributorIds = response?.data ? response?.data.distributors_id : null

  const userName = response?.data ? response?.data.user.username : null

  return {
    status: response.status,
    data: { auditProgram, distributorIds, userName },
  }
}
