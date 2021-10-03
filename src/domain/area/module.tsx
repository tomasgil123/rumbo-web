//components
import Guideline from './guidelineContainer'
//types
import { Module as ModuleModel } from 'types/module'
import { Guideline as GuidelineModel } from 'types/guideline'
import { SurveyActive } from 'types/survey'

interface ModuleProps {
  module: ModuleModel
  guidelines: GuidelineModel[]
  survey: SurveyActive
  distributorId: number
}

const Module = ({ module, guidelines, survey, distributorId }: ModuleProps): JSX.Element => {
  return (
    <div>
      <div className="pt-6 md:pt-10 md:pb-2">{module.name}</div>
      <div>
        {guidelines.map((guideline) => (
          <Guideline
            key={guideline.pk}
            guideline={guideline}
            survey={survey}
            distributorId={distributorId}
          />
        ))}
      </div>
    </div>
  )
}

export default Module
