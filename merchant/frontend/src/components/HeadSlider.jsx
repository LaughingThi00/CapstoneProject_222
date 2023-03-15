import React from 'react'

function Headslider() {
  return (
    <div className="HeadSlider">
        <div className="HeadSlider-item">
            <img src={require('../img/HeadSlider/user.png')} alt="" className="HS-item-img" />
            <div className="HS-item-text">Dành cho bạn</div>
        </div>

        <div className="HeadSlider-item">
            <img src={require("../img/HeadSlider/1010.png")} alt="" className="HS-item-img" />
            <div className="HS-item-text">Siêu sale 10.10</div>
        </div>

        <div className="HeadSlider-item">
            <img src={require("../img/HeadSlider/newproduct.png")} alt="" className="HS-item-img" />
            <div className="HS-item-text">Sản phẩm mới</div>
        </div>

        <div className="HeadSlider-item">
            <img src={require("../img/HeadSlider/cheapest.png")} alt="" className="HS-item-img" />
            <div className="HS-item-text">Rẻ vô đối</div>
        </div>

        <div className="HeadSlider-item">
            <img src={require("../img/HeadSlider/gop.png")} alt="" className="HS-item-img" />
            <div className="HS-item-text">Trả góp 0%</div>
        </div>

        <div className="HeadSlider-item">
            <img src={require("../img/HeadSlider/dealhot.png")} alt="" className="HS-item-img" />
            <div className="HS-item-text">Deal hot</div>
        </div>
    </div>
  )
}

export default Headslider