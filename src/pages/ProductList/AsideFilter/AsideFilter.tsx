import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import path from '../../../contants/path'

export default function AsideFilter() {
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
        Tất Cả Danh Mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-400' />
      <ul>
        <li className='py-2 pl-2'>
          <Link to='#' className='relative px-2 font-semibold text-[#34cf96]'>
            <svg viewBox='0 0 4 7' className='absolute top-1 left-[-10px] h-3 w-3 fill-[#34cf96]'>
              <polygon points='4 3.5 0 0 0 7'></polygon>
            </svg>
            Thời Trang Nam
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to='#' className='relative px-2 font-semibold text-[#34cf96]'>
            Điện Thoại
          </Link>
        </li>
        <li className='py-2 pl-2'>
          <Link to='#' className='relative px-2 font-semibold text-[#34cf96]'>
            Đồng Hồ
          </Link>
        </li>
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
        bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-400' />
      <div className='my-5'>
        <div>Khoảng Giá</div>
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
          <Button className='mt-5 flex w-full items-center justify-center bg-[#34cf96] p-2 text-sm uppercase text-white hover:bg-[#34cf96]/80'>
            áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-400' />
      <div className='text-xl'>Đánh Giá</div>
      <ul className='my-5'>
        <li className='py-1 pl-2'>
          <Link to='#' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-6 w-6'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='#' className='flex items-center text-sm'>
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-6 w-6'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='my-4 h-[1px] bg-gray-400' />
      <Button className='w-full bg-[#34cf96] py-2 px-2 text-center text-sm uppercase text-white hover:bg-[#34cf96]/80'>
        xóa tất cả
      </Button>
    </div>
  )
}
