import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import Input from '../../components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '../../utils/rules'
import { login } from '../../apis/auth.api'
import { isErrorUnprocessableEntity } from '../../utils/utils'
import { ErrorResponse } from '../../types/utils.type'
import { AppContext } from '../../contexts/app.context'
import Button from '../../components/Button'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const LoginAccountMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })
  const onSubmit = handleSubmit((data) => {
    LoginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUser(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isErrorUnprocessableEntity<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'Server'
            })
          }
          if (formError?.password) {
            setError('password', {
              message: formError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange-500'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='ls:py-32 grid grid-cols-1 py-10 lg:grid-cols-5 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form noValidate onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                register={register}
                errorMessage={errors.email?.message}
                name='email'
                className='mt-8'
                placeholder='Email'
                type='email'
              />
              <Input
                register={register}
                errorMessage={errors.password?.message}
                name='password'
                className='mt-3'
                placeholder='Password'
                type='password'
              />
              <Button
                isLoading={LoginAccountMutation.isLoading}
                disabled={LoginAccountMutation.isLoading}
                className='mt-4 flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600 '
              >
                Đăng Nhập
              </Button>
              <div className='mt-8 text-center'>
                <div className='item-center flex justify-center'>
                  <span className='text-slate-400'>Bạn chưa có tài khoản?</span>
                  <Link to='/register' className='text-red-400'>
                    Đăng Kí
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
