import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import path from '../../../../contants/path'
import { AppContext } from '../../../../contexts/app.context'
import { getAvatarURL } from '../../../../utils/utils'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export default function UserSideNav() {
  const { t } = useTranslation('profile')
  const { user } = useContext(AppContext)
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={getAvatarURL(user?.avatar)} alt='avatar' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600 line-clamp-1'>{user?.name}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='mr-2 h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>
            {t('profile:account.my_profile.update')}
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center font-semibold capitalize text-[#2CB05A] transition-colors', {
              'text-[#2CB05A]': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='capitalize'>{t('profile:account.my_profile.name')}</div>
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('mt-5 flex items-center font-semibold capitalize text-[#2CB05A] transition-colors', {
              'text-[#2CB05A]': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='capitalize'>{t('profile:change_password.name')}</div>
        </NavLink>
        <NavLink
          to={path.historyPurchases}
          className={({ isActive }) =>
            classNames('mt-5 flex items-center font-semibold capitalize text-[#2CB05A] transition-colors', {
              'text-[#2CB05A]': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='capitalize'>{t('profile:history_purchase.name')}</div>
        </NavLink>
      </div>
    </div>
  )
}
