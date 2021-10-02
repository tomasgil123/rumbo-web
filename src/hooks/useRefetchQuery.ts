import { useEffect } from 'react'

const useRefetchQuery = (wereChangesMade: boolean, refetch: () => void): void => {
  useEffect(() => {
    return function refetchQueries(): void {
      if (wereChangesMade) {
        refetch()
      }
    }
  }, [wereChangesMade])
}

export default useRefetchQuery
