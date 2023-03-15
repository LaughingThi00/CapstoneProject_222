import React from 'react'
import { homeUrl } from '../constants/Constant'

function Recommend() {
  return (
    <div className="recommend">
        <div className="recommend-left">
            <div className="rl-container">
                <div className="rl-name">Ecovacs Deebot Ozmo 920</div>
                <div className="rl-desc">
                    Với thiết kế hoàn toàn mới, tối ưu kích thước giúp OZMO920 dễ dàng tiếp
                    cận và làm sạch tất cả các vị trí trong căn hộ của bạn. Công nghệ tăng
                    áp động cơ hút và chổi đa năng thế hệ 2.0 kết hợp pin dung lượng cao
                    mang đến hiệu suất làm sạch mạnh mẽ nhất.
                </div>
                <div className="rl-price">
                    <div className="rl-price-off">19.900.000 đ</div>
                    <div className="rl-price-on">9.900.000 đ</div>
                </div>
                <div className="rl-button">
                    <div className="rl-button-buynow btn-shake">
                        <ion-icon className="rl-button-buynow-btn" name="cart-outline" />
                        <div className="rl-button-buynow-text" onClick={()=>window.location.replace(`${homeUrl}/detail/11`)}>Mua ngay</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="recommend-right">
            <div className="recommend-right-top">
                <img className="recommend-img" src="./img/recommend/2.png" alt="" />
            </div>
            <div className="recommend-right-bot">
                <img className="recommend-img" src="./img/recommend/3.png" alt="" />
            </div>
        </div>
    </div>

  )
}

export default Recommend