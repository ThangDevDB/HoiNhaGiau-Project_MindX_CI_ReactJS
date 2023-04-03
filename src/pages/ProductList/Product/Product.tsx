import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from '../../../utils/utils'
import { Product as ProductType } from '../../../types/product.type'
import ProductRating from '../../../components/ProductRating'
import path from '../../../contants/path'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameId({ name: product.name, id: product._id })}`}>
      <div className='rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        {/* padding-top: 100% thi width height cua image se luon luon co kich thuoc bang nhau*/}
        <div className='relative w-full pt-[100%]'>
          <img className='absolute top-0 left-0 w-full bg-white object-cover' src={product.image} alt={product.name} />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='lint min-h-[2rem] text-sm line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500'>
              <span className='text-xs'>đ</span>
              <span className='line-through'>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-3 truncate text-orange-500'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-2 flex items-center justify-start '>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>Đã bán</span>
              <span className='ml-1'>{formatNumberToSocialStyle(product.sold)}</span>
            </div>
          </div>
          <div className='mt-2 text-sm text-gray-400'>
            <span>Hà Nội</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
