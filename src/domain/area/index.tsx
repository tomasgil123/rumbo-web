import React from 'react'
// components
import Module from 'domain/area/module'
// utils
import { getGuidelinesModule } from 'utils/modules'
// types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { Module as ModuleModel } from 'types/module'

type AreaPresentationalModel = {
  modules: ModuleModel[]
  auditProgram: AuditProgram
  survey: SurveyActive
  distributorId: number
}

const AreaPresentational = ({
  modules,
  auditProgram,
  survey,
  distributorId,
}: AreaPresentationalModel): JSX.Element => {
  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="shadow-md rounded bg-white w-full p-4">Area header</div>
      <div>
        {modules.map((module) => (
          <Module
            key={module.pk}
            module={module}
            guidelines={getGuidelinesModule(
              module.guideline_pks,
              (auditProgram as AuditProgram).guidelines
            )}
            survey={survey as SurveyActive}
            distributorId={distributorId as number}
          />
        ))}
      </div>
    </div>
  )
}

export default AreaPresentational
