import { ChangeEventHandler } from 'react-router/node_modules/@types/react'

interface props {
  handleSearchChange: ChangeEventHandler
  guidelineNameFilter: string
}

const GuidelineNameFilter = ({ handleSearchChange, guidelineNameFilter }: props): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      Ingresar Lineamiento
      <input
        className="focus:text-white text-white mb-4 outline-none bg-primary-dark border-b-2 border-black "
        onChange={handleSearchChange}
        value={guidelineNameFilter}
      />
    </div>
  )
}

export default GuidelineNameFilter
