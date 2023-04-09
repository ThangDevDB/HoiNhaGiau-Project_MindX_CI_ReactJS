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
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { t } = useTranslation('profile')
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
    // event?.preventDefault()
    LoginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUser(data.data.data.user)
        navigate('/')
        toast.info(data.data.message, { autoClose: 1500, position: 'top-center' })
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
    <div className='bg-[#2CB05A]'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='ls:py-32 grid grid-cols-1 py-10 lg:grid-cols-5 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form noValidate onSubmit={onSubmit} className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>{t('profile:login')}</div>
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
                className='relative mt-3'
                placeholder='Password'
                type='password'
              />
              <Button
                isLoading={LoginAccountMutation.isLoading}
                disabled={LoginAccountMutation.isLoading}
                className='mt-4 flex w-full items-center justify-center bg-[#2CB05A] py-4 px-2 text-sm uppercase text-white hover:bg-[#2CB05A]/90'
              >
                {t('profile:login')}
              </Button>
              <div className='mt-8 text-center'>
                <div className='item-center flex justify-center'>
                  <span className='text-slate-400'>{t('profile:form_register_login.have_not_account')}</span>
                  <Link to='/register' className='text-red-400'>
                    {t('profile:register')}
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
