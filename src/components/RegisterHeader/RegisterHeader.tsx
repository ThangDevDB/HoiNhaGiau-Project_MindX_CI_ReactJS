import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import Logo from '../../assets/LogoHNG6.svg'
import { useTranslation } from 'react-i18next'

export default function RegisterHeader() {
  const { t } = useTranslation('profile')
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <header className='bg-[#FFF9F7] py-5'>
      <div className='mx-auto max-w-7xl px-4'>
        <nav className='flex items-center'>
          <Link to='/' className='flex items-center gap-2'>
            <img src={Logo} alt='logo' className='h-12 w-12 flex-shrink-0 object-cover' />
            <h2 className='text-xl text-[#2CB05A]'>HNG</h2>
          </Link>
          {isRegister ? (
            <div className='ml-5 text-xl lg:text-2xl'>{t('profile:register')}</div>
          ) : (
            <div className='ml-5 text-xl lg:text-2xl'>{t('profile:login')}</div>
          )}
        </nav>
      </div>
    </header>
  )
}
