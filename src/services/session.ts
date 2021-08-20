import axios from 'axios'
import { getLocalRefreshToken, setLocalAccessToken, setLocalRefreshToken } from 'utils/session'

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
