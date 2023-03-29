import React from 'react'

function News () {
  return (
    <div className='news'>
      <div className='chapter'>
        <div className='chapter-line' />
        <div className='chapter-name'>Tin tức mới</div>
      </div>

      <div className='news-container'>
        <div className='news-item'>
          <img className='Ni-img' src='./img/news/1.jpg' alt='' />
          <div className='Ni-name'>
            Top 10+ kinh nghiệm mua Robot hút bụi lau nhà thông minh dành cho những
            cư dân ...
          </div>

          <div className='Ni-desc'>
            Chắc hẳn với xu hướng ngày càng bận rộn của giới trẻ và đặc biệt là xu
            hướng kỹ thuật số, tự động hóa mọi thứ thì việc ....
          </div>
        </div>

        <div className='news-item'>
          <img className='Ni-img' src='./img/news/2.jpg' alt='' />
          <div className='Ni-name'>
            So sánh robot hút bụi Xiaomi và Ecovacs – Nên chọn sản phẩm nào phù hợp?
          </div>
          <div className='Ni-desc'>
            Khi nói về robot hút bụi, chắc hẳn mọi người sẽ nghĩ ngay đến 2 hãng uy
            tín nhất trên thị trường hiện nay đó là Xiaomi ...
          </div>
        </div>

        <div className='news-item'>
          <img className='Ni-img' src='./img/news/3.jpg' alt='' />
          <div className='Ni-name'>
            Có thật sự là “Không cần động tay” khi sử dụng Robot hút bụi? Một số lưu
            ý dành cho bạn....
          </div>
          <div className='Ni-desc'>
            Robot hút bụi giờ đây đã không còn quá xa lạ với những người nội trợ,
            tuy nhiên có lẽ nhiều người thật sự chưa lưu ý đến các. ....
          </div>
        </div>

        <div className='news-item'>
          <img className='Ni-img' src='./img/news/4.jpg' alt='' />
          <div className='Ni-name'>
            Kinh phí có hạn thì nên mua máy hút bụi hay robot hút bụi để trở thành
            nhà tiêu dùng ...
          </div>
          <div className='Ni-desc'>
            Với sự hiện đại của cuộc sống ngày nay thì những thiết bị thông minh
            đang được rất nhiều gia đình lựa chọn. Tuy nhiên, .....
          </div>
        </div>
      </div>

      <div className='DP-buynow btn-shake'>
        <a href='/news' className='none-a'>
          Xem thêm
        </a>
      </div>
    </div>

  )
}

export default News
