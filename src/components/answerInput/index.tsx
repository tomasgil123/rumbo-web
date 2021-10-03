import React, { useLayoutEffect, useState } from 'react'
// components
import HandsSelect from './handsSelect'
import EvaluationLines from './evaluationLines'
// utils
import { getEvaluationLinesFromDescription } from 'utils/guideline'

interface AnswerTaskInput {
  answerType: 'b' | 'n' | 'p'
  value: any
  onChange: any
  guidelineDescription: string
  screen: 'task' | 'area'
}

export const inRange = (value: number, min: number | string, max: number | string): boolean => {
  return value <= Number(max) && value >= Number(min)
}

const AswerTaskInputComponent = ({
  answerType,
  value,
  onChange,
  guidelineDescription,
  screen,
}: AnswerTaskInput): JSX.Element => {
  const [evaluationLines, setEvaluationLines] = useState<string[]>([])

  useLayoutEffect(() => {
    // TODO: refactor component to only use necesary code
    // this is only needed if answerType === "n" || answerType === "n"
    const { evaluationLines } = getEvaluationLinesFromDescription(guidelineDescription)
    setEvaluationLines(evaluationLines)
  }, [guidelineDescription])

  const renderInput = (): JSX.Element => {
    switch (answerType) {
      case 'b':
        return (
          <div>
            {screen === 'task' && (
              <select
                value={value ? value : 'default'}
                onChange={onChange}
                className="rounded w-60 p-2 outline-none border border-gray-300"
              >
                <option value="default" disabled>
                  -- Selecciona una respuesta --
                </option>
                <option value="1.00">Si</option>
                <option value="0">No</option>
              </select>
            )}
            {screen === 'area' && <HandsSelect value={value} onChange={onChange} />}
          </div>
        )
      case 'n':
        return (
          <div>
            <input
              className="rounded p-2 w-full outline-none border border-gray-300"
              value={value}
              onChange={onChange}
              type="number"
            />
          </div>
        )
      case 'p':
        return (
          <div className="flex">
            <input
              className="rounded p-2 w-full outline-none border border-gray-300"
              value={value}
              onChange={onChange}
              type="number"
            />
            <span className="font-bold pt-2 pl-1">%</span>
          </div>
        )
    }
  }

  return (
    <div>
      {screen === 'task' && (
        <>
          <span className="self-start pb-2 font-bold">Respuesta</span>
        </>
      )}
      {screen === 'task' && (
        <>
          {evaluationLines.length > 1 && (
            <div className="py-2">{EvaluationLines(evaluationLines)}</div>
          )}
        </>
      )}
      {renderInput()}
    </div>
  )
}

export default AswerTaskInputComponent
