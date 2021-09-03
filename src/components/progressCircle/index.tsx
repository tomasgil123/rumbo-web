import React, { useContext } from 'react'
import { IntersectionContext } from 'components/intersectionObserver'
import { generateVariants } from './utils'

import { motion } from 'framer-motion'
import Counter from 'components/counter'

//types
export interface Progress {
  percent: number
  color: string
}

interface Props {
  progresses: Progress[]
  percentage: number
  duration?: number
  delay?: number
  easing?: string
  emptyStroke?: string
  emptyStrokeOpacity?: number
  strokeWidth?: number
  active: boolean
  size?: number
  unavaliableData?: boolean
}

const ProgressCircle = ({
  progresses,
  percentage,
  emptyStroke = '#999999',
  emptyStrokeOpacity = 0.25,
  duration = 1.5,
  delay = 0.5,
  strokeWidth = 5,
  active,
  size = 80,
  unavaliableData = false,
}: Props): JSX.Element => {
  const { inView } = useContext(IntersectionContext)
  const radius = 45
  const circumference = Math.ceil(2 * Math.PI * radius)

  const variants = generateVariants({
    percents: progresses.map((progress) => progress.percent),
    duration,
    delay,
  })

  return (
    <>
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute font-bold text-base">
          {unavaliableData ? (
            <div className="text-center text-sm">
              <div>NO DISPONIBLE</div>
            </div>
          ) : (
            <Counter valueTo={percentage} totalDuration={duration + delay} />
          )}
        </div>
        <div className="relative w-20 h-20">
          <svg
            viewBox="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={'100%'}
            height={'100%'}
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="circle"
              strokeWidth={strokeWidth}
              stroke={emptyStroke}
              strokeOpacity={emptyStrokeOpacity}
              fill="transparent"
            />
          </svg>
          <svg
            viewBox="0 0 100 100"
            width={'100%'}
            height={'100%'}
            style={{
              position: 'absolute',
              transform: 'rotate(-90deg)',
              top: '0px',
              left: '0px',
            }}
          >
            {variants.map(({ variant, fillPercents }, index) => {
              return (
                <motion.circle
                  cx="50"
                  cy="50"
                  r={radius}
                  strokeWidth={strokeWidth}
                  stroke={progresses[index].color}
                  fill="transparent"
                  strokeDashoffset={fillPercents}
                  strokeDasharray={circumference}
                  strokeLinecap="round"
                  variants={variant}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </>
  )
}

export default ProgressCircle
