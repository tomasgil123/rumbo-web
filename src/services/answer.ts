import { AxiosResponse } from 'axios'
import axios from 'interceptors'
// types
import { AnswerPost, AnswerResponse as AnswerR } from 'types/answer'
interface AnswerResponse {
  status: number
  data: AnswerR
}

export const sendAnswer = async (answer: AnswerPost): Promise<AnswerResponse> => {
  debugger
  const response: AxiosResponse<AnswerR> = await axios.post(
    '/answers/?version=2',
    JSON.stringify(answer)
  )
  debugger
  return { status: response.status, data: response.data }
}
