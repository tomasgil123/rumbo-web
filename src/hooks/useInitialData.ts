import { useQuery } from 'react-query'
// services
import { getInitialData } from 'services/initialData'
// types
import { AuditProgram } from 'types/auditProgram'
interface InitialData {
  isLoading: boolean
  error: unknown
  auditProgram: AuditProgram | null
  distributorIds: number[] | null
  userName: string | null
}

const useInitialData = (): InitialData => {
  const { isLoading, error, data } = useQuery('initialData', () => getInitialData(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const auditProgram = data?.data.auditProgram as AuditProgram | null

  const distributorIds = data?.data.distributorIds as number[] | null

  const userName = data?.data.userName as string | null

  return {
    isLoading,
    error,
    auditProgram,
    distributorIds,
    userName,
  }
}

export default useInitialData
