import React, { useState } from "react";
import "../css/policy.css";
import Accordion from "react-bootstrap/Accordion";
export default function PolicyContent() {
  const [Policy, setPolicy] = useState('BH');

  const Insurance = () => {
    return (
      <div className="ThePolicy">
        <div className="policy-header">Chính sách bảo hành</div>
        <div className="policy-content">
          <div className="heading1">Điều kiện bảo hành</div>
          <div className="text-strong">
            (BK Robotic chỉ hỗ trợ bảo hành sản phẩm hư hỏng trong điều kiện sử
            dụng bình thường theo tiêu chuẩn của nhà sản xuất){" "}
          </div>

          <div className="text-strong">Tháng 1</div>
          <ul>
            <li>
              1 đổi 1 tại nhà, nếu hết hàng đổi máy khác BK Robotic trả lại tiền
              chênh lệch nếu có.
            </li>
            <li>Hoặc trả máy thì nhận lại tiền 80% giá trị máy.</li>
            <li>Khách hàng phải giữ nguyên vỏ hộp và phụ kiện đi kèm.</li>
          </ul>

          <div className="text-strong">Tháng 2 – 12</div>
          <ul>
            <li>
              BK Robotic hỗ trợ bảo hành theo tiêu chuẩn hãng hoặc chuyển hãng
              bảo hành khi cần.
            </li>
          </ul>

          <div className="text-strong">Tháng 2 – 12</div>
          <ul>
            <li>
              Không đổi trả, BK Robotic hỗ trợ bảo hành theo tiêu chuẩn hãng
              hoặc chuyển hãng bảo hành khi cần.
            </li>
            <li>Sản phẩm không lỗi Không đổi trả.</li>
            <li>
              Sản phẩm lỗi do người dùng Không bảo hành đổi trả. BK Robotic hỗ
              trợ chuyển hãng bảo hành, khách hàng chịu phí sửa chữa.
            </li>
          </ul>

          <div className="heading1">Những trường hợp không được bảo hành</div>
          <ul>
            <li> Khách hàng tự động tháo máy.</li>
            <li> Sử dụng sai tiêu chuẩn của nhà sản xuất.</li>
            <li>
              {" "}
              Sử dụng sai điện áp quy định, quá công suất của thiết bị hoặc cháy
              nổ, rơi vỡ, va đập, hỏng hóc vật lý.
            </li>
            <li>
              {" "}
              Các lỗi do người dùng để cạn pin và không sạc trong thời gian dài
              dẫn đến máy không thể sạc được. Hoàng Kiên sẽ hỗ trợ chi phí thay
              pin giá hợp lý nhất cho các bạn.
            </li>
            <li>
              Hư hỏng do thiên tai, hỏa hoạn, động vật, côn trùng hoặc con người
              làm hỏng.
            </li>
            <li>
              Hư hỏng do khách hàng thay đổi ROM hoặc can thiệp đến hệ điều hành
              máy;
            </li>
            <li>Quá thời hạn bảo hành ghi trên phiếu bảo hành.</li>
            <li>
              Không có phiếu bảo hành, phiếu bảo hành không đúng hoặc phiếu bảo
              hành bị tẩy xóa, không nguyên vẹn.
            </li>
          </ul>

          <p></p>
        </div>
      </div>
    );
  };

  const Shipping = () => {
    return (
      <div className="ThePolicy">
        <div className="policy-header">Chính sách vận chuyển</div>
        <div className="policy-content">
          <div className="text-strong">
            BK Robotic có dịch vụ vận chuyển uy tín, đảm bảo các mặt hàng đến
            tay quý khách được an toàn.
          </div>
          <div className="heading1">
            Cách 1: Giao hàng trực tiếp tại cửa hàng
          </div>
          <p>
            Hãy trực tiếp đến địa chỉ các showroom của BK Robotic để lựa chọn
            sản phẩm, thanh toán và nhận sản phẩm trực tiếp tại cửa hàng.
          </p>

          <div className="heading1">
            Cách 2: Giao hàng miễn phí nội thành TP Hồ Chí Minh
          </div>
          <p>
            Nếu bạn không muốn trực tiếp đến cửa hàng. BK Robotic sẵn sàng giao
            hàng miễn phí trong các quận nội thành Thành phố Hồ Chí Minh . Xin
            vui lòng gọi số hotline để đặt hàng và nhận sản phẩm tại địa chỉ bạn
            mong muốn.
          </p>

          <div className="heading1">
            Cách 3: Sử dụng hình thức Giao hàng thu tiền – COD (Cash on
            Delivery)
          </div>
          <p>
            Đối với các bạn ở xa Tp Hồ Chí Minh, muốn sử dụng hình thức COD
            (thanh toán khi nhận hàng), các bạn vui lòng liên hệ với BK Robotic
            để được hướng dẫn. Đây là hình thức thanh toán COD (Cash on
            Delivery) – Các bạn sẽ thanh toán trực tiếp cho bên chuyển phát sau
            khi đã nhận được hàng. Với hình thức này, để đảm bảo đơn hàng được
            xác nhận, BK Robotic có 2 hình thức mua hàng và thanh toán như sau:
          </p>
          <ul>
            <li>
              Một là, chuyển khoản đặt cọc trước từ 200.000 – 500.000 VNĐ. Khi
              nhận được hàng khách hàng sẽ thanh toán nốt số tiền còn lại và
              tiền cước vận chuyển.
            </li>
            <li>
              Hai là, Chuyển khoản toàn bộ 100% tiền hàng. Bạn sẽ được BK
              Robotic hỗ trợ cước phí vận chuyển tùy thuộc vào giá trị đơn hàng.
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const Payment = () => {
    return (
      <div className="ThePolicy">
        <div className="policy-header">Chính sách vận chuyển</div>
        <div className="policy-content">
          <div className="text-strong">
            Khách hàng có thể tham khảo các phương thức thanh toán sau đây và
            lựa chọn áp dụng phương thức phù hợp:
          </div>
          <div className="heading1">
            Thanh toán trực tiếp (Khách hàng nhận hàng tại showroom):
          </div>
          <p>
            Quý khách có thể sử dụng tiền mặt, chuyển khoản, VNPAY QR hoặc quẹt
            thẻ…
          </p>

          <div className="heading1">
            Thanh toán sau (COD – giao hàng và thu tiền tận nơi):
          </div>
          <p>
            Quý khách hàng ở các tỉnh tp trên lãnh thổ Việt Nam, khi nhận hàng
            và kiểm tra hàng xong quý khách sẽ thanh toán tiền mặt cho nhân viên
            giao hàng.
          </p>

          <div className="heading1">
            Thanh toán online qua thẻ tín dụng, chuyển khoản:
          </div>
          <p>
            Đối với các bạn ở xa Tp Hồ Chí Minh, muốn sử dụng hình thức COD
            (thanh toán khi nhận hàng), các bạn vui lòng liên hệ với BK Robotic
            để được hướng dẫn. Đây là hình thức thanh toán COD (Cash on
            Delivery) – Các bạn sẽ thanh toán trực tiếp cho bên chuyển phát sau
            khi đã nhận được hàng. Với hình thức này, để đảm bảo đơn hàng được
            xác nhận, BK Robotic có 2 hình thức mua hàng và thanh toán như
            sau:BK Robotic chấp nhận hình thức thanh toán chuyển khoản ngân
            hàng, quý khách có thể chuyển khoản vào một trong các ngân hàng dưới
            đây:
          </p>
          <ul>
            <li>
              <div className="text-strong">
                {" "}
                Ngân hàng OCB – Chi nhánh Thủ Đức
              </div>
              <div>Tên tài khoản: Trương Ngọc Trúc Quỳnh</div>
              <div>Số Tài khoản: 0003100013385004</div>
            </li>
            <li>
              <div className="text-strong">
                {" "}
                Ngân hàng BIDV – Chi nhánh Thủ Đức
              </div>
              <div>Tên tài khoản: Nguyễn Trâm Anh</div>
              <div>Số Tài khoản: 11110000088864</div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const Complain = () => {
    return (
      <div className="ThePolicy">
        <div className="policy-header">Chính sách đổi trả, khiếu nại</div>
        <div className="policy-content">
          <div className="text-strong">
            Chúng tôi có quy trình xử lý chuyên nghiệp trong trường hợp quý
            khách có yêu cầu đổi trả sản phẩm hoặc khiếu nại về sản phậm, chất
            lượng dịch vụ. Với tinh thần bảo vệ quyền lợi khách hàng là trên
            hết, quý khách có thể an tâm mua sắm tại BK Robotic.
          </div>
          <div className="heading1">Điều kiện đổi trả </div>
          <ul>
            <li>
              Sản phẩm còn nguyên vẹn, đầy đủ bao bì vỏ hộp, hóa đơn mua hàng,
              máy còn nguyên vẹn không bị trầy xước.
            </li>
            <li>Thời gian: trong vòng 07 ngày kể từ ngày mua.</li>
            <li>Đủ điều kiện bảo hành của nhà sản xuất.</li>
            <div style={{ fontStyle: "oblique" }}>
              <div className="text-strong">Lưu ý:</div> Các sản phẩm không được
              đổi trả: đã hết thời gian đổi trả, không còn đầy đủ, nguyên vẹn,
              bị móp méo, sản phẩm trầy xước.
            </div>
          </ul>
          <div className="heading1">Chính sách khiếu nại </div>
          <ul style={{ listStyleType: "decimal" }}>
            <li style={{ fontWeight: "bold" }}>
              <p style={{ display: "inline-block" }}>Đối tượng khiếu nại:</p>{" "}
              <p style={{ display: "inline-block", fontWeight: "400" }}>
                Là tổ chức, cá nhân có sử dụng các sản phẩm, dịch vụ do BK
                Robotic cung cấp (trường hợp đặc biệt khách hàng có thể ủy quyền
                cho người đại diện hợp pháp).
              </p>
            </li>

            <li style={{ fontWeight: "bold" }}>
              <p style={{ display: "inline-block" }}>Hình thức khiếu nại:</p>{" "}
              <p style={{ display: "inline-block", fontWeight: "400" }}>
                Khách hàng khi có khiếu nại, phản ánh về sản phẩm, dịch vụ do BK
                Robotic cung cấp có thể khiếu nại trực tiếp tại các Showroom/Đại
                lí hoặc gián tiếp bằng cách gọi điện đến cửa hàng, gửi mail, gửi
                văn bản hoặc các hình thức khác…
              </p>
            </li>

            <li style={{ fontWeight: "bold" }}>
              <p style={{ display: "inline-block" }}>Nguyên tắc giải quyết:</p>{" "}
              <p style={{ display: "inline-block", fontWeight: "400" }}>
                BK Robotic có quyền từ chối và không giải quyết các khiếu nại
                không có cơ sở, bằng chứng hoặc không trực thuộc đơn vị giải
                quyết.
              </p>
            </li>
          </ul>
          <div className="heading1">Quy trình xử lý khiếu nại</div>
          <p style={{ display: "inline-block", fontWeight: "bold" }}>
            Bước 1. Tiếp nhận và hồi âm khiếu nại{" "}
          </p>{" "}
          <p style={{ display: "inline-block", fontWeight: "400" }}>
            Mọi CBNV, đơn vị, Showroom thuộc BK Robotic đều có trách nhiệm tiếp
            nhận phản ánh, khiếu nại của khách hàng. – Gửi văn bản hồi âm khiếu
            nại trong vòng 03 ngày kể từ ngày nhận được khiếu nại (đối với khiếu
            nại bằng văn bản, email, điện thoại…) hoặc gửi khách hàng bản copy
            phiếu tiếp nhận khiếu nại có xác nhận của cấp TP Dịch vụ Khách hàng
            đối với khiếu nại trực tiếp tại điểm giao dịch.
          </p>
          <p style={{ display: "inline-block", fontWeight: "bold" }}>
            Bước 2: Xác minh, xử lý
          </p>{" "}
          <p style={{ display: "inline-block", fontWeight: "400" }}>
            Sau khi tiếp nhận được phản ánh, khiếu nại của khách hàng, bộ phận
            tiếp nhận sẽ chủ động kiểm tra, giải quyết trong phạm vi chức năng
            và quyền hạn của mình. – Các khiếu nại không thuộc thẩm quyền giải
            quyết của bộ phận tiếp nhận sẽ được phối hợp chuyển cấp cao hơn để
            giải quyết theo thẩm quyền (Không quá ½ ngày kể từ khi tiếp nhận).
          </p>
          <p style={{ display: "inline-block", fontWeight: "bold" }}>
            Bước 3: Đơn vị, Cá nhân có thẩm quyền xem xét, giải quyết{" "}
          </p>{" "}
          <p style={{ display: "inline-block", fontWeight: "400" }}>
            Đơn vị, cá nhân thuộc thẩm quyền theo quy định của BK Robotic tiến
            hành kiểm tra, xác minh thông tin khiếu nại của khách hàng để đưa ra
            kết luận cuối cùng
          </p>
          <p style={{ display: "inline-block", fontWeight: "bold" }}>
            Bước 4: Trả lời khách hàng{" "}
          </p>{" "}
          <p style={{ display: "inline-block", fontWeight: "400" }}>
            Khi có kết quả kiểm tra, xác minh BK Robotic sẽ trả lời khách hàng
            theo nhiều hình thức: Gọi điện thoại, đến gặp trực tiếp, gửi văn bản
            phúc đáp, gửi mail……tùy theo hình thức khiếu nại ban đầu. – Nếu
            khách hàng không đồng ý với kết quả giải quyết: Trong thời gian 30
            ngày kế tiếp bộ phận chức năng có trách nhiệm kiểm tra lại từ đầu
            thông tin khiếu nại và phúc đáp cho khách hàng.
          </p>
          <p style={{ display: "inline-block", fontWeight: "bold" }}>
            Bước 5: Kết thúc khiếu nại{" "}
          </p>{" "}
          <p style={{ display: "inline-block", fontWeight: "400" }}>
            Lưu hồ sơ và kết thúc khiếu nại.
          </p>
        </div>
      </div>
    );
  };

  const Security = () => {
    return (
      <div className="ThePolicy">
        <div className="policy-header">Chính sách bảo mật</div>
        <div className="policy-content">
          
          <div className="heading1">
           Chúng tôi thu thập những thông tin nào?
          </div>
          <p>
          Chúng tôi thu thập thông tin từ bạn khi bạn đăng ký trên trang web của chúng tôi, đặt hàng, đăng ký nhận bản tin của chúng tôi hoặc điền vào một biểu mẫu.
          </p>
<p>
Khi đặt hàng hoặc đăng ký trên trang web của chúng tôi, bạn có thể được yêu cầu nhập của bạn: tên, địa chỉ email hoặc địa chỉ gửi thư. Bạn có thể truy cập trang web của chúng tôi nặc danh.
</p>
          <div className="heading1">
          Chúng tôi sử dụng thông tin của bạn cho những mục đích gì?
          </div>
          <p>
          Bất kỳ thông tin chúng tôi thu thập từ bạn có thể được sử dụng theo một trong các cách sau đây:
          </p>
<ul>
    <li>Để cá nhân hóa trải nghiệm của bạn (thông tin của bạn sẽ giúp chúng tôi đáp ứng tốt hơn nhu cầu cá nhân của bạn).</li>
    <li>Để cải thiện trang web của chúng tôi (chúng tôi liên tục cố gắng để cải thiện các dịch trang web của chúng tôi dựa trên những thông tin và phản hồi chúng tôi nhận được từ bạn).</li>
    <li>Để cải thiện dịch vụ khách hàng (thông tin của bạn sẽ giúp chúng tôi để có hiệu quả hơn để đáp ứng yêu cầu dịch vụ khách hàng của bạn và nhu cầu hỗ trợ).
</li>
    <li>Để xử lý các giao dịch.</li>

</ul>
<p>Thông tin của bạn, dù công khai hay ẩn danh, sẽ không được bán, trao đổi, chuyển nhượng, hoặc cho bất kỳ công ty nào khác với bất kỳ lý do nào, mà không có sự đồng ý của bạn, khác hơn là cho mục đích rõ ràng của việc cung cấp các sản phẩm mua hoặc dịch vụ yêu cầu.</p>
        
<ul>
    <li>Để quản lý một cuộc thi, khuyến mãi, khảo sát, tính năng trang web khác.</li>
    <li>Để gửi email định kỳ.</li>
    <li>Các địa chỉ email mà bạn cung cấp được xử lý, có thể được sử dụng để gửi cho bạn các thông tin và cập nhật liên quan đến đặt hàng của bạn, ngoài việc tiếp nhận thông tin mới từ công, cập nhật, sản phẩm hoặc dịch vụ có liên quan thường xuyên, vv…

</li>
    <li>Lưu ý: Nếu bất cứ lúc nào bạn muốn hủy đăng ký bạn có thực hiện từ phần hủy đăng ký nhận email trong tương lai, chúng được bố trí ở dưới cùng của mỗi email.</li>

</ul>
        
          <div className="heading1">
          Chúng tôi bảo vệ thông tin của bạn như thế nào?
          </div>
          <p>
          Chúng tôi thực hiện một loạt các biện pháp an ninh để duy trì sự an toàn của thông tin cá nhân của bạn khi bạn đặt hàng hoặc nhập, gửi, hoặc truy cập thông tin cá nhân của bạn.          </p>
          <p>
          Chúng tôi cung cấp việc sử dụng một máy chủ an toàn. Tất cả các thông tin nhạy cảm cung cấp được truyền qua Bảo mật (SSL) công nghệ Socket và sau đó mã hóa thành cơ sở dữ liệu các nhà cung cấp cổng thanh toán của chúng tôi chỉ có thể truy cập bởi những người được ủy quyền có quyền truy cập đặc biệt tới hệ thống như vậy, và được yêu cầu để giữ cho các thông tin bí mật.
          </p>
          
          <div className="heading1">
          Chúng tôi sử dụng cookies?
          </div>
          <p>
          Có (Cookie là những file nhỏ mà một trang web hoặc dịch vụ của nhà cung cấp của nó lưu ở máy tính của bạn trong ổ cứng thông qua trình duyệt Web của bạn (nếu bạn cho phép) cho phép các trang web hoặc các hệ thống cung cấp dịch vụ để nhận ra trình duyệt và máy tính của bạn và ghi nhớ thông tin nhất định).
          </p>
<p>
Chúng tôi sử dụng cookies để giúp chúng ta nhớ và xử lý các mặt hàng trong giỏ hàng của bạn, hiểu và lưu các sở thích của bạn cho lần truy cập sau và theo dõi các quảng cáo.</p> 
      
<div className="heading1">
Do chúng tôi tiết lộ bất cứ thông tin cho bên ngoài?
          </div>
          <p>
          Chúng tôi không bán, thương mại, hoặc chuyển giao cho bên ngoài những thông tin cá nhân của bạn. Điều này không bao gồm các bên thứ ba đáng tin, người hỗ trợ chúng tôi trong việc điều hành trang web của chúng tôi, hoạt động kinh doanh của chúng tôi, hoặc phục vụ bạn, miễn là các bên đồng ý giữ bí mật thông tin này. Chúng tôi cũng có thể tiết lộ thông tin của bạn khi chúng tôi tin rằng việc này là tuân thủ pháp luật, thực thi chính sách trang web của chúng tôi, hay bảo vệ mọi người hoặc một người về quyền tài sản, hoặc sự an toàn. Tuy nhiên, thông tin không nhận dạng cá nhân có thể được cung cấp cho các bên khác để tiếp thị, quảng cáo, hoặc sử dụng khác.
          </p>
      
          <div className="heading1">
          Liên kết của bên thứ ba
          </div>
      <p>
      Chúng tôi có thể cung cấp sản phẩm của bên thứ ba trên trang web của chúng tôi. Những trang web của bên thứ ba có chính sách bảo mật riêng biệt và độc lập. Do đó chúng tôi không có trách nhiệm hoặc trách nhiệm đối với các nội dung và hoạt động của các trang web liên kết. Tuy nhiên, chúng tôi tìm cách để bảo vệ sự toàn vẹn của trang web của chúng tôi và hoan nghênh bất kỳ thông tin phản hồi về các trang web này.
      </p>
      
      <div className="heading1">
      Chính sách chỉ áp dụng website trực tuyến
          </div>
          <p>Chính sách bảo mật trực tuyến này chỉ áp dụng cho các thông tin thu thập được thông qua trang web của chúng tôi và không cho thông tin thu thập được ẩn.
</p>
<div className="heading1">
Sự đồng ý của bạn
          </div>
          <p>
          Bằng cách sử dụng trang web của chúng tôi, bạn đồng ý với chính sách bảo mật của chúng tôi.

          </p>
          <div className="heading1">
          Thay đổi chính sách mật của chúng tôi
          </div>
          <p>
          Nếu chúng tôi quyết định thay đổi chính sách bảo mật của chúng tôi, chúng tôi sẽ đăng những thay đổi trên trang này.

          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="Policy-background">
        <div className="Policy-container">
          <div className="flex-row">
            <div className="flex-col-1-4">
              <div className="policy-sidebar">
                <Accordion defaultActiveKey={["1"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Giới thiệu về chúng tôi</Accordion.Header>
                    <Accordion.Body></Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Các Chính sách</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li
                          className={Policy === "BH" ? "policy-read-item" : ""}
                          onClick={() => setPolicy("BH")}
                        >
                          Chính sách bảo hành
                        </li>

                        <li
                          className={Policy === "VC" ? "policy-read-item" : ""}
                          onClick={() => setPolicy("VC")}
                        >
                          Chính sách vận chuyển
                        </li>

                        <li
                          className={Policy === "TT" ? "policy-read-item" : ""}
                          onClick={() => setPolicy("TT")}
                        >
                          Chính sách thanh toán
                        </li>

                        <li
                          className={Policy === "DT" ? "policy-read-item" : ""}
                          onClick={() => setPolicy("DT")}
                        >
                          Chính sách đổi trả, khiếu nại
                        </li>                   

                        <li
                          className={Policy === "BM" ? "policy-read-item" : ""}
                          onClick={() => setPolicy("BM")}
                        >
                          Chính sách bảo mật
                        </li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            <div className="flex-col-3-4">
              {Policy === "BH" && <Insurance />}
              {Policy === "VC" && <Shipping />}
              {Policy === "TT" && <Payment />}
              {Policy === "DT" && <Complain />}
              {Policy === "BM" && <Security />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
