import '../css/checkoutscreen.css'
import axios from 'axios'
// import { useState } from "react";
import { Button } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { apiPayment } from '../constants/Constant'

function CheckoutScreen () {
  const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

  const toNum = (str) => {
    return Number(str.split(' ')[0].replace(/\./g, ''))
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'

  })
  let sum = 0

  cart.forEach(x => {
    sum += toNum(x.product.priceOn) * x.num
  })

  const handlePay = async (e) => {
    e.preventDefault()
    try {
      const payment = await axios.post(`${apiPayment}`, {
        amount: sum,
        orderId: `DONHANG${Math.floor(Math.random() * 100000)}`,
        orderInfo: 'DON HANG BKROBOTIC'
      })

      if (payment.data.code === 200) {
        console.log(payment.data.data)
        window.location.replace(payment.data.data)
      }
    } catch (error) {
      console.log('Xay ra loi')
      console.log(error)
    }
  }
  return (
    <div className='container'>
      <div className='form'>
        <form>
          <h3>Thông tin giao hàng</h3>

          <label id='fullname'>
            {' '}
            Họ và tên <span className='star'>*</span>
          </label>
          <input
            type='text'
            name='fullname'
            style={{ width: '100%' }}
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
                style={{ width: '100%' }}

                placeholder='abc@hcmut.edu.vn'
              />
            </div>
            <div className='flex-col-2'>
              <label>Số điện thoại <span> *</span></label>
              <input
                type='text'
                id='phone'
                name='phone'
                style={{ width: '100%' }}

                placeholder='0948566534'
              />
            </div>
          </div>

          <label id='adr'>
            {' '}
            Địa chỉ <span className='star'>*</span>
          </label>
          <input
            type='text'
            style={{ width: '100%' }}
            name='address'
            placeholder='Đại học Bách Khoa'
          />

          <div className='separation' />

          <p>Phương thức thanh toán</p>
          <div className='radio-item'>
            <label id='COD'>
              <img
                alt=''
                src='https://cdn-icons-png.flaticon.com/512/5720/5720434.png'
              />
              Thanh toán khi nhận hàng
            </label>
            <input type='radio' id='COD' name='pay-method' value='COD' />
          </div>

          <div className='radio-item'>
            <label id='bank'>
              <img
                alt=''
                src='https://cdn-icons-png.flaticon.com/512/5720/5720434.png'
              />
              Chuyển khoản qua ngân hàng
            </label>
            <input type='radio' id='bank' name='pay-method' value='bank' />
          </div>
          <div className='radio-item'>
            <label id='momo'>
              <img
                alt=''
                src='https://cdn-icons-png.flaticon.com/512/5720/5720434.png'
              />
              Ví momo
            </label>
            <input type='radio' id='momo' name='pay-method' value='momo' />
          </div>
          <div className='radio-item'>
            <label id='zalo'>
              <img
                alt=''
                src='https://cdn-icons-png.flaticon.com/512/5720/5720434.png'
              />
              Ví zalopay
            </label>
            <input type='radio' id='zalo' name='pay-method' value='zalo' />
          </div>

          <div className='separation' />

          <div className='end-form'>
            <p>Giá trị đơn hàng</p>
            <p>{formatter.format(sum)}</p>
          </div>

          <div className='end-form'>
            <p>Phí vận chuyển</p>
            <p>{formatter.format('30000')}</p>
          </div>

          <div className='end-form'>
            <p>Tổng cộng</p>
            <p>{formatter.format(sum + 30000)}</p>
          </div>

          <div className='separation' />

          {/* <Button variant="danger" onClick={()=><Navigate to='/cart' />}> Giỏ hàng</Button> */}
        </form>
        <div className='checkout-button'>
          <Button variant='success' onClick={() => <Navigate to='/cart' />}> Về giỏ hàng</Button>
          <Button variant='primary' onClick={handlePay}>Thanh toán</Button>
        </div>

      </div>
    </div>
  )
}

export default CheckoutScreen
