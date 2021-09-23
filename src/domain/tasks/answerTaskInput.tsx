import React, { useLayoutEffect, useState } from 'react'

interface AnswerTaskInput {
  answerType: 'b' | 'n' | 'p'
  value: any
  onChange: any
  guidelineDescription: string
  screen: 'task' | 'area'
}

const AswerTaskInputComponent = ({
  answerType,
  value,
  onChange,
  guidelineDescription,
  screen,
}: AnswerTaskInput): JSX.Element => {
  const [description, setDescription] = useState('')
  const [evaluationLines, setEvaluationLines] = useState<string[]>([])

  useLayoutEffect(() => {
    const indexFirstAsterisk = guidelineDescription.indexOf('*')
    if (indexFirstAsterisk > -1) {
      try {
        setDescription(guidelineDescription.slice(0, indexFirstAsterisk))
        const evaluationLinesText = guidelineDescription
          .slice(indexFirstAsterisk, -1)
          .replace(/(\r\n|\n|\r)/gm, '')
        const listOfEvalutationLines = evaluationLinesText.split('*').filter((text) => text)
        setEvaluationLines(listOfEvalutationLines)
      } catch (err) {
        setDescription(guidelineDescription)
      }
    } else {
      setDescription(guidelineDescription)
    }
  }, [guidelineDescription])

  const renderInput = (): JSX.Element => {
    switch (answerType) {
      case 'b':
        return (
          <div>
            <select
              value={value ? value : 'default'}
              onChange={onChange}
              className="rounded w-60 p-2 mb-4 outline-none border border-gray-300"
            >
              <option value="default" disabled>
                -- Selecciona una respuesta --
              </option>
              <option value="1.00">Si</option>
              <option value="0">No</option>
            </select>
          </div>
        )
      case 'n':
        return (
          <div>
            <input
              className="rounded p-2 mb-4 w-full outline-none border border-gray-300"
              value={value}
              onChange={onChange}
              type="number"
            />
          </div>
        )
      case 'p':
        return (
          <div>
            <input
              className="rounded p-2 mb-4 w-full outline-none border border-gray-300"
              value={value}
              onChange={onChange}
              type="number"
            />
          </div>
        )
    }
  }

  const renderEvaluationLines = (): JSX.Element | null => {
    try {
      return (
        <div className="flex flex-col item-center pb-4">
          {evaluationLines.map((evaluationLine, index) => (
            <span className="text-xs text-primary" key={index}>{`${evaluationLine
              .split('>')[0]
              .replace(/\s+/g, ' ')
              .trim()} = ${evaluationLine.split('>')[1].replace(/\s+/g, ' ').trim()}`}</span>
          ))}
        </div>
      )
    } catch (err) {
      return null
    }
  }

  return (
    <div>
      {screen === 'task' && (
        <>
          <span className="self-start pb-2 font-bold">Respuesta</span>
        </>
      )}
      {screen === 'area' && (
        <>
          <span>{description}</span>{' '}
        </>
      )}
      {evaluationLines.length > 1 && renderEvaluationLines()}
      {renderInput()}
    </div>
  )
}

export default AswerTaskInputComponent
