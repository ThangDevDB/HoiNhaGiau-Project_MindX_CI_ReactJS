import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'
import { logout } from '../../apis/auth.api'
import Popover from '../Popover'
import useQueryConfig from '../../hook/useQueryConfig'
import { Schema, schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchasesStatus } from '../../contants/purchases'
import PurchasesApi from '../../apis/purchases.api'
import { formatCurrency } from '../../utils/utils'
import Logo from '../../assets/LogoHNG6.svg'

type FormData = Pick<Schema, 'name'>

const nameSchema = schema.pick(['name'])

const MAX_PURCHASES = 5
// const NO_PURCHASES = 0

export default function Header() {
  const queryConfig = useQueryConfig()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  // console.log(queryConfig)
  const { setIsAuthenticated, isAuthenticated, setUser, user } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
      // sau khi dang xuat xoa du lieu trong gio hang, dang nhap moi xem dc gio hang
      queryClient.removeQueries({ queryKey: ['purchasesData', { status: purchasesStatus.inCart }] })
    }
  })

  const HandleLogout = () => {
    logoutMutation.mutate()
  }

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: '/',
      // search: createSearchParams({
      //   ...queryConfig,
      //   name: data.name
      // }).toString()
      search: createSearchParams(config).toString()
    })
  })

  // lay du lieu cua gio hang trong api show len ui
  const { data: purchasesData } = useQuery({
    queryKey: ['purchasesData', { status: purchasesStatus.inCart }],
    queryFn: () => PurchasesApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesData?.data.data
  // console.log(purchasesInCart)
  // if (!purchasesInCart) return []

  return (
    <div className='bg-gradient-to-t from-[#30C062] to-[#2CB05A] pb-5 pt-2 text-white'>
      <div className='container'>
        <div className='mr-6 flex justify-end'>
          <Popover
            className='flex cursor-pointer items-center py-1 hover:text-gray-300'
            renderPopover={
              <div className='relative rounded-sm border border-gray-300 bg-white shadow-md'>
                <div className='flex flex-col py-2 pr-28 pl-3'>
                  <button className='py-2 px-3 text-left hover:text-[#34cf96]'>Tiếng Việt</button>
                  <button className='py-2 px-3 text-left hover:text-[#34cf96]'>English</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <div className='span mx-1'>Tiếng Việt</div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
              renderPopover={
                <div className='relative rounded-sm border border-gray-300 bg-white shadow-md'>
                  <Link to='/profile' className='block w-full bg-white py-3 px-5 text-left hover:text-[#2CB05A]'>
                    Tài Khoản Của Tôi
                  </Link>
                  <Link to='#' className='block w-full bg-white py-3 px-5 text-left hover:text-[#2CB05A]'>
                    Đơn Mua
                  </Link>
                  <button
                    onClick={HandleLogout}
                    className='block w-full bg-white py-3 px-5 text-left hover:text-[#2CB05A]'
                  >
                    Đăng Xuất
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-6 w-6 flex-shrink-0'>
                <img src={Logo} alt='avatar' className='h-full w-full rounded-full object-cover' />
              </div>
              <div className=''>{user?.email}</div>
            </Popover>
          )}

          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                Đăng kí
              </Link>
              <div className='h-4 border-r-[2px] border-r-white' />
              <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        <div className='mt-3 grid grid-cols-12 items-center gap-4'>
          <Link to='/' className='col-span-2 flex flex-col items-center gap-1 text-center text-xl font-bold text-black'>
            <img src={Logo} alt='logo' className='h-12 w-12 flex-shrink-0 object-cover' />
            HNG
          </Link>
          <form className='col-span-8' onSubmit={onSubmitSearch}>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                // name='search'
                placeholder='Tim san pham'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
                {...register('name')}
              />
              <button className='flex-shrink-0 rounded-sm bg-[#2CB05A] py-2 px-6 hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-2 justify-self-start'>
            <Popover
              className='ml-6 flex cursor-pointer items-center py-1 hover:text-gray-300'
              renderPopover={
                <div className='relative max-w-[400px] rounded-sm border border-gray-300 bg-white text-sm shadow-md'>
                  {purchasesInCart ? (
                    <div className='p-2'>
                      <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                      <div className='mt-5'>
                        {purchasesInCart.slice(0, MAX_PURCHASES).map((purchases) => {
                          return (
                            <div className='mt-4 flex' key={purchases._id}>
                              <div className='flex-shrink-0'>
                                <img
                                  className='h-11 w-11 object-cover'
                                  src={purchases.product.image}
                                  alt={purchases.product.name}
                                />
                              </div>
                              <div className='ml-2 flex-grow overflow-hidden'>
                                <div className='cursor-pointer truncate'>{purchases.product.name}</div>
                              </div>
                              <div className='ml-2 flex-shrink-0'>
                                <span className='text-[#2CB05A]'>đ{formatCurrency(purchases.product.price)}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className='mt-6 flex items-center justify-between'>
                        <div className='text-xs capitalize text-gray-500'>
                          {purchasesInCart.length > MAX_PURCHASES ? purchasesInCart.length - MAX_PURCHASES : ''} thêm
                          vào giỏ hàng
                        </div>
                        <Link
                          to='/cart'
                          className='rounded-sm bg-[#2CB05A] px-4 py-2 capitalize text-white hover:opacity-80'
                        >
                          Xem Giỏ Hàng
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                      <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png'
                        alt='no purchase'
                        className='h-24 w-24'
                      />
                      <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                    </div>
                  )}
                </div>
              }
            >
              <Link to='/cart' className='relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                {purchasesInCart && (
                  <span className='absolute top-[-5px] left-[17px] rounded-full bg-white px-[9px] py-[1px] text-xs font-bold text-orange-500 '>
                    {purchasesInCart?.length}
                  </span>
                )}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
