import { User } from '../types/user.type'

export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_name')
}

export const setUserName = (profile: User) => {
  localStorage.setItem('user_name', JSON.stringify(profile))
}

export const getUserName = () => {
  const result = localStorage.getItem('user_name')
  return result ? JSON.parse(result) : null
}
