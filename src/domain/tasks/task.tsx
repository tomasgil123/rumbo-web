import React from 'react'
import { useParams } from 'react-router-dom'
type TaskId = {
  taskId: string
}
const Task = (): JSX.Element => {
  const { taskId } = useParams<TaskId>()
  return <div>Tarea {taskId}</div>
}

export default Task
