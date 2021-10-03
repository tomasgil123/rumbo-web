import React, { useState } from 'react'
import { areasNamesAndPks } from 'utils/areas'

interface Props {
  areas: areasNamesAndPks[]
  addAreaFilter: (areaPk: number) => void
}
const AreaDropdownButton = ({ areas, addAreaFilter }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [areaName, setAreaName] = useState('')

  return (
    <div className="flex justify-center">
      <div className="flex flex-row ">
        <button onClick={(): void => setIsOpen(true)} className="block overflow-hidden">
          <i className="icon-arrow-down text-disabled text-sm md:text-xl"></i>
        </button>
        {areaName ? (
          <div className="underline"> {areaName}</div>
        ) : (
          <div className="underline">Todas las areas</div>
        )}
      </div>
      {isOpen && (
        <div className="bg-disabled rounded-lg w-full mt-4 text-sm md:text-base">
          <ul>
            {areas.map((area: areasNamesAndPks) => (
              <li>
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

export default AreaDropdownButton
