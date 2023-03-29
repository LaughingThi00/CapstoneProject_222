import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/needwarranty.css'

function NeedWarranty ({ open, onClose }) {
  const [Phone, setPhone] = useState('')

  if (!open) return null

  const handleChangePhone = (e) => {
    setPhone(e.target.value)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    toast(
      'Bạn đã gửi yêu cầu thành công. Nhân viên của chúng tôi sẽ sớm liên hệ!'
    )

    await axios.post('http://localhost:8000/user/message-send', {
      phoneTo: `+84${Phone.slice(1)}`,
      bodyMessage: 'Trung tâm chăm sóc khách hàng đã nhận được yêu câu của quý khách. Chúng tôi sẽ liên hệ trong giây lát!'
    })
  }
  return (
    <>
      <ToastContainer />
      <div className='overlay'>
        <div className='form-warranty'>
          <button className='close-btn' onClick={onClose}>
            X
          </button>

          <form>
            <h4>Yêu cầu bảo hành, sửa chữa</h4>

            <label>
              Họ và Tên <span>*</span>
            </label>
            <input
              type='text'
              id='fullname'
              name='fullname'
              placeholder='Nguyễn Văn A'
            />
            <div className='flex-row'>
              <div className='flex-col-2'>
                <label>
                  Email
                </label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  placeholder='abc@hcmut.edu.vn'
                />
              </div>
              <div className='flex-col-2'>
                <label>Số điện thoại <span> *</span></label>
                <input
                  type='text'
                  id='phone'
                  name='phone'
                  value={Phone}
                  onChange={handleChangePhone}
                  placeholder='0948566534'
                />
              </div>
            </div>

            <label>
              Địa chỉ
            </label>
            <input
              type='text'
              id='adr'
              name='address'
              placeholder='Đại học Bách Khoa'
            />
            <div className='separate' />

            <label>
              Số Serial sản phẩm
            </label>
            <input
              type='text'
              id='sr'
              name='serial'
              placeholder='Đại học Bách Khoa'
            />
            <label>Tên sản phẩm</label>
            <input
              type='text'
              id='name-product'
              name='product'
              placeholder='Đại học Bách Khoa'
            />
            <label>Thương hiệu</label>
            <input
              type='text'
              id='trademark'
              name='trademark'
              placeholder='Ecovacs Robotic...'
            />
            <label>Vấn đề với sản phẩm</label>
            <input
              type='text'
              id='description'
              name='description'
              placeholder='Lỗi không hoạt động...'
              as='textarea'
            />
            <div className='separate' />
            <button className='submit-warranty' onClick={handleSend}>
              Gửi yêu cầu
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NeedWarranty
