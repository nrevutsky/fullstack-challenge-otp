import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ENV } from '../env'
import {
  ICheckOTPRequestBody,
  ICheckOTPResponseData,
  IGetUserResponseData,
  ILogInRequestBody,
  ILogInResponseData,
} from './types'

const api: AxiosInstance = axios.create({
  baseURL: ENV.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const handleRequest = (config: AxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken')

  config.headers.Authorization = `Bearer ${accessToken}`

  return config
}

api.interceptors.request.use(handleRequest)

export const apiClient = {
  logIn: (body: ILogInRequestBody) =>
    api.post<ILogInResponseData>('log-in', body),

  checkOTP: (body: ICheckOTPRequestBody) =>
    api.post<ICheckOTPResponseData>('check-otp', body),

  getUser: () => api.get<IGetUserResponseData>('get-user'),
}
