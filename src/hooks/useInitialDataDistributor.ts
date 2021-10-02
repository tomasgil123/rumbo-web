import { useQuery } from 'react-query'
// services
import { getInitialDataDistributor } from 'services/initialDataDistribuidor'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

interface InitialDataDistributor {
  isLoadingDistributor: boolean
  errorDistributor: unknown
  survey: SurveyActive | SurveyInactive | null | undefined
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

  const survey = data?.data

  return {
    isLoadingDistributor: isLoading,
    errorDistributor: error,
    survey: survey,
    refetch,
  }
}

export default useInitialDataDistributor
