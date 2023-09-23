import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import labeldata from '../labeldata'
import '../css/detail.css'
import Compare from '../components/Compare'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function DetailProduct () {
  const [style, setStyle] = useState(false)

  const [compare, setCompare] = useState(false)
  const closeCompare = () => {
    setCompare(false)
    setStyle(false)
  }

  const [show, setShow] = useState(true)

  const changeStyle = () => {
    setStyle(current => !current)
    setCompare(current => !current)
  }

  const { id } = useParams()
  let product = {}
  if (id <= 5) product = labeldata.xiaomi[id - 1]
  else if (id <= 11)product = labeldata.ecovacs[id - 6]
  else product = labeldata.liectroux[id - 12]

  const handleBuy = () => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    if (!cart.find(item => item.product.name === product.name)) cart = [...cart, { product, num: 1 }]
    else cart.find(item => item.product.name === product.name).num++
    localStorage.setItem('cart', JSON.stringify(cart))
    toast('Bạn đã thêm vào giỏ hàng thành công!')
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <>

      <ToastContainer />

      <div className={style === false ? 'product detail-container' : 'product2 detail-container'}>
        <div className='center'>
          <img src={product.image} alt='' />
          {/* <img src={require("../detail_img/2.png")} style={{ width: "100%" }} alt="" /> */}
        </div>
        <div className='under'>
          <div className='price'>
            <ion-icon className='price-tag-icon' name='pricetags-outline' />
            <div className='price-text'>Giá bán</div>
            <div className='price-self'>{product.priceOn}</div>
          </div>
          {/* <div className="more">
          <ion-icon name="heart-circle-outline" className="heart-btn" />
          <ion-icon name="share-social-outline" className="share-btn" />
        </div> */}
        </div>
        <form action='' className='style-form'>
          Màu sắc
          <input type='radio' name='form-detail' defaultValue='den' />
          <label>Đen</label>
          <input type='radio' name='form-detail' defaultValue='xam' />
          <label>Xám</label>
        </form>
        <div className='name-product'>{product.name}</div>
        <div className='btn-group'>
          <button className='btn-shopping' onClick={handleBuy}><ion-icon name='cart-outline' class='shopping-cart' />Mua ngay</button>
          {style === true ? '' : <button onClick={changeStyle} className='btn-compare'><ion-icon name='search-outline' class='compare-outline' />So sánh</button>}
          {style === false ? '' : <button className='btn-close-outline'><ion-icon onClick={closeCompare} name='close' class='close-outline-pop' /></button>}
        </div>

        <div className='product-describe'>
          Thông tin mô tả
          <ul>
            <p>{product.title}</p>
            {
              product.describe.map((line, index) =>
                <li key={index}>{line}</li>
              )
            }
          </ul>
        </div>
        <div className='more-detail'>
          <div className='detail'>Thông tin chi tiết</div>
          <div className='hide' onClick={() => setShow(!show)}>
            {show === true ? 'Ẩn bớt' : 'Xem thêm'}
            {show === true ? <ion-icon name='chevron-up-outline' /> : <ion-icon name='chevron-down-outline' />}
          </div>
        </div>
        {show && <div className='detail-product'>
          <div className='detail-product-item'>
            <div className='field'>Hạn bảo hành:</div>
            <div className='desc'>12 tháng</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Kích thước:</div>
            <div className='desc'>340 x 85 x 340 mm</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Xuất xứ:</div>
            <div className='desc'>Trung Quốc</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Dung tích chứa bụi:</div>
            <div className='desc'>200 ml</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Khối lượng:</div>
            <div className='desc'>3 kg</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Dung lượng pin:</div>
            <div className='desc'>3400mAh</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Lực hút:</div>
            <div className='desc'>5W (~4200pa)</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Màu sắc:</div>
            <div className='desc'>Đen, Xám</div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Tính năng:</div>
            <div className='desc'>
              Điều khiển qua ứng dụng , Tự động quay về đế sạc , Tự động điều chỉnh
              sức hút
            </div>
          </div>
          <div className='detail-product-item'>
            <div className='field'>Tiện ích:</div>
            <div className='desc'>
              Hộp chứa bụi EZ - dễ dàng vệ sinh với nướcLên lịch làm việc và theo dõi
              thông qua app kết nối với điện thoại thông minh
            </div>
          </div>
        </div>}
      </div>

      <Compare open={compare} onClose={closeCompare} handle={() => { setCompare(false); setStyle(true) }} />
    </>
  )
}

export default DetailProduct
