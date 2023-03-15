import React from 'react';
import axios from 'axios';
import forward from '../icon-font/chevron-forward-outline.svg';
import call from '../icon-font/call-outline.svg';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { apiMessage } from '../constants/Constant';

function Help() {
    
const handleSend= async(e)=>{
  e.preventDefault()
  toast("Bạn đã gửi yêu cầu thành công. Nhân viên của chúng tôi sẽ sớm liên hệ!")

  await axios.post(`${apiMessage}`, {
    phoneTo: "+84389895377",
    bodyMessage:
      `Trung tâm chăm sóc khách hàng đã nhận được yêu câu của quý khách. Chúng tôi sẽ liên hệ trong giây lát!`,
  });
}

  return (
    <>
            <ToastContainer />
            <div className="help">
  <div className="chapter">
    <div className="chapter-line" />
    <div className="chapter-name">Tư vấn siêu tốc trong 5-10s</div>
  </div>
  <div className="help-container">
    <form className="help-form">
      <div className="center">
        <div className="text">Yêu cầu tư vấn</div>
      </div>
      <div className="inputField">
        <div className="inputField-item">
          <div className="field">
            Họ và tên
            <div className="strict">*</div>
          </div>
          <input
            type="text"
            placeholder="Nguyễn Văn A"
            className="field-area"
          />
        </div>
        <div className="inputField-row">
          <div className="inputField-item col-2">
            <div className="field">
              Email
              <div className="strict">*</div>
            </div>
            <input
              type="text"
              placeholder="abc@hcmut.edu.vn"
              className="field-area"
            />
          </div>
          <div className="inputField-item col-2">
            <div className="field">
              Số điện thoại
              <div className="strict">*</div>
            </div>
            <input
              type="text"
              placeholder='090999999999'
              className="field-area"
            />
          </div>
        </div>
        <div className="inputField-item">
          <div className="field">
            Tiêu đề
            <div className="strict" />
          </div>
          <input
            type="text"
            placeholder="Bạn quan tâm sản phẩm nào?"
            className="field-area"
          />
        </div>
        <div className="inputField-item">
          <div className="field">
            Nội dung cần tư vấn
            <div className="strict">*</div>
          </div>
          <textarea
            type="text"
            placeholder="Hãy để lại câu hỏi và chúng tôi sẽ giải quyết sớm nhất"
            className="field-area"
            as='input'
            style={{ height: 250 }}
          />
        </div>
      </div>
      <button onClick={handleSend} className="submit-btn">
        Gửi
      </button>
    </form>
    <div className="help-option">
      <div className="help-option-item">
        <div className="topic">Bạn muốn gặp chuyên gia?</div>
        <div className="desc">
          Bạn băn khoăn khi lựa chọn, robot hút bụi lau nhà của bạn gặp vấn đề.
          Trò chuyện trực tiếp với các chuyên gia có kinh nghiệm sẽ giúp bạn có
          câu trả lời và tư vấn chuyên sâu nhất.
        </div>
        <div className="foot">
          <div className="contact">
            <div className="text-call" onClick={()=>window.location.replace("https://zalo.me/84921430237")}>Chat ngay bây giờ </div>
            <img src={forward}
              name="chevron-forward-outline"
              className="help-chat-icon"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="help-option-item">
        <div className="topic">Phản ánh dịch vụ</div>
        <div className="desc">
          Để nâng cao chất lượng dịch vụ và phục vụ bạn tốt hơn. Chúng tôi mong
          muốn nhận được phản ánh của bạn về dịch vụ của chúng tôi. Liên hệ ngay
          với quản lý cấp cao nhất của BK Robotic.
        </div>
        <div className="foot">
          <div className="contact">
            <img 
                src={call}
                name="call-outline" 
                className="call-help-icon" 
                alt=""
            />
            <div className="text-call">0938299999</div>
          </div>
        </div>
      </div>
      <div className="help-option-item">
        <div className="topic">Bạn đã từng mua hàng của chúng tôi?</div>
        <div className="desc center">
          {" "}
          <img src="../img/qr.png" alt="" />
        </div>
        <div className="foot">
          Tra cứu điểm thưởng và nhận các ưu đãi định kỳ từ chúng tôi.{" "}
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  

  )
}

export default Help