import { AxiosResponse } from 'axios'
import axios from 'interceptors'

interface UpdateTaskResponse {
  status: number
  data: any
}

export const updateTask = async (): Promise<UpdateTaskResponse> => {
  const loginData = {}
  const response: AxiosResponse<UpdateTaskResponse> = await axios.post(
    'token/',
    JSON.stringify(loginData)
  )
  return { status: response.status, data: response.data }
}
