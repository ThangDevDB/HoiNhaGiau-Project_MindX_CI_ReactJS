import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from '../contants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from '../types/auth.type'
import { clearLS, getAccessTokenFromLS, saveAccessToken, setUserName } from './auth'
import path from '../contants/path'

class Http {
  instance: AxiosInstance
  private accessToken: string | void
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response)
        // Khi login or register thanh cong api se tra ve access token ta se lay access token do va luu vao local su dung cho viec dang nhap vao trang chu
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          // luu token vao local
          saveAccessToken(this.accessToken)
          setUserName(data.data.user)
          // console.log(data.data.user)
        } else if (url === path.logout) {
          // dang xuat se xoa token khoi local
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
