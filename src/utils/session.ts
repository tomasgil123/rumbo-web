import jwtDecode, { JwtPayload } from 'jwt-decode'

export const getLocalAccessToken = (): string | null => {
  const accessToken = window.localStorage.getItem('accessToken')
  return accessToken
}

export const setLocalAccessToken = (token: string): void => {
  window.localStorage.setItem('accessToken', token)
}

export const getLocalRefreshToken = (): string | null => {
  const refreshToken = window.localStorage.getItem('refreshToken')
  return refreshToken
}

export const setLocalRefreshToken = (refreshToken: string): void => {
  window.localStorage.setItem('refreshToken', refreshToken)
}

export const isAccessTokenExpired = (): boolean => {
  const token = getLocalAccessToken()
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token)
    if (decoded) {
      const secondsToExpiration = (decoded as any).exp - Date.now() / 1000
      return secondsToExpiration < 0
    } else {
      return false
    }
  } else {
    return false
  }
}
