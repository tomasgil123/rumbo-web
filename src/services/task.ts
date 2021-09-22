import { AxiosResponse } from 'axios'
import axios from 'interceptors'
// types
import { Task, TaskUpdate } from 'types/tasks'
interface UpdateTaskResponse {
  status: number
  data: Task
}

export const updateTask = async (
  task: TaskUpdate,
  answer: string | number
): Promise<UpdateTaskResponse> => {
  const taskUpdateData = {
    status: task.status,
    description: task.description,
    assigned_to: task.assigned_to,
    deadline: task.deadline,
    answer_value: answer,
  }
  const response: AxiosResponse<Task> = await axios.put(
    `tasks/${task.pk}`,
    JSON.stringify(taskUpdateData)
  )
  return { status: response.status, data: response.data }
}
