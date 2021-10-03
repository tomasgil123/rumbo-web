import { ChangeEventHandler } from 'react-router/node_modules/@types/react'

interface props {
  handleSearchChange: ChangeEventHandler
  guidelineNameFilter: string
}

const GuidelineNameFilter = ({ handleSearchChange, guidelineNameFilter }: props): JSX.Element => {
  return (
    <input
      type="search"
      className="text-center focus:text-disabled text-disabled mb-4 outline-none  border-b-2 border-black"
      onChange={handleSearchChange}
      value={guidelineNameFilter}
      placeholder="Ingresar Lineamiento..."
    />
  )
}

export default GuidelineNameFilter
