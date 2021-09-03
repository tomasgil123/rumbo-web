import React, { useState, useContext } from 'react'

import { IntersectionContext } from 'components/intersectionObserver'
import { useInterval } from 'components/counter/utils'

interface Props {
  valueFrom?: number
  valueTo?: number
  totalDuration?: number
}

const Counter = ({ valueFrom = 0, valueTo = 100, totalDuration = 3.5 }: Props): JSX.Element => {
  const { inView } = useContext(IntersectionContext)
  const [count, setCount] = useState(valueFrom)

  useInterval(() => {
    if (inView && count < valueTo) {
      setCount(count + 1)
    }
  }, (totalDuration / valueTo) * 1000)

  return <div>{count}%</div>
}

export default Counter
