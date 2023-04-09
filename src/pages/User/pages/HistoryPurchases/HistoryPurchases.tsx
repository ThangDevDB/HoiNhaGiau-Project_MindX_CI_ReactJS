import React, { useContext } from 'react'
import { purchasesStatus } from '../../../../contants/purchases'
import { Link, createSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import path from '../../../../contants/path'
import useQueryParams from '../../../../hook/useQueryParams'
import { AppContext } from '../../../../contexts/app.context'
import { useQuery } from '@tanstack/react-query'
import PurchasesApi from '../../../../apis/purchases.api'
import { PurchaseListStatus } from '../../../../types/purchases.type'
import { formatCurrency, generateNameId } from '../../../../utils/utils'

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã huỷ' }
]

export default function HistoryPurchases() {
  const queryParam: { status?: string } = useQueryParams()
  const status = Number(queryParam.status) || purchasesStatus.all
  const { isAuthenticated } = useContext(AppContext)

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: status }],
    queryFn: () => PurchasesApi.getPurchases({ status: status as PurchaseListStatus }),
    enabled: isAuthenticated
  })

  const historyData = purchasesInCartData?.data.data

  return (
    <div className='overflow-hidden'>
      <div className='min-w-[700px]'>
        <div className='sticky top-0 flex rounded-t-sm shadow-sm'>
          {purchaseTabs.map((item) => (
            <Link
              key={item.status}
              to={{
                pathname: path.historyPurchases,
                search: createSearchParams({
                  status: String(item.status)
                }).toString()
              }}
              className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
                'border-b-[#2CB05A] text-[#2CB05A]': status === item.status,
                'border-b-black/10 text-gray-900': status !== item.status
              })}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div>
          {historyData?.map((purchase) => (
            <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
              <Link
                className='flex'
                to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
              >
                <div className='flex-shrink-0'>
                  <img src={purchase.product.image} alt={purchase.product.name} className='h-20 w-20 object-cover' />
                </div>
                <div className='ml-3 flex-grow overflow-hidden'>
                  <div className='truncate'>{purchase.product.name}</div>
                  <div className='mt-3'>x{purchase.buy_count}</div>
                </div>
                <div className='ml-3 flex-shrink-0'>
                  <span className='truncate text-gray-500 line-through'>
                    đ{formatCurrency(purchase.product.price_before_discount)}
                  </span>
                  <div className='ml-2 truncate text-orange-500'>
                    <span>đ{formatCurrency(purchase.product.price)}</span>
                  </div>
                </div>
              </Link>
              <div className='flex items-center justify-end'>
                <span>Tổng giá tiền: </span>
                <span>
                  <div className='ml-4 text-xl text-orange-500'>
                    đ{formatCurrency(purchase.product.price * purchase.buy_count)}
                  </div>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
