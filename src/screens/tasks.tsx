import React, { useState, ChangeEvent } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
// components
import Layout from 'components/layout'
import Task from 'domain/tasks/task'

import Spinner from 'components/spinner'
import StatusFilter from 'domain/tasks/filters/statusFilter'
import TasksByStatus from 'domain/tasks/TasksByStatus'
import GuidelineNameFilter from 'domain/tasks/filters/GuidelineNameFilter'

import { getFlatArrayFromObjectValues, TasksStyles } from 'utils/tasks'

//utils
import useInitialDataDistributor from 'hooks/useInitialDataDistributor'
import useInitialData from 'hooks/useInitialData'
import useTaskFilters from 'hooks/useTaskFilters'

//types
import { TypeTaskStatus } from 'types/tasks'

// podemos tener un array de funciones que sean los filtros que se tiene que aplicar
// entonces, cuando se hace click en un filtro se agregar el filtro
// al array y ademas de llama a la funcion onApplyFilters

// tenemos que armar una funcion que nos permita determinar el tipo
// de una tarea

// como hago para saber si al hacer click sobre un filtro lo tengo
// que sacar u agregar?
// Puedo fijarme si la funcion ya esta en el array de filtros
// si esta, significa que tengo que sacarla

// como gestiono el filtro de nombre?
// cada vez que se escribe una palabra
// no puedo suamr una funcion filter al array de filters
// a la funcion onApplyFilters le voy a tener que psar un parametros
// que va a ser el search filter

// puedo poner la funcion de filter por name como default adentro del array de filters
// es medio o mismo

// como gestiono las areas?
// de la misma forma que el filtro de nombre

const TaskList = (): JSX.Element => {
  const { isLoading, error, auditProgram, distributorIds } = useInitialData()
  const distributorId = distributorIds ? distributorIds[0] : null
  const { isLoadingDistributor, errorDistributor, survey } = useInitialDataDistributor(
    distributorId,
    auditProgram
  )
  console.log('survey', survey)
  const arrayFlatTasks = survey ? getFlatArrayFromObjectValues(survey) : []
  // const tasksByStatus = getTaskByStatus(arrayFlatTasks)

  const {
    statusFilters,
    addFilterStatus,
    guidelineNameFilter,
    addGuidelineNameFilter,
    tasksToShowGrouped,
  } = useTaskFilters(arrayFlatTasks)

  if (isLoading || isLoadingDistributor)
    return (
      <div className="mt-8 md:mt-16 mx-auto px-4">
        <Spinner />
      </div>
    )

  if (error || errorDistributor) return <div>Ha ocurrido un error</div>

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    addGuidelineNameFilter(event.target.value)
  }

  const onApplyFilterStatus = (status: TypeTaskStatus): void => {
    addFilterStatus(status)
  }

  const filteredByGuiline = arrayFlatTasks.filter((task) =>
    task.guidelineName.includes(guidelineNameFilter.toUpperCase())
  )

  // tasksByStatus es el title de status
  // tenemos que iterar sobre los 4 posibles status
  // cada taskByStatus recibe todas las tareas para mostrar
  // pero si recibe todas las tareas las tiene que filtrar
  // vamos a pensar los filtros de otra manera

  // no alcanza con pensar los filtros de otra manera
  // siempre vamos a necesitar filtrar

  // hay alguna forma de agrupar las tareas por tipo de status?

  // creo que no hay forma de zafar, vamos a tener que
  // exportar las funciones de filtros desde useTasksFilters
  // o podemos exportar getTasksByStatus desde useTasksFilters

  return (
    <div>
      <div className="flex flex-row justify-center content-between">
        <ul className="px-4">
          <div>
            <StatusFilter taskByStatus={tasksToShowGrouped} handleClick={onApplyFilterStatus} />
            <GuidelineNameFilter
              guidelineNameFilter={guidelineNameFilter}
              handleSearchChange={handleSearchChange}
            />
          </div>
          {Object.keys(tasksToShowGrouped).map(
            (groupTasks): JSX.Element => (
              <TasksByStatus
                tasks={(tasksToShowGrouped as any)[groupTasks]}
                borderColor={(TasksStyles as any)[groupTasks].borderColor}
                label={groupTasks}
                icon={(TasksStyles as any)[groupTasks].icon}
              />
            )
          )}
        </ul>
      </div>
    </div>
  )
  // switch (statusFilter) {
  //   case 'news':
  //     return (
  //       <div className="flex flex-row justify-center content-between">
  //         <ul className="px-4">
  //           <div>
  //             <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
  //           </div>
  //           <TasksByStatus
  //             taskByStatus={taskByStatus}
  //             borderColor={'border-danger-light'}
  //             label={'Nuevas'}
  //             status={'news'}
  //             icon={'icon-note text-danger-light'}
  //           />
  //         </ul>
  //       </div>
  //     )
  //   case 'expired':
  //     return (
  //       <div className="flex flex-row justify-center content-between">
  //         <ul className="px-4">
  //           <div>
  //             <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
  //           </div>
  //           <TasksByStatus
  //             taskByStatus={taskByStatus}
  //             borderColor={'border-danger'}
  //             label={'Vencidas'}
  //             status={'expired'}
  //             icon={'icon-fire text-danger'}
  //           />
  //         </ul>
  //       </div>
  //     )
  //   case 'pending':
  //     return (
  //       <div className="flex flex-row justify-center content-between">
  //         <ul className="px-4">
  //           <div>
  //             <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
  //           </div>
  //           <TasksByStatus
  //             taskByStatus={taskByStatus}
  //             borderColor={'border-primary-light'}
  //             label={'Pendientes'}
  //             status={'pending'}
  //             icon={'icon-note text-primary-ligh'}
  //           />
  //         </ul>
  //       </div>
  //     )
  //   case 'resolved':
  //     return (
  //       <div className="flex flex-row justify-center content-between">
  //         <ul className="px-4">
  //           <div>
  //             <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
  //           </div>
  //           <TasksByStatus
  //             taskByStatus={taskByStatus}
  //             borderColor={'border-success'}
  //             label={'Resueltas'}
  //             status={'resolved'}
  //             icon={'icon-note text-primary-light'}
  //           />
  //         </ul>
  //       </div>
  //     )
  //   default:
  //     return (
  //       <div className="flex flex-row justify-center content-between">
  //         <ul className="px-4">
  //           <div>
  //             <GuidelineNameFilter
  //               handleSearchChange={handleSearchChange}
  //               guidelineNameFilter={guidelineNameFilter}
  //             />
  //             <StatusFilter taskByStatus={taskByStatus} handleClick={handleClick} />
  //           </div>
  //           {taskByStatus.news.length > 0 ? (
  //             <TasksByStatus
  //               taskByStatus={taskByStatus}
  //               borderColor={'border-danger-light'}
  //               label={'Nuevas'}
  //               status={'news'}
  //               icon={'icon-note text-danger-light'}
  //             />
  //           ) : (
  //             <div> </div>
  //           )}
  //           {taskByStatus.expired.length > 0 ? (
  //             <TasksByStatus
  //               taskByStatus={taskByStatus}
  //               borderColor={'border-danger'}
  //               label={'Vencidas'}
  //               status={'expired'}
  //               icon={'icon-fire text-danger'}
  //             />
  //           ) : (
  //             <div> </div>
  //           )}

  //           {taskByStatus.pending.length > 0 ? (
  //             <TasksByStatus
  //               taskByStatus={taskByStatus}
  //               borderColor={'border-primary-light'}
  //               label={'Pendientes'}
  //               status={'pending'}
  //               icon={'icon-note text-primary-light'}
  //             />
  //           ) : (
  //             <div> </div>
  //           )}
  //           {taskByStatus.resolved.length > 0 ? (
  //             <TasksByStatus
  //               taskByStatus={taskByStatus}
  //               borderColor={'border-success'}
  //               label={'Resueltas'}
  //               status={'resolved'}
  //               icon={'icon-note text-success'}
  //             />
  //           ) : (
  //             <div> </div>
  //           )}
  //         </ul>
  //       </div>
  //     )
  // }
}

const TasksScreen = (): JSX.Element => {
  const match = useRouteMatch()
  return (
    <div>
      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}

      <Switch>
        <Route path={`${match.path}/:taskId`}>
          <Task />
        </Route>
        <Route path={match.path}>
          <TaskList />
        </Route>
      </Switch>
    </div>
  )
}

export default Layout(TasksScreen)
