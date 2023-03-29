import '../css/cartscreen.css'
// import axios from "axios";
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CartScreen = () => {
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  )
  const handleRemove = (item) => {
    if (item.num === 1) {
      setCart(cart.filter((x) => x.product.name !== item.product.name))
      localStorage.setItem(
        'cart',
        JSON.stringify(cart.filter((x) => x.product.name !== item.product.name))
      )
    } else {
      setCart(
        cart.map((x) => {
          if (x.product.name === item.product.name) x.num--
          return x
        })
      )
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    window.dispatchEvent(new Event('storage'))
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND'

  })
  const toNum = (str) => {
    return Number(str.split(' ')[0].replace(/\./g, ''))
  }
  let sum = 0

  cart.forEach(x => {
    sum += toNum(x.product.priceOn) * x.num
  })

  return (
    <div className='cart'>
      <div className='table-container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Hình ảnh</th>
              <th scope='col'>Sản phẩm</th>
              <th scope='col'>Đơn Giá</th>
              <th scope='col'>Số lượng</th>
              <th scope='col'>Tùy chỉnh</th>

            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => {
              return (
                <tr key={index} className={index % 2 ? 'RowEven' : 'RowOdd'}>
                  <th scope='row'>{index + 1}</th>
                  <td>
                    <img
                      className='cart-img'
                      src={item.product.image}
                      alt={item.product.label}
                    />
                  </td>
                  <td>
                    {item.product.name}
                  </td>
                  <td>{item.product.priceOn}</td>
                  <td>{item.num}</td>
                  <td>

                    <button
                      className='cart-row-remove'
                      onClick={() => handleRemove(item)}
                    >
                      <img src={require('../img/delete.png')} alt='' />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <h5>Tổng tiền:{formatter.format(sum)}</h5>

      </div>

      <div className='checkout'>
        <a href='/checkout'>
          <Button
            variant='primary' onClick={
// handlePay
             () => <Navigate to='/checkout' />

          }
          >Thanh toán
          </Button>{' '}
        </a>
      </div>
    </div>
  )
}

export default CartScreen
