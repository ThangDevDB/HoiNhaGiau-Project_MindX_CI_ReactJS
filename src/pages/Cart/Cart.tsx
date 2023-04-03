import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import produce from 'immer'
import { purchasesStatus } from '../../contants/purchases'
import PurchasesApi from '../../apis/purchases.api'
import { Link, useLocation } from 'react-router-dom'
import path from '../../contants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../components/QuantityController/QuantityController'
import Button from '../../components/Button'
import { Purchase } from '../../types/purchases.type'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'

interface ExtendedPurchses extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const queryClient = useQueryClient()
  const [extendedPurChases, setExtendedPurChases] = useState<ExtendedPurchses[]>([])
  // const [buyCount, setBuyCount] = useState(1)

  const { data: purchasesData, refetch } = useQuery({
    queryKey: ['purchasesData', { status: purchasesStatus.inCart }],
    queryFn: () => PurchasesApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchaseCart = purchasesData?.data.data
  const location = useLocation()
  const choosenPurchasesIdFromLoaction = (location.state as { purchasesId: string } | null)?.purchasesId
  const allChecked = extendedPurChases.every((purchases) => purchases.checked)
  const checkedPurchases = extendedPurChases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasesPrice = checkedPurchases.reduce((result, crr) => {
    return result + crr.product.price * crr.buy_count
  }, 0)
  const totalCheckedPurchasesSavingPrice = checkedPurchases.reduce((result, crr) => {
    return result + (crr.product.price_before_discount - crr.product.price) * crr.buy_count
  }, 0)

  useEffect(() => {
    setExtendedPurChases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchaseCart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchasesIdFromLoaction === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchaseCart, choosenPurchasesIdFromLoaction])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // draft la dai dien cho setExtendedPurChases ( giong voi prev )
    setExtendedPurChases(
      produce((draft) => {
        // dung draft lay productIndex va thay doi checked
        draft[productIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurChases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !allChecked
      }))
    )
  }

  const deletePurchasesMutation = useMutation({
    mutationFn: PurchasesApi.deletePurchases,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchasesData', { status: purchasesStatus.inCart }] })
    }
  })

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurChases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchasesIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchasesIds)
  }

  const updatePurchaseMutation = useMutation({
    mutationFn: PurchasesApi.updatePurchases,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProducts = useMutation({
    mutationFn: PurchasesApi.buyProducts,
    onSuccess: (data) => {
      toast.success(data.data.message, { autoClose: 1000, position: 'top-center' })
      refetch()
    }
  })

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchases) => ({
        product_id: purchases.product._id,
        buy_count: purchases.buy_count
      }))
      buyProducts.mutate(body)
    }
  }

  const handleQuantity = (purchasesIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchases = extendedPurChases[purchasesIndex]
      setExtendedPurChases(
        produce((draft) => {
          // dung draft lay productIndex va thay doi checked
          draft[purchasesIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchases.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (purchasesIndex: number) => (value: number) => {
    setExtendedPurChases(
      produce((draft) => {
        // dung draft lay productIndex va thay doi checked
        draft[purchasesIndex].buy_count = value
      })
    )
  }

  return (
    <div className='bg-neutral-50 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='my-3 rounded-sm bg-white p-5'>
              {extendedPurChases.length > 0 ? (
                <>
                  <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow-sm'>
                    <div className='col-span-6 bg-white'>
                      <div className='flex items-center'>
                        <div className='flex-shirnk-0 flex items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange-500'
                            checked={allChecked}
                            onChange={handleCheckAll}
                          />
                        </div>
                        <div className='flex-grow text-black'>Sản Phẩm</div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 text-center'>
                        <div className='col-span-2'>Đơn Giá</div>
                        <div className='col-span-1'>Số Lượng</div>
                        <div className='col-span-1'>Số Tiền</div>
                        <div className='col-span-1'>Thao tác</div>
                      </div>
                    </div>
                  </div>
                  {extendedPurChases?.map((purchases, index) => {
                    return (
                      <div
                        key={purchases._id}
                        className='grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex-shirnk-0 flex items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange-500'
                                checked={purchases.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  to={`${path.home}${generateNameId({
                                    name: purchases.product.name,
                                    id: purchases.product._id
                                  })}`}
                                  className='h-20 w-20 flex-shrink-0'
                                >
                                  <img src={purchases.product.image} alt={purchases.product.name} className='' />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link
                                    className='line-clamp-2'
                                    to={`${path.home}${generateNameId({
                                      name: purchases.product.name,
                                      id: purchases.product._id
                                    })}`}
                                  >
                                    {purchases.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  {formatCurrency(purchases.product.price_before_discount)}
                                </span>
                                <span className='ml-3 text-orange-500'>{formatCurrency(purchases.product.price)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                classNameWrapper='flex items-center ml-0'
                                max={purchases.product.quantity}
                                onIncrease={(value) =>
                                  handleQuantity(index, value, value <= purchases.product.quantity)
                                }
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                disabled={purchases.disabled}
                                value={purchases.buy_count}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchases.product.quantity &&
                                      value !== (purchaseCart as Purchase[])[index].buy_count
                                  )
                                }
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange-500'>
                                đ{formatCurrency(purchases.price * purchases.buy_count)}
                              </span>
                            </div>
                            <div className='col-span-1'>
                              <button
                                onClick={handleDelete(index)}
                                className='rounded-sm bg-orange-500 px-3 py-2 text-white hover:bg-orange-500/90'
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className='sticky bottom-0 z-10 flex items-center rounded-sm bg-white p-5'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-orange-500'
                        checked={allChecked}
                        onChange={handleCheckAll}
                      />
                    </div>
                    <button className='mx-3 rounded-sm bg-none'>Chọn Tất Cả ({extendedPurChases.length})</button>
                    <button
                      onClick={handleDeleteManyPurchases}
                      className='mx-3 rounded-sm border-none bg-orange-500 px-4 py-2 text-white hover:bg-orange-500 '
                    >
                      Xóa
                    </button>
                    <div className='ml-auto flex items-center'>
                      <div>
                        <div className='flex items-center justify-end'>
                          <div>Tổng Thanh Toán ({checkedPurchasesCount} sản phẩm)</div>
                          <div className='ml-2 text-2xl text-orange-500'>
                            đ{formatCurrency(totalCheckedPurchasesPrice)}
                          </div>
                        </div>
                        <div className='flex items-center justify-end text-sm'>
                          <div className='text-gray-500'>Tiết kiệm</div>
                          <div className='ml-6 text-orange-500'>
                            đ{formatCurrency(totalCheckedPurchasesSavingPrice)}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          onClick={handleBuyPurchases}
                          disabled={buyProducts.isLoading}
                          className='mt-4 ml-4 flex h-10 w-52 items-center justify-center bg-[#2CB05A] text-sm uppercase text-white hover:bg-[#2CB05A]/90'
                        >
                          Mua Hàng
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className='text-center'>
                  <div className='flex items-center justify-center'>
                    <img
                      src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png'
                      alt='no product in cart'
                      className='h-24 w-24'
                    />
                  </div>
                  <div className='mt-5 font-bold capitalize text-gray-600'>Giỏ hàng của bạn còn trống</div>
                  <div className='mt-5'>
                    <Link
                      to='/'
                      className='rounded-sm bg-[#2CB05A] px-6 py-2 capitalize text-white transition-all hover:bg-[#2CB05A]/80'
                    >
                      mua ngay
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
