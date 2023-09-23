import React from 'react'
import labeldata from '../labeldata.js'

function DemoProduct () {
  return (
    <div className='DemoProduct'>
      <div className='DP-text'>Top robot hút bụi nổi bật</div>
      <div className='DP-container'>
        {
      labeldata.xiaomi.map((product, index) =>
        <div className='DP-item' key={index}>
          <a href={`/detail/${product._id}`}>
            <img src={product.image} alt={product.label} className='DPi-image' />
          </a>
          <div className='sale'>{product.sale}</div>
          <div className='DPi-name'>{product.name}</div>
          <div className='DPi-label'>{product.label}</div>
          <div className='DPi-price'>
            <div className='DPi-price-off'>{product.priceOff}</div>
            <div className='DPi-price-on'>{product.priceOn}</div>
          </div>
        </div>
      )
    }
      </div>
      <div className='DP-buynow btn-shake'>
        <a href='/product' className='none-a'> Mua ngay!</a>
      </div>
    </div>

  )
}

export default DemoProduct
