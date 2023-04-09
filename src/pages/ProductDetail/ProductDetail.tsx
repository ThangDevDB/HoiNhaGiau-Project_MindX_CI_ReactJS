import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { useNavigate, useParams } from 'react-router-dom'
import ProductRating from '../../components/ProductRating'
import ProductApi from '../../apis/product.api'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/utils'
// import InputNumber from '../../components/InputNumber/InputNumber'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import Product from '../ProductList/Product'
import QuantityController from '../../components/QuantityController/QuantityController'
import PurchasesApi from '../../apis/purchases.api'
import { purchasesStatus } from '../../contants/purchases'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../../contexts/app.context'

export default function ProductDetail() {
  const { isAuthenticated } = useContext(AppContext)
  const { t } = useTranslation('product')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(1)
  // lay id san pham tren url
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  // console.log(id)
  // call api data product detail
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => ProductApi.getProductDetail(id as string)
  })
  const productDetail = productDetailData?.data.data

  // xu li slide anh
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  // Su dung useMemo cho slide anh de tranh truong hop component re-render thi currentImages pahi tinh toan lai
  const currentImages = useMemo(
    () => (productDetail ? productDetail.images.slice(...currentIndexImages) : []),
    [productDetail, currentIndexImages]
  )

  // Lay ra ca san pham phu hop voi san pham chi tiet duoc xem, map ra trong muc co the ban se thich
  const queryConfig: ProductListConfig = { limit: '12', page: '1', category: productDetail?.category._id }

  const { data: productsData } = useQuery({
    queryKey: ['product_you_like', queryConfig],
    queryFn: () => {
      return ProductApi.getProducts(queryConfig)
    }
  })

  useEffect(() => {
    if (productDetail && productDetail.images.length > 0) {
      setActiveImage(productDetail.images[0])
    }
  }, [productDetail])

  const next = () => {
    // console.log(currentIndexImages)
    if (currentIndexImages[1] < (productDetail as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  // them vao gio hang
  const addToCartMutation = useMutation(PurchasesApi.addToCart)

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: productDetail?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          queryClient.invalidateQueries({ queryKey: ['purchasesData', { status: purchasesStatus.inCart }] })
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: productDetail?._id as string })
    const purchase = res.data.data
    navigate('/cart', {
      state: { purchaseId: purchase._id }
    })
  }

  const navigateToLogin = () => {
    navigate('/login')
  }

  if (!productDetail) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full cursor-pointer overflow-hidden pt-[100%] shadow'>
                <img
                  className=' absolute top-0 left-0 h-full w-full bg-white object-cover'
                  src={activeImage}
                  alt={productDetail.name}
                />
                <div className='relative mt-4 grid grid-cols-5 gap-1'>
                  <button
                    onClick={prev}
                    className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {currentImages.map((img) => {
                    const isActive = img === activeImage
                    return (
                      <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                        <img
                          className=' absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                          src={img}
                          alt={productDetail.name}
                        />
                        {isActive && <div className='absolute inset-0 border-2 border-[#2CB05A]' />}
                      </div>
                    )
                  })}
                  <button
                    onClick={next}
                    className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{productDetail.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-yellow-500 text-orange-500'>{productDetail.rating}</span>
                  <ProductRating rating={productDetail.rating} />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(productDetail.sold)}</span>
                  <span className='ml-1 text-gray-500'>{t('product.sold')}</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(productDetail.price_before_discount)}</div>
                <div className='text-orange ml-3 text-3xl font-medium'>₫{formatCurrency(productDetail.price)}</div>
                <div className='ml-4 rounded-sm bg-orange-500 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(productDetail.price_before_discount, productDetail.price)} {t('product.discount')}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='pr-10 capitalize text-gray-500'>{t('product.quantity')}</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onType={handleBuyCount}
                  onIncrease={handleBuyCount}
                  value={buyCount}
                  max={productDetail.quantity}
                />
                <div className='ml-6 text-sm text-gray-500'>
                  {productDetail.quantity} {t('product.available')}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                {isAuthenticated && (
                  <button
                    onClick={addToCart}
                    className='flex h-12 items-center justify-center rounded-sm border border-[#2CB05A] bg-[#2CB05A]/10 px-5 capitalize text-[#2CB05A] shadow-sm hover:bg-[#2CB05A]/5'
                  >
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='mr-[10px] h-5 w-5 fill-current stroke-[#2CB05A] text-[#2CB05A]'
                    >
                      <g>
                        <g>
                          <polyline
                            fill='none'
                            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy='13.5' r={1} stroke='none' />
                          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                        </g>
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1='7.5'
                          x2='10.5'
                          y1={7}
                          y2={7}
                        />
                        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                      </g>
                    </svg>
                    {t('cart.add_to_cart')}
                  </button>
                )}
                {!isAuthenticated && (
                  <button
                    onClick={navigateToLogin}
                    className='flex h-12 items-center justify-center rounded-sm border border-[#2CB05A] bg-[#2CB05A]/10 px-5 capitalize text-[#2CB05A] shadow-sm hover:bg-[#2CB05A]/5'
                  >
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='mr-[10px] h-5 w-5 fill-current stroke-[#2CB05A] text-[#2CB05A]'
                    >
                      <g>
                        <g>
                          <polyline
                            fill='none'
                            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                          <circle cx={6} cy='13.5' r={1} stroke='none' />
                          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                        </g>
                        <line
                          fill='none'
                          strokeLinecap='round'
                          strokeMiterlimit={10}
                          x1='7.5'
                          x2='10.5'
                          y1={7}
                          y2={7}
                        />
                        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                      </g>
                    </svg>
                    {t('cart.add_to_cart')}
                  </button>
                )}

                {isAuthenticated && (
                  <button
                    onClick={buyNow}
                    className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-[#2CB05A] px-5 capitalize text-white shadow-sm outline-none hover:bg-[#2CB05A]/90'
                  >
                    {t('cart.buy_now')}
                  </button>
                )}
                {!isAuthenticated && (
                  <button
                    onClick={navigateToLogin}
                    className='ml-4 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-[#2CB05A] px-5 capitalize text-white shadow-sm outline-none hover:bg-[#2CB05A]/90'
                  >
                    {t('cart.buy_now')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className=' bg-white p-4 shadow'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>{t('product.desc')}</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(productDetail.description)
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <div className='uppercase text-gray-600'> {t('product.recommended_products')}</div>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
