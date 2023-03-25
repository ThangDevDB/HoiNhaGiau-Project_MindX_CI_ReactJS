import React from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  name: string
  placeholder?: string
  className?: string
  errorMessage?: string
  register: UseFormRegister<any>
}

export default function Input({ type, name, placeholder, className, register, errorMessage }: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        className='w-full rounded-sm border border-gray-400 p-3 outline-none focus:border-gray-600 focus:shadow-sm'
        {...register(name)}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
