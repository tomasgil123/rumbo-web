/* eslint-disable @typescript-eslint/no-empty-function */
import { useState, createContext, useContext } from 'react'

interface ChangesMadeContextModel {
  wereChangesMade: boolean
  setWereChangesMade: React.Dispatch<React.SetStateAction<boolean>>
}

const ChangesMadeContext = createContext<ChangesMadeContextModel>(null!)

function ChangesMadeProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [wereChangesMade, setWereChangesMade] = useState(false)

  const value = { wereChangesMade, setWereChangesMade }
  return <ChangesMadeContext.Provider value={value}>{children}</ChangesMadeContext.Provider>
}
function useChangesMade(): ChangesMadeContextModel {
  const context = useContext(ChangesMadeContext)
  if (context === undefined) {
    throw new Error('useChangesMade must be used within a ChangesMadeProvider')
  }
  return context
}
export { ChangesMadeProvider, useChangesMade }
