import { ChangeEventHandler } from 'react-router/node_modules/@types/react'

interface props {
  handleSearchChange: ChangeEventHandler
  guidelineNameFilter: string
}

const GuidelineNameFilter = ({ handleSearchChange, guidelineNameFilter }: props): JSX.Element => {
  return (
    <div>
      ingresar lineamiento
      <input
        className="focus:text-white text-white mb-4 w-full outline-none bg-primary-dark border-b-2 border-white"
        onChange={handleSearchChange}
        value={guidelineNameFilter}
      />
    </div>
  )
}

export default GuidelineNameFilter
