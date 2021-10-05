import useAreaCalculations from 'hooks/useAreaCalculations'
import ProgressCircle from 'components/progressCircle'
//types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { Area } from 'types/area'

interface props {
  area: Area
  survey: SurveyActive
  auditProgram: AuditProgram
}
const AreaCard = ({ area, survey, auditProgram }: props): JSX.Element => {
  const { areaPoints, isAreaApproved, areaPercentage } = useAreaCalculations(
    survey as SurveyActive,
    auditProgram as AuditProgram,
    area.pk
  )

  return (
    <div className="flex flex-col rounded shadow-lg p-4 mt-4 bg-white">
      <p style={{ color: area.color }} className="text-center">
        {area.name}
      </p>
      <div className="flex flex-row justify-center rounded ">
        <div className="flex-1 flex flex-col items-center md:ml-16">
          <ProgressCircle
            radius={45}
            progresses={[
              { percent: 100, color: isAreaApproved ? 'text-success-light' : 'text-danger-light' },
              { percent: areaPoints, color: isAreaApproved ? 'text-success' : 'text-danger' },
            ]}
            value={areaPoints}
            isPercentage={false}
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:mr-16">
          <ProgressCircle
            radius={45}
            progresses={[
              { percent: 100, color: isAreaApproved ? 'text-success-light' : 'text-danger-light' },
              { percent: areaPercentage, color: isAreaApproved ? 'text-success' : 'text-danger' },
            ]}
            value={areaPercentage}
            isPercentage={true}
          />
        </div>
      </div>
    </div>
  )
}
export default AreaCard
