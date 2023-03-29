import React from 'react'
import imgDemo from '../img/Xiaomi/1.png'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function InfoWarranty ({ open, onClose }) {
  const navigate = useNavigate()

  if (!open) return null
  return (
    <>
      <div className='border-form Warranty-info-modal'>
        <button className='close-btn' onClick={onClose}>
          X
        </button>

        <h4 className='header-text'>Thông tin bảo hành</h4>
        <div className='flex-row'>

          <div className='flex-col-1-3'>

            <div className='info-warranty-item'>
              <img src={imgDemo} alt='' className='DPi-image' />
              <div className='text-lighter'>Xiaomi</div>
              <div className='DPi-name'>Vacuum Mop 2 Pro</div>
            </div>

          </div>

          <div className='flex-col-2-3'>
            <div className='flex-col-2 text-strong'>
              <p>Số serial:</p>
              <p>Tên sản phẩm:</p>
              <p>Tên khách hàng:</p>
              <p>Số điện thoại:</p>
              <p>Ngày mua:</p>
              <p>Thời hạn bảo hành:</p>
            </div>
            <div className='flex-col-2'>
              <p> TX-270266 </p>
              <p className='text-strong'> Xiaomi Vacuum Mop 2 Pro</p>
              <p>Nguyễn Minh Thiện</p>
              <p>0389895377</p>
              <p>17/12/2022</p>
              <p>17/12/2024</p>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Button variant='success' onClick={() => navigate('/detail/1')}>Đặt lại</Button>
        </div>
      </div>
    </>
  )
}

export default InfoWarranty
