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
      <button className="group" onClick={(): void => handleClick(TaskStatus.new)}>
        <div className="p-2 md:p-4 group-focus:bg-disabled-light">
          <div className="flex items-center justify-around ">
            <i className="icon-note group-focus:text-base  text-danger-light text-sm md:text-2xl" />
            <span>{taskByStatus[TaskStatus.new].length}</span>
          </div>
          <p>{TaskStatus.new}</p>
        </div>
      </button>
      <button className="group" onClick={(): void => handleClick(TaskStatus.expired)}>
        <div className="p-2 md:p-4 group-focus:bg-disabled-light">
          <div className="flex items-center justify-around ">
            <i className="icon-fire group-focus:text-base  text-danger text-sm md:text-2xl"></i>
            {taskByStatus[TaskStatus.expired].length}
          </div>
          <p>{TaskStatus.expired}</p>
        </div>
      </button>
      <button className="group" onClick={(): void => handleClick(TaskStatus.pending)}>
        <div className="p-2 md:p-4 group-focus:bg-disabled-light">
          <div className="flex items-center justify-around ">
            <i className="icon-note group-focus:text-base  text-primary-light text-sm md:text-2xl"></i>
            {taskByStatus[TaskStatus.pending].length}
          </div>
          <p>{TaskStatus.pending}</p>
        </div>
      </button>
      <button className="group" onClick={(): void => handleClick(TaskStatus.done)}>
        <div className="p-2 md:p-4 group-focus:bg-disabled-light">
          <div className="flex items-center justify-around ">
            <i className="icon-note group-focus:text-base  text-success text-sm md:text-2xl"></i>
            {taskByStatus[TaskStatus.done].length}
          </div>
          <p>{TaskStatus.done}</p>
        </div>
      </button>
    </div>
  )
}

export default StatusFilter
