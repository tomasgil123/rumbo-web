import { useQuery } from 'react-query'
import axios from 'interceptors'
// utils
import { flatInitialData } from 'utils/initialData'
// types
import { AuditProgram, AuditProgramRaw } from 'types/auditProgram'
interface InitialData {
  isLoading: boolean
  error: unknown
  auditProgram: AuditProgram | null
  distributorIds: number[] | null
}

const useInitialData = (): InitialData => {
  const { isLoading, error, data } = useQuery('initialData', () =>
    axios.get('/api/v1/initialData?distributors_ids=true').then((res) => res)
  )

  const auditProgram = data
    ? flatInitialData((data as any).data.audit_programs[0] as AuditProgramRaw)
    : null
  const distributorIds = data ? data.data.distributors_id : null

  return {
    isLoading,
    error,
    auditProgram,
    distributorIds,
  }
}

export default useInitialData
