import React from 'react'

function YourNeed() {
  return (
    <div className="YourNeed">
        <div className="chapter">
            <div className="chapter-line"></div>
            <div className="chapter-name">
                Hãy nói chúng tôi nghe nhu cầu của bạn!
            </div>
        </div>

        <div className="YN-container">
            <div className="YN-item" style={{ backgroundColor: "#fdba74" }}>
                <div className="YNi-name">Đơn giản</div>
                <img className="YNi-image" src="./img/YourNeed/1.png" alt="" />
            </div>
            <div className="YN-item" style={{ backgroundColor: "#fbbf24" }}>
                <div className="YNi-name">Hiện đại</div>
                <img className="YNi-image" src="./img/YourNeed/2.png" alt="" />
            </div>
            <div className="YN-item" style={{ backgroundColor: "#ea580c" }}>
                <div className="YNi-name">Cao cấp</div>
                <img className="YNi-image" src="./img/YourNeed/3.png" alt="" />
            </div>
            <div
                className="YN-item"
                style={{ backgroundColor: "rgba(219, 201, 72, 0.83)" }}
            >
                <div className="YNi-name">Phân phối độc quyền</div>
                <img className="YNi-image" src="./img/YourNeed/4.png" alt="" />
            </div>
            <div className="YN-item" style={{ backgroundColor: "#fde047" }}>
                <div className="YNi-name">Limited Edition</div>
                <img className="YNi-image" src="./img/YourNeed/5.png" alt="" />
            </div>
        </div>
    </div>

  )
}

export default YourNeed