import React from 'react'

function Footer() {
  return (
    <>
  <div className="footer">
    <div className="footer-heading">HOTLINE: 0938298999 - 0903770999</div>
    <div className="footer-content">
      <div className="FC-item">
        <ul className="FCi-list">
          <div className="FCi-name">Giới thiệu</div>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Về chúng tôi
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Show room
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Tin tức
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Liên hệ
          </li>
        </ul>
      </div>
      <div className="FC-item">
        <ul className="FCi-list">
          <div className="FCi-name">Chính sách</div>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chính sách bảo hành
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chính sách vận chuyển
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chính sách thanh toán
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chính sách đổi trả
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chính sách bảo mật
          </li>
        </ul>
      </div>
      <div className="FC-item">
        <ul className="FCi-list">
          <div className="FCi-name">Tin tức</div>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Tin tức công nghệ
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chia sẻ tư vấn
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Đánh giá sản phẩm
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Hướng dẫn, giải đáp
          </li>
          <li className="FCi-topic">
            <ion-icon name="chevron-forward-outline" />
            Chính sách bảo mật
          </li>
        </ul>
      </div>
      <div className="FC-item">
        <ul className="FCi-list">
          <div className="FCi-name">Kết nối với chúng tôi</div>
          <li className="FCi-topic">
            <ion-icon name="logo-facebook" style={{ color: "#307FE2" }} />
            BK Robotic
          </li>
          <li className="FCi-topic">
            <img src="./img/zalo-icon.png" style={{ width: "5%" }} alt="" />
            0987654321
          </li>
          <li className="FCi-topic">
            <img src="./img/gmail_icon.png" style={{ width: "5%" }} alt="" />
            BK_Robotic@tmdt.com
          </li>
          <img src="./img/footer_note.png" style={{ width: "100%" }} alt="" />
        </ul>
      </div>
    </div>
    </div>
  <div className="footer-end">
    Copyright © 2022 - BK Robotic . All Rights Reserved.
  </div>
</>

  )
}

export default Footer