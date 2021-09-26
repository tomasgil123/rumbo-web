import React from 'react'
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
//utils
import { getUnansweredGuidelines } from 'utils/tasks'
//components
import Spinner from 'components/spinner'

//types
import { Guideline } from 'types/guideline'
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'

const UnansweredGuidelines = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )
  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  const arrayOfUnansweredGuidelines = getUnansweredGuidelines(
    survey as SurveyActive,
    auditProgram as AuditProgram
  )

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="text-center mt-2">
        <i className="icon-close  text-danger text-3xl md:text-5xl" />
        <div className="text-lg py-4 md:pb-6 md:text-xl">
          Te faltan contestar los siguientes lineamientos
        </div>
      </div>
      <div>
        {arrayOfUnansweredGuidelines.map((guideline: Guideline) => (
          <div className="p-4 w-full flex flex-row shadow-md rounded bg-white my-2">
            <div className="px-8">{guideline.code}</div>
            <div>{guideline.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UnansweredGuidelines
