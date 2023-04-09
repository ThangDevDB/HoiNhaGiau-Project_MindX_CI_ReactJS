import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-neutral-200 py-16'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>2023 HoiNhaGiau. Tất cả bản quyền được bảo lưu</div>
          </div>
          <div className='lg:col-span-2'>
            <div className='text-center'>
              Quốc gia & Khu Vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam | Brazil | Hàn Quốc
            </div>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div className=''>Công ty TNHH HoiNhaGiau</div>
          <div className='mt-6'>
            Địa chỉ: Tầng 4 - 5 - 6, Toàn nhà Capital Place, số 29 đường Liễu Giai, Ba Đình, Hà Nội
          </div>
          <div className='mt-2 capitalize'>
            chịu trách nhiệm quản lí nội dung: nguyễn việt thắng - điện thoại liên hệ: 0343201003
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do sở kế hoạch & đầu tư Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>2023 - Bản quyền thuộc về công ty TNHH HoiNhaGiau</div>
        </div>
      </div>
    </footer>
  )
}
