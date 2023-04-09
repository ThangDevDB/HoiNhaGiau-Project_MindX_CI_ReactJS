/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import Button from 'src/components/Button'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { t } = useTranslation('profile')
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const AccountRegisterMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    const body = omit(data, ['confirm_password'])
    AccountRegisterMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setUser(data.data.data.user)
        // console.log(data.data.data.user)
        navigate('/')
        toast.info(data.data.message, { autoClose: 1500, position: 'top-center' })
      },
      onError: (error) => {
        if (isErrorUnprocessableEntity<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
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
              <div className='text-2xl'>{t('profile:register')}</div>
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
              <Input
                register={register}
                errorMessage={errors.confirm_password?.message}
                name='confirm_password'
                className='relative mt-3'
                placeholder='Confirm Password'
                type='password'
              />
              <Button
                isLoading={AccountRegisterMutation.isLoading}
                disabled={AccountRegisterMutation.isLoading}
                className='mt-4 flex w-full items-center justify-center bg-[#2CB05A] py-4 px-2 text-sm uppercase text-white hover:bg-[#2CB05A]/90 '
              >
                {t('profile:register')}
              </Button>
              <div className='mt-8 text-center'>
                <div className='item-center flex justify-center'>
                  <span className='text-slate-400'>{t('profile:form_register_login.have_yet_account')}</span>
                  <Link to='/login' className='text-red-400'>
                    {t('profile:login')}
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
