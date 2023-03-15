import React from 'react'

function ListShowroom() {
  return (
    <div className="content">
  <div className="map">
    <div className="chapter">
      <div className="chapter-line" />
      <div className="chapter-name">Danh sách showroom</div>
    </div>
    <div className="map-container">
      <div className="map-container-item">
        <img src="./img/map/bd.png" alt="" className="map-image" />
        <div className="map-info">
          <div className="map-info-item">
            <div className="field">Showroom Dĩ An:</div>
            <div className="content">
              1/1 Quốc lộ 1K, Đông Hoà, Dĩ An, Bình Dương
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Thời gian hoạt động:</div>
            <div className="content">Thứ 2 - chủ nhật: 8h30 - 18h</div>
          </div>
          <div className="map-info-item">
            <div className="field">Điện thoại:</div>
            <div className="content" style={{ color: "red" }}>
              0903765796
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Mail:</div>
            <div className="content">Bk_Robotic@tmdt.com</div>
          </div>
        </div>
      </div>
      <div className="map-container-item">
        <img src="./img/map/q9.png" alt="" className="map-image" />
        <div className="map-info">
          <div className="map-info-item">
            <div className="field">Showroom Quận 9:</div>
            <div className="content">
              125 Lê Văn Việt, P. Hiệp Phú, Q. 9, Tp. Hồ Chí Minh
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Thời gian hoạt động:</div>
            <div className="content">Thứ 2 - chủ nhật: 8h30 - 18h</div>
          </div>
          <div className="map-info-item">
            <div className="field">Điện thoại:</div>
            <div className="content" style={{ color: "red" }}>
              0903765732
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Mail:</div>
            <div className="content">Bk_Robotic@tmdt.com</div>
          </div>
        </div>
      </div>
      <div className="map-container-item">
        <img src="./img/map/q10.png" alt="" className="map-image" />
        <div className="map-info">
          <div className="map-info-item">
            <div className="field">Showroom Quận 10:</div>
            <div className="content">
              18 Trần Thiện Chánh, Q. 10, Tp. Hồ Chí Minh
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Thời gian hoạt động:</div>
            <div className="content">
              Thứ 2 - thứ 6: 8h30 - 18h, Thứ 7 - chủ nhật: 9h - 16h
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Điện thoại:</div>
            <div className="content" style={{ color: "red" }}>
              0903765796
            </div>
          </div>
          <div className="map-info-item">
            <div className="field">Mail:</div>
            <div className="content">Bk_Robotic@tmdt.com</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ListShowroom