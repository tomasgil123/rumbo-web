import { ChangeEventHandler } from 'react-router/node_modules/@types/react'

interface props {
  guidelineNameByArea: string
  handleSearchChange: ChangeEventHandler
}
const GuidelineByAreaFilter = ({ handleSearchChange, guidelineNameByArea }: props): JSX.Element => {
  return (
    <div className="flex flex-row justify-center w-full mt-1 ">
      <input
        type="search"
        className="text-center focus:text-disabled text-disabled mb-4 outline-none  border-b-2 border-black"
        onChange={handleSearchChange}
        value={guidelineNameByArea}
        placeholder="Buscar Lineamiento"
      />
      <i className="icon-magnifier text-sm md:text-lg" />
    </div>
  )
}

export default GuidelineByAreaFilter
