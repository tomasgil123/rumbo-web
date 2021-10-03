import React from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import AreaPresentational from 'domain/area'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useRefetchQuery from 'hooks/useRefetchQuery'
import { getModulesArea } from 'utils/area'
// types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
// context
import { ChangesMadeProvider, useChangesMade } from 'domain/area/changesMadeContext'

type AreaPk = {
  areaPk: string
}

const Area = (): JSX.Element => {
  const { areaPk } = useParams<AreaPk>()

  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey, refetch } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )

  const { wereChangesMade } = useChangesMade()
  // when the user leaves the area screen we want to refetch the
  // initialDataDistributorId query
  useRefetchQuery(wereChangesMade, refetch)

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  const area = (auditProgram as AuditProgram).areas[Number(areaPk)]
  const modules = getModulesArea(area.module_pks, (auditProgram as AuditProgram).modules)

  return (
    <AreaPresentational
      modules={modules}
      survey={survey as SurveyActive}
      distributorId={distributorId as number}
      auditProgram={auditProgram as AuditProgram}
    />
  )
}

const AreaScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:areaPk`}>
          <ChangesMadeProvider>
            <Area />
          </ChangesMadeProvider>
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(AreaScreen)
