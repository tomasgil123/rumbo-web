import React from 'react'
import { useParams } from 'react-router-dom'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Spinner from 'components/spinner'
import Module from 'domain/area/module'
// utils
import useInitialData from 'hooks/useInitialData'
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import { getModulesArea } from 'utils/area'
import { getGuidelinesModule } from 'utils/modules'
// types
import { SurveyActive } from 'types/survey'
import { AuditProgram } from 'types/auditProgram'
import { TaskStatus } from 'types/tasks'

type AreaPk = {
  areaPk: string
}

// como le mostramos al usuario que el lineamiento
// se esta contestando?
// podemos hacer que le pk del guideline se vuelva un spinner

// tenemos que iterar sobre los guidelines
// para cada guideline nos fijamos si tiene una asnwer asociada
// y si ademas tiene una task

// con el area sacamos los modulos

// tenemos que hacer un funcion de getModulesFromArea
// tenemos que hacer una funcion para obtener los guidelines de un module

const Area = (): JSX.Element => {
  const { areaPk } = useParams<AreaPk>()

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

  console.log('auditProgram', auditProgram)
  const area = (auditProgram as AuditProgram).areas[Number(areaPk)]
  const modules = getModulesArea(area.module_pks, (auditProgram as AuditProgram).modules)
  console.log('modules', modules)

  return (
    <div className="max-w-screen-sm mt-8 md:mt-16 mx-auto px-4">
      <div className="shadow-md rounded bg-white w-full p-4">Area header</div>
      <div>
        {modules.map((module) => (
          <Module
            module={module}
            guidelines={getGuidelinesModule(
              module.guideline_pks,
              (auditProgram as AuditProgram).guidelines
            )}
          />
        ))}
      </div>
    </div>
  )
}

const AreaScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:areaPk`}>
          <Area />
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(AreaScreen)
