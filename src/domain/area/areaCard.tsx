import useAreaCalculations from 'hooks/useAreaCalculations'
import ProgressCircle from 'components/progressCircle'
//types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

interface props {
  area: any
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
    <div className="flex flex-row rounded shadow-lg p-4 mt-4 bg-white">
      <p>{area.name}</p>

      <div className="flex-1 flex flex-col items-center md:ml-16">
        <div className="flex-grow pb-2 md:pb-4 md:text-lg text-gray-700">Puntaje total</div>
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
        <div className="text-center pb-2 md:pb-4 md:text-lg text-gray-700">
          Porcentaje de aprobación
        </div>
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
  )
}
export default AreaCard
