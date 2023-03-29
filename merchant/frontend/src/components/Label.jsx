import labedata from '../labeldata'

function Label () {
  return (
    <div>
      <div className='ProductByLabel Xiaomi-Label'>
        <div className='label'>
          <img
            src='../img/product_parner/xiaomi.png'
            alt='Xiaomi'
            className='label-name'
          />
          <div className='desc'>
            Sau thành công với những chiếc smartphone giá rẻ, Xiaomi đã lấn sân
            sang lĩnh vực nhà thông minh và cho ra mắt những thiết bị robot hút
            bụi gọn nhẹ & thân thiện với người dùng. Những sản phẩm robot lau
            nhà hút bụi tiêu biểu của Xiaomi có thể kể đến: Xiaomi Vacuum Mop
            Pro, Xiaomi Mi Vacuum, Xiaomi Vacuum Mop, Xiaomi Vacuum Mop
            Essential,... Robot hút bụi Xiaomi là cái tên được nhắc đến nhiều
            nhất khi nói về một chiếc máy robot hút bụi giá rẻ chất lượng cao,
            bởi tính năng thông minh vượt trội và mức giá vô cùng dễ chịu.
            Thương hiệu nội địa Trung Quốc này cũng nhanh chóng chiếm lĩnh thậm
            chí "làm mưa làm gió" thị trường toàn thế giới. Không chỉ trong lĩnh
            vực chủ lực là điện thoại thông minh, robot hút bụi cũng là một dòng
            sản phẩm mũi nhọn trong hệ sinh thái thông minh của Xiaomi. Xiaomi
            tập trung nghiên cứu phát triển, và đầu tư rất nhiều công nghệ mới
            cho dòng sản phẩm Xiaomi Roborock của mình. Sở hữu những tính năng
            thông minh chỉ có ở những dòng máy đắt tiền, nhưng lại có mức giá
            bình dân là bí quyết giúp Xiaomi lất lướt mọi ông lớn đi trước như
            iRobot, Ecovacs. Chúng tôi là một trong những đơn vị tiên phong, và
            đại diện phân phối chính thức robot hút bụi Xiaomi với mức giá tốt,
            tư vấn chuyên nghiệp, chế độ hậu mãi chu đáo với những trải nghiệm
            mua sắm tốt nhất.
          </div>

          <div className='DP-buynow seemore-btn btn-shake'>
            <a href='/product' className='none-a'>
              Xem thêm sản phẩm của Xiaomi
            </a>

          </div>
        </div>

        <div className='product-list'>
          {
                    labedata.xiaomi.map((product, index) =>
                      <div className='DP-item' key={index}>
                        <a href={`/detail/${product._id}`}>
                          <img src={product.image} alt='' className='DPi-image' />
                        </a>
                        <div className='sale'>-20%</div>
                        <div className='DPi-name'>{product.name}</div>
                        <div className='DPi-label'>{product.label}</div>
                        <div className='DPi-price'>
                          <div className='DPi-price-off'>{product.priceOff}</div>
                          <div className='DPi-price-on'>{product.priceOn}</div>
                        </div>
                      </div>)
                }
        </div>
      </div>

      <div className='ProductByLabel Ecovac-Label'>
        <div className='product-list'>
          {
                    labedata.ecovacs.map((product, index) =>
                      <div className='DP-item' key={index}>
                        <a href={`/detail/${product._id}`}>
                          <img src={product.image} alt='' className='DPi-image' />
                        </a>
                        <div className='sale'>-20%</div>
                        <div className='DPi-name'>{product.name}</div>
                        <div className='DPi-label'>{product.label}</div>
                        <div className='DPi-price'>
                          <div className='DPi-price-off'>{product.priceOff}</div>
                          <div className='DPi-price-on'>{product.priceOn}</div>
                        </div>
                      </div>)
                }
        </div>
        <div className='label'>
          <img
            src='./img/product_parner/ecovac.png'
            alt=''
            className='label-name'
          />
          <div className='desc'>
            Ecovacs Deebot là dòng sản phẩm chủ lực đến từ thương hiệu top đầu
            về robot hút bụi hiện nay. Ecovacs Deebot hướng tới phát triển những
            sản phẩm robot hút bụi lau nhà "tầm cao" đạt đến mức độ 2 trong 1
            hoàn chỉnh và mẫu mực. Sản phẩm máy hút bụi Ecovacs và máy lau nhà
            Deebot luôn nằm trong top những robot hút bụi lau nhà tốt nhất.
            Ecovacs tập trung vào phát triển dòng DEEBOT công nghệ OZMO, giúp
            robot vừa hút vừa lau đồng thời. Với lợi thế "đi trước và dẫn đầu"
            các dòng robot hút bụi Ecovacs hướng tới mọi phân khúc chất lượng.
            Bằng các dòng sản phẩm có giá từ thấp đến cao nhất, đáp ứng mọi nhu
            cầu: Phân khúc giá bình dân dưới 300$: Gồm các dòng Deebot OZMO 900
            seri. Phân khúc giá cao cấp 300$ - 500$: Gồm các dòng Deebot OZMO
            920, 930 seri. Phân khúc giá cao nhất 500$ - 1000$: Gồm các dòng
            Deebot OZMO 950, 960 seri. Trên con đường chinh phục sứ mệnh giải
            phóng sức lao động để nâng tầm cuộc sống hiện đại. Ecovacs tập trung
            vào phát triển sản phẩm làm sạch 2 trong một và đem đến những công
            nghệ của tương lại trên các sản phẩm của mình. Chính vì vậy mà dòng
            sản phẩm Deebot OZMO còn được gọi là máy robot lau nhà Ecovacs, bởi
            khả năng hoạt động độc lập như một chiếc máy lau nhà riêng biệt.
          </div>

          <div className='seemore-btn DP-buynow btn-shake'>
            <a href='/product' className='none-a'>
              Xem thêm sản phẩm của Ecovac
            </a>
          </div>
        </div>
      </div>

      <div className='ProductByLabel Liectroux-Label'>
        <div className='label'>
          <img
            src='./img/product_parner/liectroux.jpg'
            alt=''
            className='label-name'
          />
          <div className='desc'>
            Sau thành công với những chiếc smartphone giá rẻ, Xiaomi đã lấn sân
            sang lĩnh vực nhà thông minh và cho ra mắt những thiết bị robot hút
            bụi gọn nhẹ & thân thiện với người dùng. Những sản phẩm robot lau
            nhà hút bụi tiêu biểu của Xiaomi có thể kể đến: Xiaomi Vacuum Mop
            Pro, Xiaomi Mi Vacuum, Xiaomi Vacuum Mop, Xiaomi Vacuum Mop
            Essential,... Robot hút bụi Xiaomi là cái tên được nhắc đến nhiều
            nhất khi nói về một chiếc máy robot hút bụi giá rẻ chất lượng cao,
            bởi tính năng thông minh vượt trội và mức giá vô cùng dễ chịu.
            Thương hiệu nội địa Trung Quốc này cũng nhanh chóng chiếm lĩnh thậm
            chí "làm mưa làm gió" thị trường toàn thế giới. Không chỉ trong lĩnh
            vực chủ lực là điện thoại thông minh, robot hút bụi cũng là một dòng
            sản phẩm mũi nhọn trong hệ sinh thái thông minh của Xiaomi. Xiaomi
            tập trung nghiên cứu phát triển, và đầu tư rất nhiều công nghệ mới
            cho dòng sản phẩm Xiaomi Roborock của mình. Sở hữu những tính năng
            thông minh chỉ có ở những dòng máy đắt tiền, nhưng lại có mức giá
            bình dân là bí quyết giúp Xiaomi lất lướt mọi ông lớn đi trước như
            iRobot, Ecovacs. Chúng tôi là một trong những đơn vị tiên phong, và
            đại diện phân phối chính thức robot hút bụi Xiaomi với mức giá tốt,
            tư vấn chuyên nghiệp, chế độ hậu mãi chu đáo với những trải nghiệm
            mua sắm tốt nhất.
          </div>
          <div className='DP-buynow seemore-btn btn-shake'>
            <a href='/product' className='none-a'>
              Xem thêm sản phẩm của Liectroux
            </a>

          </div>
        </div>

        <div className='product-list'>
          {
                    labedata.liectroux.map((product, index) =>
                      <div className='DP-item' key={index}>
                        <a href={`/detail/${product._id}`}>
                          <img src={product.image} alt='' className='DPi-image' />
                        </a>
                        <div className='sale'>-20%</div>
                        <div className='DPi-name'>{product.name}</div>
                        <div className='DPi-label'>{product.label}</div>
                        <div className='DPi-price'>
                          <div className='DPi-price-off'>{product.priceOff}</div>
                          <div className='DPi-price-on'>{product.priceOn}</div>
                        </div>
                      </div>)
                }
        </div>
      </div>

    </div>
  )
}

export default Label
