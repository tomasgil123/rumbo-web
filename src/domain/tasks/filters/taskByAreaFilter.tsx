import React, { useState } from 'react'
import { areasNamesAndPks } from 'utils/areas'

interface Props {
  areas: areasNamesAndPks[]
  addAreaFilter: (areaPk: number) => void
}
const TaskByAreaFilter = ({ areas, addAreaFilter }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [areaName, setAreaName] = useState('')

  return (
    <div className="flex justify-center flex-col w-full">
      <div className="flex flex-row justify-center">
        <button onClick={(): void => setIsOpen(isOpen != true)} className="block overflow-hidden">
          <i className="icon-arrow-down mr-2 text-disabled text-sm md:text-lg"></i>
        </button>
        {areaName ? (
          <div className="underline"> {areaName}</div>
        ) : (
          <div className="underline">TODAS LAS AREAS</div>
        )}
      </div>
      {isOpen && (
        <div className=" font-semibold py-4 px-2 rounded-lg w-full mt-4 text-sm md:text-base">
          <ul>
            <li className="border-disabled p-1 border-b">
              <button
                onClick={(): void => {
                  addAreaFilter(0)
                  setIsOpen(false)
                  setAreaName('TODAS LAS AREAS')
                }}
              >
                <p className=" text-black hover:bg-primary-dark">todas las areas</p>
              </button>
            </li>
            {areas.map((area: areasNamesAndPks) => (
              <li className="border-disabled p-1 border-b">
                <button
                  onClick={(): void => {
                    addAreaFilter(area.pk)
                    setIsOpen(false)
                    setAreaName(area.name)
                  }}
                >
                  <p className=" text-black hover:bg-primary-dark">
                    {area.name.toLocaleLowerCase()}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TaskByAreaFilter
