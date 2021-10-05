import { useParams } from 'react-router-dom'
// components
import AreaPresentational from 'domain/area'
import Spinner from 'components/spinner'
// utils
import useInitialData from 'hooks/useInitialData'
import useSurveyData from 'hooks/useSurveyData'
import { getModulesArea } from 'utils/area'
// types
import { AuditProgram } from 'types/auditProgram'
import { SurveyActive } from 'types/survey'
type AreaPk = {
  areaPk: string
  surveyPk: string
}

const AreaPreviousSurvey = (): JSX.Element => {
  const { areaPk, surveyPk } = useParams<AreaPk>()
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingSurvey, errorSurvey, survey } = useSurveyData(
    `/api/v1/surveys/${surveyPk}/`,
    auditProgram as AuditProgram
  )

  if (isLoading || isLoadingSurvey)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorSurvey) return <div>Ha ocurrido un error</div>

  const area = (auditProgram as AuditProgram).areas[Number(areaPk)]
  const modules = getModulesArea(area.module_pks, (auditProgram as AuditProgram).modules)

  return (
    <AreaPresentational
      modules={modules}
      survey={survey as SurveyActive}
      distributorId={distributorId as number}
      auditProgram={auditProgram as AuditProgram}
      area={area}
    />
  )
}

export default AreaPreviousSurvey
