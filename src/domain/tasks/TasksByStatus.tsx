import { StringDecoder } from 'string_decoder'
import { Task as TaskModel } from 'types/tasks'

import TaskCard from './taskCard'

export interface taskByStatus {
  news: TaskModel[]
  pending: TaskModel[]
  expired: TaskModel[]
  resolved: TaskModel[]
}

interface props {
  tasks: TaskModel[]
  borderColor: StringDecoder
  label: string
  icon: string
}

const TasksByStatus = ({ tasks, borderColor, label, icon }: props): JSX.Element => {
  return (
    <>
      {tasks.length > 0 && (
        <div>
          <div className="py-4">
            <div className={`text-center border-t border-b ${borderColor} w-44 mx-auto`}>
              {label}
            </div>
          </div>
          {tasks.map((task: TaskModel) => (
            <TaskCard task={task} icon={icon} />
          ))}
        </div>
      )}
    </>
  )
}
export default TasksByStatus
