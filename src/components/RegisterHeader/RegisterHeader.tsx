import React from 'react'
import { Link, useMatch } from 'react-router-dom'

export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='py-5'>
      <div className='mx-auto max-w-7xl px-4'>
        <nav className='flex items-center'>
          <Link to='#'>
            <h2 className='text-2xl text-orange-500'>HoiNhaGiau</h2>
          </Link>
          <div className='ml-5 text-xl lg:text-2xl'>{isRegister ? 'Đăng Kí' : 'Đăng Nhập'}</div>
        </nav>
      </div>
    </header>
  )
}
