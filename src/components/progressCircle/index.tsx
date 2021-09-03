import React, { useContext } from 'react'
import { motion } from 'framer-motion'
// components
import { IntersectionContext } from 'components/intersectionObserver'
import Counter from 'components/counter'
// utils
import { generateVariants } from './utils'

//types
export interface Progress {
  percent: number
  color: string
}

interface Props {
  progresses: Progress[]
  value: number
  isPercentage: boolean
  duration?: number
  delay?: number
  easing?: string
  emptyStroke?: string
  emptyStrokeOpacity?: number
  strokeWidth?: number
  size?: number
  unavaliableData?: boolean
}

const ProgressCircle = ({
  progresses,
  value,
  isPercentage,
  emptyStroke = 'text-disabled',
  emptyStrokeOpacity = 0.25,
  duration = 1.5,
  delay = 0.5,
  strokeWidth = 4,
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
      <div className="relative flex items-center justify-center w-20 md:w-28 h-20 md:h-28">
        <div className="absolute font-bold text-base md:text-xl">
          {unavaliableData ? (
            <div className="text-center text-sm">
              <div>NO DISPONIBLE</div>
            </div>
          ) : (
            <Counter
              isPercentage={isPercentage}
              color={progresses[1].color}
              valueTo={value}
              totalDuration={duration + delay}
            />
          )}
        </div>
        <div className="relative w-20 md:w-28 h-20 md:h-28">
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
              className={`circle stroke-current ${emptyStroke}`}
              strokeWidth={strokeWidth}
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
                  className={`stroke-current ${progresses[index].color}`}
                  strokeWidth={strokeWidth}
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
