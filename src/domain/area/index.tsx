import React from 'react'
// components
import Module from 'domain/area/module'
import ProgressCircle from 'components/progressCircle'
import IconCircle from 'components/iconCircle'
// utils
import { getGuidelinesModule } from 'utils/modules'
import useAreaCalculations from 'hooks/useAreaCalculations'
// types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { Module as ModuleModel } from 'types/module'
import { Area } from 'types/area'

type AreaPresentationalModel = {
  modules: ModuleModel[]
  auditProgram: AuditProgram
  survey: SurveyActive
  distributorId: number
  area: Area
}

const AreaPresentational = ({
  modules,
  auditProgram,
  survey,
  distributorId,
  area,
}: AreaPresentationalModel): JSX.Element => {
  const { isAreaApproved, areaPoints, areaPercentage } = useAreaCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram,
    area.pk
  )

  console.log('area', area)

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="shadow-md flex flex-row rounded bg-white w-full p-4">
        <div
          className="font-bold text-lg md:text-xl flex items-center"
          style={{ color: area.color }}
        >
          {area.name}
        </div>
        <div className="flex flex-row ml-auto">
          <div className="flex-1 flex flex-col items-center">
            <ProgressCircle
              radius={30}
              progresses={[
                {
                  percent: 100,
                  color: isAreaApproved ? 'text-success-light' : 'text-danger-light',
                },
                { percent: 0, color: isAreaApproved ? 'text-success' : 'text-danger' },
              ]}
              value={areaPoints}
              isPercentage={false}
            />
          </div>
          <div className="flex-1 flex flex-col items-center ">
            {area.essential ? (
              <>
                {isAreaApproved ? (
                  <IconCircle
                    radius={30}
                    bgColor="text-success-light"
                    icon={<i className="icon-like text-success"></i>}
                  />
                ) : (
                  <IconCircle
                    radius={30}
                    bgColor="text-danger-light"
                    icon={<i className="icon-dislike text-danger"></i>}
                  />
                )}
              </>
            ) : (
              <ProgressCircle
                radius={30}
                progresses={[
                  {
                    percent: 100,
                    color: isAreaApproved ? 'text-success-light' : 'text-danger-light',
                  },
                  {
                    percent: areaPercentage,
                    color: isAreaApproved ? 'text-success' : 'text-danger',
                  },
                ]}
                value={areaPercentage}
                isPercentage={true}
              />
            )}
          </div>
        </div>
      </div>
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
