import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/app.context'
import { logout } from '../../apis/auth.api'
import Popover from '../Popover'

export default function Header() {
  const { setIsAuthenticated, isAuthenticated, setUser, user } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setUser(null)
    }
  })

  const HandleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='bg-[#34cf96] pb-5 pt-2 text-white'>
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
            <div className='span mx-1'>Tieng Viet</div>
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
                  <Link to='/profile' className='block w-full bg-white py-3 px-5 text-left hover:text-cyan-500'>
                    Tài Khoản Của Tôi
                  </Link>
                  <Link to='#' className='block w-full bg-white py-3 px-5 text-left hover:text-cyan-500'>
                    Đơn Mua
                  </Link>
                  <button
                    onClick={HandleLogout}
                    className='block w-full bg-white py-3 px-5 text-left hover:text-cyan-500'
                  >
                    Đăng Xuất
                  </button>
                </div>
              }
            >
              <div className='mr-2 h-6 w-6 flex-shrink-0'>
                <img
                  src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/334595162_1779942765740461_7253883599807034741_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zfza7oEwoMYAX_tnqxr&_nc_ht=scontent.fhan17-1.fna&oh=00_AfCpDpmpJTt-oMYWBy-TMSw8qbt6ZCWS5-lSSY9nyV-IkQ&oe=64197DC1'
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
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
          <Link to='/' className='col-span-2 text-center text-xl text-white'>
            HoiNhaGiau
          </Link>
          <form className='col-span-8'>
            <div className='flex rounded-sm bg-white p-1'>
              <input
                type='text'
                name='search'
                placeholder='Tim san pham'
                className='flex-grow border-none bg-transparent px-3 py-2 text-black outline-none'
              />
              <button className='flex-shrink-0 rounded-sm bg-[#34cf96] py-2 px-6 hover:opacity-90'>
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
                  <div className='p-2'>
                    <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                    <div className='mt-5'>
                      <div className='mt-4 flex'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-11 w-11 object-cover'
                            src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/334595162_1779942765740461_7253883599807034741_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=zfza7oEwoMYAX_tnqxr&_nc_ht=scontent.fhan17-1.fna&oh=00_AfCpDpmpJTt-oMYWBy-TMSw8qbt6ZCWS5-lSSY9nyV-IkQ&oe=64197DC1'
                            alt='product'
                          />
                        </div>
                        <div className='ml-2 flex-grow overflow-hidden'>
                          <div className='cursor-pointer truncate'>
                            [Mã FATRAVEL19 giảm đến 30k đơn 99k] Tee basic ss1 CREWZ áo thun tay lỡ unisex Local Brand
                            -Lamo Store(V427)
                          </div>
                        </div>
                        <div className='ml-2 flex-shrink-0'>
                          <span className='text-[#34cf96]'>đ500.000</span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-6 flex items-center justify-between'>
                      <div className='text-xs capitalize text-gray-500'>1 thêm vào giỏ hàng</div>
                      <button className='rounded-sm bg-[#34cf96] px-4 py-2 capitalize text-white hover:opacity-80'>
                        Xem Giỏ Hàng
                      </button>
                    </div>
                  </div>
                </div>
              }
            >
              <Link to='/'>
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
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
