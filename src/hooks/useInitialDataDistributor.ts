import { useQuery } from 'react-query'
// services
import { getInitialDataDistributor } from 'services/initialData'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

interface InitialDataDistributor {
  isLoadingDistributor: boolean
  errorDistributor: unknown
  distributorName: string | undefined
  distributorLogo: string | undefined
  survey: SurveyActive | SurveyInactive | null | undefined
  previousSurveys: SurveyInactive[] | undefined
  refetch: () => void
}

const useInitialDataDistributor = (
  distributorId: number | null,
  auditProgram: AuditProgram | null
): InitialDataDistributor => {
  const { isLoading, error, data, refetch } = useQuery(
    ['initialDataDistributorId', distributorId],
    () => getInitialDataDistributor(distributorId as number, auditProgram),
    {
      // The query will not execute until the distributorId exists
      enabled: !!distributorId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const survey = data?.data.surveyActive

  const previousSurveys = data?.data.previousSurveys

  const distributorName = data?.data.distributorName

  const distributorLogo = data?.data.distributorLogo

  return {
    isLoadingDistributor: isLoading,
    errorDistributor: error,
    distributorName: distributorName,
    distributorLogo: distributorLogo,
    survey,
    previousSurveys,
    refetch,
  }
}

export default useInitialDataDistributor
