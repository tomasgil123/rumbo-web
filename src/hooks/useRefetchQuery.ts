import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

const useRefetchQuery = (query: string): void => {
  const cache = useQueryClient()
  useEffect(() => {
    return function refetchQueries(): void {
      cache.invalidateQueries(query)
    }
  }, [])
}

export default useRefetchQuery
