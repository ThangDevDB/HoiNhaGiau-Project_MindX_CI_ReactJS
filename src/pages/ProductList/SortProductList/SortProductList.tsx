import classNames from 'classnames'
import { QueryConfig } from '../PorductList'
import { ProductListConfig } from '../../../types/product.type'
import { sortBy, order as orderContant } from '../../../contants/product'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig }: Props) {
  const { t } = useTranslation('home')
  // const page = Number(pageSize)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const isActive = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const navigate = useNavigate()
  const handleSort = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handleOrder = (orderByValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderByValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>{t('filter_product.sort_by')}</div>
          <button
            className={classNames('h-8 px-4 text-center text-sm capitalize', {
              'bg-[#2CB05A] text-white hover:bg-[#2CB05A]/80': isActive(sortBy.view),
              'bg-white text-black hover:bg-slate-100': !isActive(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            {t('filter_product.popular')}
          </button>
          <button
            className={classNames('h-8  px-4 text-center text-sm capitalize', {
              'bg-[#2CB05A] text-white hover:bg-[#2CB05A]/80': isActive(sortBy.createdAt),
              'bg-white text-black hover:bg-slate-100': !isActive(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            {t('filter_product.latest')}
          </button>
          <button
            className={classNames('h-8  px-4 text-center text-sm capitalize', {
              'bg-[#2CB05A] text-white hover:bg-[#2CB05A]/80': isActive(sortBy.sold),
              'bg-white text-black hover:bg-slate-100': !isActive(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            {t('filter_product.best_seller')}
          </button>
          <select
            title='Giá'
            className={classNames('h-8  px-4 text-left text-sm capitalize outline-none', {
              'bg-[#2CB05A] text-white hover:bg-[#2CB05A]/80': isActive(sortBy.price),
              'bg-white text-black hover:bg-slate-100': !isActive(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handleOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='bg-white text-black'>
              {t('filter_product.price')}
            </option>
            <option value={orderContant.asc} className='bg-white capitalize text-black'>
              {t('filter_product.desc_price')}
            </option>
            <option value={orderContant.desc} className='bg-white capitalize text-black'>
              {t('filter_product.asc_price')}
            </option>
          </select>
        </div>
        {/* <div className='flex items-center'>
          <div>
            <span className='text-[##2CB05A]'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2'>
            <button className='h-8 cursor-not-allowed rounded-tl-sm rounded-bl-sm bg-white/60 px-3 shadow-sm hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='h-8 rounded-tr-sm rounded-br-sm bg-white px-3 shadow-sm hover:bg-slate-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
