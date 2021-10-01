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
}

const useInitialDataDistributor = (
  distributorId: number | null,
  auditProgram: AuditProgram | null
): InitialDataDistributor => {
  const { isLoading, error, data } = useQuery(
    'initialDataDistributorId',
    () => getInitialDataDistributor(distributorId as number, auditProgram),
    {
      // The query will not execute until the distributorId exists
      enabled: !!distributorId,
    }
  )

  console.log('initialDataDistributorId', data)

  const survey = data?.data

  return {
    isLoadingDistributor: isLoading,
    errorDistributor: error,
    survey: survey,
  }
}

export default useInitialDataDistributor
