import axios from 'axios'
import { getLocalAccessToken, isAccessTokenExpired } from 'utils/session'
import { refreshTokens } from 'services/session'
// create axios instance
// this way we set some defaults to every request we will make
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = getLocalAccessToken()
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

// handle token expiration
// reference: https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c
let isAlreadyFetchingAccessToken = false
let subscribers: ((access_token: string) => void)[] = []

function onAccessTokenFetched(access_token: string): void {
  subscribers = subscribers.filter((callback) => callback(access_token))
}

function addSubscriber(callback: (access_token: string) => void): void {
  subscribers.push(callback)
}

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const {
      config,
      response: { status },
    } = error
    const originalRequest = config

    if (status === 401 && isAccessTokenExpired()) {
      // we avoid asking a new access token for each request which failed
      // with a status of 401
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true
        refreshTokens().then(() => {
          const access_token = getLocalAccessToken() as string
          isAlreadyFetchingAccessToken = false
          // we execute the original requests
          onAccessTokenFetched(access_token)
        })
      }

      const retryOriginalRequest = new Promise((resolve) => {
        // we save the original request to be perform after we update the token
        addSubscriber((access_token: string) => {
          originalRequest.headers.Authorization = 'Bearer ' + access_token
          resolve(axios(originalRequest))
        })
      })
      return retryOriginalRequest
    }
    return Promise.reject(error)
  }
)

export default instance
