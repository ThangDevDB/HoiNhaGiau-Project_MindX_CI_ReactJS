import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-neutral-200 py-16'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <div>2023 HoiNhaGiau. Tat ca ban quyen duoc bao luu</div>
          </div>
          <div className='lg:col-span-2'>
            <div className='text-center'>
              Quoc gia & Khu vuc: Singapore | Indonesia | Dai Loan | Thai Lan | Malaysia | Viet Nam | Philipines |
              Brazil | Mexico | Colombia | Chile | Poland
            </div>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div className=''>Cong ty TNHH HoiNhaGiau</div>
          <div className='mt-6'>
            Dia chi: Tang 4 - 5 - 6, Toa nha Capital Place, so 29 duong Lieu Giai, Ba Dinh, Ha Noi
          </div>
          <div className='mt-2'>
            Chiu Trach Nhiem Quan Li Noi Dung: Nguyen Viet Thang - Dien thoai lien he: 0343201003
          </div>
          <div className='mt-2'>
            Ma So Doanh Nghiep: 0106773786 do So Ke Hoach & Dau tu Ha Noi cap lan dau ngay 10/02/2015
          </div>
          <div className='mt-2'>2015 - Ban quyen thuoc ve cong ty TNHH HoiNhaGiau</div>
        </div>
      </div>
    </footer>
  )
}
