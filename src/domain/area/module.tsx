//types
import { Module as ModuleModel } from 'types/module'
import { Guideline } from 'types/guideline'

interface ModuleProps {
  module: ModuleModel
  guidelines: Guideline[]
}

const Module = ({ module, guidelines }: ModuleProps): JSX.Element => {
  return (
    <div>
      <div className="pt-6 md:pt-10 pb-4 md:pb-6">{module.name}</div>
    </div>
  )
}

export default Module
