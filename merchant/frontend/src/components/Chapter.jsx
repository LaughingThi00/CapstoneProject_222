import React from 'react'

function Chapter () {
  return (
    <>
      <div className='chapter'>
        <div className='chapter-line' />
        <div className='chapter-name'>Tin tức mới</div>
      </div>
      <div className='main-container'>
        <div className='main-col-2 main-tag-1'>
          <a className='main-tag' href='#tech'>
            Tin tức công nghệ
          </a>
        </div>
        <div className='main-col-2'>
          <div className='main-row-2'>
            <div className='main-col-2 main-tag-2'>
              <a className='main-tag' href='#customer'>
                Chia sẻ tư vấn
              </a>
            </div>
            <div className='main-col-2 main-tag-3'>
              <a className='main-tag' href='#rate'>
                Đánh giá
              </a>
            </div>
          </div>
          <div className='main-row-2 main-tag-4'>
            <a className='main-tag' href='#guide'>
              Hướng dẫn, giải đáp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chapter
