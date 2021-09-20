import React from 'react'
//types
import { TaskStatus, TasksGroupedByStatus, TypeTaskStatus } from 'types/tasks'

interface Props {
  taskByStatus: TasksGroupedByStatus
  handleClick: (status: TypeTaskStatus) => void
}

const StatusFilter = ({ taskByStatus, handleClick }: Props): JSX.Element => {
  return (
    <div className="flex flex-row justify-center ">
      <button onClick={(): void => handleClick(TaskStatus.new)}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-note text-disabled text-sm md:text-2xl" />
            <span>{taskByStatus[TaskStatus.new].length}</span>
          </div>
          <p>{TaskStatus.new}</p>
        </div>
      </button>
      <button onClick={(): void => handleClick(TaskStatus.expired)}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-fire text-disabled text-sm md:text-2xl"></i>
            {taskByStatus[TaskStatus.expired].length}
          </div>
          <p>{TaskStatus.expired}</p>
        </div>
      </button>
      <button onClick={(): void => handleClick(TaskStatus.pending)}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-note text-disabled text-sm md:text-2xl"></i>
            {taskByStatus[TaskStatus.pending].length}
          </div>
          <p>{TaskStatus.pending}</p>
        </div>
      </button>
      <button onClick={(): void => handleClick(TaskStatus.done)}>
        <div className="p-2 md:p-4">
          <div className="flex items-center justify-around">
            <i className="icon-note text-disabled text-sm md:text-2xl"></i>
            {taskByStatus[TaskStatus.done].length}
          </div>
          <p>{TaskStatus.done}</p>
        </div>
      </button>
    </div>
  )
}

export default StatusFilter
