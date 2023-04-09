import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Input from '../../../../components/Input'
// import Logo from '../../../../assets/LogoHNG6.svg'
import Button from '../../../../components/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserApi from '../../../../apis/user.api'
import { UserSchema, userSchema } from '../../../../utils/rules'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DateOfBirth from '../../components/DateOfBirth/DateOfBirth'
import InputNumber from '../../../../components/InputNumber'
import { toast } from 'react-toastify'
import { AppContext } from '../../../../contexts/app.context'
import { setUserName } from '../../../..//utils/auth'
import { getAvatarURL } from '../../../../utils/utils'
import { useTranslation } from 'react-i18next'

type FormData = Pick<UserSchema, 'name' | 'address' | 'numberPhone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'numberPhone', 'date_of_birth', 'avatar'])

// Flow 1
// Nhan upload: upload len sever luon => sever tra ve url
// Nhan submit thi gui url anh voi data len sever
// Flow 2
// Nhan upload thi ko upload len sever luon
// Nhan submit thi tien hanh upload len sever, thanh cong thi tien hanh goi api updateProfile

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()

  // su dung useMeno de han che khi re-render lai goi den createObjectURL
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { t } = useTranslation('profile')

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      numberPhone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1)
      // avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const avatar = watch('avatar')

  const updateProfileMutation = useMutation({
    mutationFn: UserApi.updateProfile
  })

  const uploadAvatarMutation = useMutation(UserApi.uploadAvatar)

  const { setUser } = useContext(AppContext)

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: UserApi.getProfile
  })
  const profile = profileData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('address', profile.address)
      setValue('numberPhone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
      setValue('avatar', profile.avatar)
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        // FormData la mot api cua JS
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        phone: data.numberPhone,
        avatar: avatarName
      })
      setUser(res.data.data)
      setUserName(res.data.data)
      refetch()
      toast.success(res.data.message, { autoClose: 1500 })
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  })

  const handleUpLoad = () => {
    fileInputRef.current?.click()
  }

  const onFileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
  }

  // if (!profile) return null
  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow-sm md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6 '>
        <h1 className='text-lg font-medium capitalize text-gray-900'>{t('profile:account.my_profile.name')}</h1>
        <div className='mt-1 text-sm capitalize text-gray-700'>{t('profile:account.my_profile.manage')}</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-12 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>Email</div>
            <div className='w-[80%] pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>
              {t('profile:account.my_profile.username')}
            </div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
                classNameInput='w-full rounded-sm border border-gray-400 px-3 py-2 outline-none focus:border-gray-600 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>{t('profile:account.my_profile.phone')}</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='numberPhone'
                render={({ field }) => (
                  <InputNumber
                    // register={register}
                    placeholder='Số Điện Thoại'
                    // name='phone'
                    errorMessage={errors.numberPhone?.message}
                    classNameInput='w-full rounded-sm border border-gray-400 px-3 py-2 outline-none focus:border-gray-600 focus:shadow-sm'
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap'>
            <div className='w-[20%] truncate pt-3 text-right capitalize '>
              {t('profile:account.my_profile.address')}
            </div>
            <div className='w-[80%] pl-5'>
              <Input
                register={register}
                placeholder='Địa Chỉ'
                name='address'
                errorMessage={errors.address?.message}
                classNameInput='w-full rounded-sm border border-gray-400 px-3 py-2 outline-none focus:border-gray-600 focus:shadow-sm'
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => (
              <DateOfBirth errorMessage={errors.date_of_birth?.message} onChange={field.onChange} value={field.value} />
            )}
          />
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
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage || getAvatarURL(avatar)}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input
              type='file'
              accept='.jpg,.jpeg,.png'
              className='hidden'
              ref={fileInputRef}
              onChange={onFileChanged}
            />
            <button
              onClick={handleUpLoad}
              type='button'
              className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
            >
              {t('profile:account.my_profile.select_image')}
            </button>
            <div className='mt-3 capitalize text-gray-600'>
              <div>{t('profile:account.my_profile.Maximum_capacity')} 1MB</div>
              <div>{t('profile:account.my_profile.Format')}: .JPG, .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
