// components
import ProgressCircle from 'components/progressCircle'
import IconCircle from 'components/iconCircle'
// types
interface SurveySummary {
  isApproved: boolean
  points: number
  percentage: number
  month: string
}

const SurveySummaryComponent = ({
  isApproved,
  points,
  percentage,
  month,
}: SurveySummary): JSX.Element => {
  return (
    <div className="flex flex-col rounded shadow-lg p-4 md:p-6 mt-4 bg-white">
      <div className=" flex flex-col items-center md:text-xl font-bold text-gray-700 pb-4 md:pb-6">
        <i className="icon-notebook text-2xl md:text-4xl" />
        <h1>{month}</h1>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col items-center">
          <div className="flex-grow pb-2 md:pb-4 md:text-lg text-gray-700">Puntaje total</div>
          <ProgressCircle
            progresses={[
              { percent: 100, color: isApproved ? 'text-success-light' : 'text-danger-light' },
              { percent: points, color: isApproved ? 'text-success' : 'text-danger' },
            ]}
            value={points}
            isPercentage={false}
          />
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="text-center pb-2 md:pb-4 md:text-lg text-gray-700">
            Porcentaje de aprobación
          </div>
          <ProgressCircle
            progresses={[
              { percent: 100, color: isApproved ? 'text-success-light' : 'text-danger-light' },
              { percent: percentage, color: isApproved ? 'text-success' : 'text-danger' },
            ]}
            value={percentage}
            isPercentage={true}
          />
        </div>
        <div className="flex-1 flex flex-col items-center">
          <div className="flex-grow pb-2 md:pb-4 md:text-lg text-gray-700">
            {isApproved ? 'Aprobado' : 'No aprobado'}
          </div>
          {isApproved ? (
            <IconCircle
              bgColor="text-success-light"
              icon={<i className="icon-like text-success"></i>}
            />
          ) : (
            <IconCircle
              bgColor="text-danger-light"
              icon={<i className="icon-dislike text-danger"></i>}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SurveySummaryComponent
