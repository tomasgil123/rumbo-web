import { AxiosResponse } from 'axios'
import axios from 'interceptors'
// utils
import { getLocalRefreshToken, setLocalAccessToken, setLocalRefreshToken } from 'utils/session'
// types
import { Credentials } from 'types/session'
export const refreshTokens = async (): Promise<void> => {
  const tokenRefreshURL = `token/refresh`
  const refreshToken = getLocalRefreshToken()

  const response: { refresh: string; access: string } = await axios.post(
    tokenRefreshURL,
    JSON.stringify({ refresh: refreshToken })
  )
  setLocalAccessToken(response.access)
  setLocalRefreshToken(response.refresh)
}

interface LoginResponse {
  status: number
  data: Credentials
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const loginData = {
    username: username,
    password: password,
  }
  const response: AxiosResponse<Credentials> = await axios.post('token/', JSON.stringify(loginData))
  return { status: response.status, data: response.data }
}
