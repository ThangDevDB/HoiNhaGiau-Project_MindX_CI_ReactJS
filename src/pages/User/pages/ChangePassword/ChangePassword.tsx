import { useForm } from 'react-hook-form'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { UserSchema, userSchema } from '../../../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import UserApi from '../../../../apis/user.api'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const changePasswordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const { t } = useTranslation('profile')
  const ChangePasswordMutation = useMutation(UserApi.updateProfile)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await ChangePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message, { autoClose: 1500 })
      reset()
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow-sm md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6 '>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('profile:change_password.name')}</h1>
        <div className='mt-1 text-sm capitalize text-gray-700'>{t('profile:account.my_profile.manage')}</div>
      </div>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>{t('profile:change_password.old')}</div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                placeholder='mật khẩu cũ'
                name='password'
                type='password'
                errorMessage={errors.password?.message}
                classNameInput='w-full capitalize rounded-sm border border-gray-400 px-3 py-2 outline-none focus:border-gray-600 focus:shadow-sm'
                className='relative'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>{t('profile:change_password.new')}</div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                placeholder='mật khẩu mới'
                name='new_password'
                type='password'
                errorMessage={errors.new_password?.message}
                classNameInput='w-full capitalize rounded-sm border border-gray-400 px-3 py-2 outline-none focus:border-gray-600 focus:shadow-sm'
                className='relative'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>
              {t('profile:change_password.new_confirm')}
            </div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                placeholder='nhập lại mật khẩu mới'
                name='confirm_password'
                type='password'
                errorMessage={errors.confirm_password?.message}
                classNameInput='w-full capitalize rounded-sm border border-gray-400 px-3 py-2 outline-none focus:border-gray-600 focus:shadow-sm'
                className='relative'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize ' />
            <div className='w-[80%] pl-5'>
              <Button
                type='submit'
                className='mt-10 flex h-9 items-center bg-[#2CB05A] px-5 text-center text-sm text-white hover:bg-[#2CB05A]/80'
              >
                {t('profile:account.my_profile.Save_change')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
