import React, { useState } from 'react'
import { Area } from 'types/area'

interface areasNamesAndPks {
  name: string
  pk: number
}
interface Props {
  areas: areasNamesAndPks[]
  addAreaFilter: (areaPk: number) => void
}
const AreaDropdownButton = ({ areas, addAreaFilter }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex justify-center">
      <div className="flex flex-row ">
        <button onClick={(): void => setIsOpen(true)} className="block overflow-hidden">
          <i className="icon-arrow-right text-disabled text-sm md:text-2xl"></i>
        </button>
        <div className="underline">Todas las areas</div>
      </div>
      {isOpen && (
        <div className="bg-disabled rounded-lg w-44 mt-4 text-sm md:text-base">
          <ul>
            {areas.map((area: areasNamesAndPks) => (
              <li>
                <button
                  onClick={(): void => {
                    addAreaFilter(area.pk)
                    setIsOpen(false)
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
