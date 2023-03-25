import classNames from 'classnames'
import React from 'react'
import { QueryConfig } from '../PorductList'
import {ProductListConfig} from '../../../types/product.type'
import { sortBy } from '../../../contants/product'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortProductList({ queryConfig, pageSize }: Props) {
  const { sort_by = sortBy.createdAt } = queryConfig
  const isActive = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  return (
    <div className='bg-gray-300/40 py-4 px-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>Sắp xếp theo</div>
          <button
            className={classNames(
              'h-8  px-4 text-center text-sm capitalize text-white hover:bg-[#34cf96]/80',
              {
                'bg-[#34cf96] text-white hover:bg-[#34cf96]/80' : isActive(sortBy.view)
              }
            )}
          >
            phổ biến
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            mới nhất
          </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize text-black hover:bg-slate-100'>
            bán chạy
          </button>
          <select
            title='Giá'
            className='h-8 bg-white px-4 text-left text-sm capitalize outline-none hover:bg-slate-100'
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price asc' className='capitalize'>
              Giá từ thấp đến cao
            </option>
            <option value='price desc' className='capitalize'>
              Giá từ cao đến thấp
            </option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-[#34cf96]'>1</span>
            <span>/2</span>
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
        </div>
      </div>
    </div>
  )
}
