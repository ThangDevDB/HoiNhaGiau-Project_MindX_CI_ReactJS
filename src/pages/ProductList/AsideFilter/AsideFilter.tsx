import React from 'react'
import { omit } from 'lodash'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { Category } from '../../../types/category.type'
import Button from '../../../components/Button'
import path from '../../../contants/path'
import { QueryConfig } from '../PorductList'
import classNames from 'classnames'
import RatingStar from '../../../pages/RatingStar'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { t } = useTranslation(['home', 'product'])
  const { category } = queryConfig
  const navigate = useNavigate()

  const handleRemoveAll = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit(queryConfig, ['category', 'rating_filter'])).toString()
    })
  }
  // console.log(category)
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-3 h-6 w-6 fill-current'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
          />
        </svg>
        {t('home:aside_filter.all_categories')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-400' />
      <ul>
        {categories.map((categoriesItem) => {
          const isActive = categoriesItem._id === category
          return (
            <li className='py-2 pl-2' key={categoriesItem._id}>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoriesItem._id
                  }).toString()
                }}
                className={classNames('relative px-2 ', {
                  'font-semibold text-[#2CB05A]': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-3 w-3 fill-[#2CB05A]'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {categoriesItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='#' className='mt-4 flex items-center font-bold uppercase'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-5 w-5 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        {t('home:aside_filter.filter_search')}
      </Link>
      <div className='my-4 h-[1px] bg-gray-400' />
      {/* <div className='my-5'>
        <div>{t('home:aside_filter.range_price')}</div>
        <form className='mt-2'>
          <div className='flex items-center'>
            <div className='grow'>
              <input
                type='text'
                name='from'
                className='w-full rounded-sm border border-gray-300 px-1 py-1 text-sm outline-none focus:shadow-sm'
                placeholder='đ Từ'
              />
            </div>
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <div className='grow'>
              <input
                type='text'
                name='to'
                className='w-full rounded-sm border border-gray-300 px-1 py-1 text-sm outline-none focus:shadow-sm'
                placeholder='đ Đến'
              />
            </div>
          </div>
          <Button className='mt-5 flex w-full items-center justify-center bg-[#2CB05A] p-2 text-sm uppercase text-white hover:bg-[#2CB05A]/80'>
            {t('home:aside_filter.apply')}
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-400' /> */}
      <div className='text-xl'>{t('home:aside_filter.rate')}</div>
      <RatingStar queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-400' />
      <Button
        onClick={handleRemoveAll}
        className='w-full bg-[#2CB05A] py-2 px-2 text-center text-sm uppercase text-white hover:bg-[#2CB05A]/80'
      >
        {t('home:aside_filter.delete_all')}
      </Button>
    </div>
  )
}
