import React from 'react';
import data from '../data.js';

function SmallMarket() {
  return (
    <div className="SmallMarket">
  <div className="chapter">
    <div className="chapter-line" />
    <div className="chapter-name">Robot hút bụi chúng tôi có</div>
  </div>
  <div className="SM-container">
    <div className="SM-row">
    {
      data.smallMarketTop.map((market,index) =>
        <div className="DP-item" key={index}>
          <a href={`/detail/${market._id}`} >
            <img src={market.image}  alt="" className="DPi-image" />
          </a>
          <div className="sale">{market.sale}</div>
          <div className="DPi-name">{market.name}</div>
          <div className="DPi-label">{market.label}</div>
          <div className="DPi-price">
            <div className="DPi-price-off">{market.priceOff}</div>
            <div className="DPi-price-on">{market.priceOn}</div>
          </div>
        </div>
      )
    }           
    </div>
    <div className="SM-row">
    {
      data.smallMarketBot.map((market,index) =>
        <div className="DP-item"   key={index}>
          <a href={`/detail/${market._id}`}>
            <img src={market.image}  alt="" className="DPi-image" />
          </a>
          <div className="sale">{market.sale}</div>
          <div className="DPi-name">{market.name}</div>
          <div className="DPi-label">{market.label}</div>
          <div className="DPi-price">
            <div className="DPi-price-off">{market.priceOff}</div>
            <div className="DPi-price-on">{market.priceOn}</div>
          </div>
        </div>
      )
    }           
    </div>
  </div>
  <div className="DP-buynow btn-shake">
  <a href='/product' className='none-a'>
                Xem thêm 
                    </a> 
  </div>
</div>

  )
}

export default SmallMarket