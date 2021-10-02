import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

const useRefetchQuery = (query: string, wereChangesMade: boolean): void => {
  const cache = useQueryClient()
  useEffect(() => {
    return function refetchQueries(): void {
      if (wereChangesMade) {
        cache.invalidateQueries(query)
      }
    }
  }, [])
}

export default useRefetchQuery
