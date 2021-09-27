import React from 'react'

interface AnswerTaskInput {
  answerType: 'b' | 'n' | 'p'
  value: any
  onChange: any
}

const AswerTaskInputComponent = ({ answerType, value, onChange }: AnswerTaskInput): JSX.Element => {
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

  return (
    <div className="">
      <span className="self-start pb-2 font-bold">Respuesta</span>
      {renderInput()}
    </div>
  )
}

export default AswerTaskInputComponent
