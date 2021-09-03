/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number): void {
  const savedCallback = useRef<() => void>(() => {})

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return (): void => clearInterval(id)
    }
  }, [delay])
}
