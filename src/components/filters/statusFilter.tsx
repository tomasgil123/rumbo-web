import arrayOfTasks from 'arrayOfTasks'
import React, { useState } from 'react'
//utils

//types
import { Task } from 'types/tasks'

interface Props {
  taskByStatus: any
  handleClick: any
}

const StatusFilter = ({ taskByStatus, handleClick }: Props): JSX.Element => {
  return (
    <div className="flex flex-row justify-center ">
      <button onClick={(): void => handleClick('news')}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-note text-disabled text-sm md:text-2xl" />
            <span>{taskByStatus.news.length}</span>
          </div>
          <p>Nuevas</p>
        </div>
      </button>
      <button onClick={(): void => handleClick('expired')}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-fire text-disabled text-sm md:text-2xl"></i>
            {taskByStatus.expired.length}
          </div>
          <p>Vencidas</p>
        </div>
      </button>
      <button onClick={(): void => handleClick('pending')}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-note text-disabled text-sm md:text-2xl"></i>
            {taskByStatus.pending.length}
          </div>
          <p>Pendientes</p>
        </div>
      </button>
      <button onClick={(): void => handleClick('resolved')}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-note text-disabled text-sm md:text-2xl"></i>
            {taskByStatus.resolved.length}
          </div>
          <p>Resueltas</p>
        </div>
      </button>
    </div>
  )
}

export default StatusFilter
