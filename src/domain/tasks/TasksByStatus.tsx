import { Task as TaskModel } from 'types/tasks'

import TaskCard from './taskCard'

export interface taskByStatus {
  news: TaskModel[]
  pending: TaskModel[]
  expired: TaskModel[]
  resolved: TaskModel[]
}

interface props {
  taskByStatus: any
  borderColor: string
  status: string
  label: string
}

const TasksByStatus = ({ taskByStatus, borderColor, status, label }: props): JSX.Element => {
  return (
    <div>
      <div className="py-4">
        <div className={`text-center border-t border-b ${borderColor} w-44 mx-auto`}>{label}</div>
      </div>
      {taskByStatus[`${status}`].map((task: TaskModel) => (
        <li>
          <TaskCard task={task} icon={'icon-note text-danger-light'} />
        </li>
      ))}
    </div>
  )
}
export default TasksByStatus
