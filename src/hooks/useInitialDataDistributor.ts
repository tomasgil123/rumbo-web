import { useQuery } from 'react-query'
import axios from 'interceptors'
// utils
import { flatInitialDataDistributorSurvey } from 'utils/initialData'
// types
import { SurveyActive, SurveyInactive } from 'types/survey'

interface InitialDataDistributor {
  isLoadingDistributor: boolean
  errorDistributor: unknown
  survey: SurveyActive | SurveyInactive | null
}

const useInitialDataDistributor = (distributorId: number | null): InitialDataDistributor => {
  const { isLoading, error, data } = useQuery(
    'initialDataDistributorId',
    () =>
      axios.get(`/api/v1/initialData?distributor_id=${distributorId}&version=2`).then((res) => res),
    {
      // The query will not execute until the distributorId exists
      enabled: !!distributorId,
    }
  )
  const surveyActive = data
    ? flatInitialDataDistributorSurvey(data.data.distributors[0].surveys[0])
    : null

  return {
    isLoadingDistributor: isLoading,
    errorDistributor: error,
    survey: surveyActive,
  }
}

export default useInitialDataDistributor
