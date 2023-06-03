import React, { useContext, useEffect, useState } from "react";
import {
  FindInfoCrypto,
  formatter,
  transformCryptoUserData,
} from "./CheckoutScreen";
import { getPriceByToken } from "./CryptoPaymentScreen";
import Accordion from "react-bootstrap/Accordion";
import { Button, Form, Modal, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/cryptowallet.css";
import axios from "axios";
import { endpointUrl } from "../constants/Constant";
import { AuthContext } from "../contexts/AuthContext";

export const UpdateCryptoInfo = async (id) => {


  try {
    const response = await axios.post(`${endpointUrl}/find-user-wallet`, {
      merchant: "111111",
      id,
    });
    if (response.data.success) {
      console.log("call FindInfoCrypto ", response.data.user);
      localStorage.setItem(
        "wallet",
        JSON.stringify(transformCryptoUserData(response.data.user))
      );
    } else {
      localStorage.setItem("wallet", null);
    }
  } catch (error) {
    localStorage.setItem("wallet", null);
  }
};

const BuyCryptoModal = () => {
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const Price = JSON.parse(localStorage.getItem("price")) ?? null;

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [One, setOne] = useState({ token: "", amount_VND: 0, slippage: 1 });
  const [amount_token, setAmount_Token] = useState(0);
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
  });

  const handleChange = (e) => {
    if (!e.target.name || !e.target.value) return;
    if (One && Price) {
      if (Price.find((x) => x.name === One.token)) {
        if (e.target.name === "amount_VND")
          setAmount_Token(
            Number(
              (
                e.target.value / Price.find((x) => x.name === One.token).price
              ).toFixed(5)
            )
          );
        else
          setAmount_Token(
            Number(
              (
                One.amount_VND / Price.find((x) => x.name === One.token).price
              ).toFixed(5)
            )
          );
      } else setAmount_Token(-1);
      setOne({ ...One, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!CryptoUser.id || !One.amount_VND || !One.token) {

      return;
    }
try {
  const response = await axios.post(`${endpointUrl}/buy-crypto`, {
    id: CryptoUser.id,
    merchant: "111111",
    amount_VND: One.amount_VND,
    for_token: One.token,
    network: "",
    bill: `MOMO${Math.floor(Math.random() * 1000000)}`,
    platform: "MOMO",
    slippage: 1,
  });

  if (response.data.success) {
    await UpdateCryptoInfo(CryptoUser.id);
    setToast({
      show: true,
      bg: "success",
      header: "Thanh toán thành công",
      content: "Giao dịch đã thành công, bạn đã được cộng token.",
    });
  } else {

    setToast({
      show: true,
      bg: "danger",
      header: "Thanh toán thất bại",
      content:
        "Giao dịch đã thất bại, bạn đã mất VND mà không được cộng token. Chúng tôi sẽ cố gắng gửi token đến cho bạn sớm nhất có thể, nếu như không thành công, bạn sẽ được hoàn trả VND.",
    });
  }
} catch (error) {
  setToast({
    show: true,
    bg: "danger",
    header: "Thanh toán thất bại",
    content:
      "Giao dịch đã thất bại, bạn đã mất VND mà không được cộng token. Chúng tôi sẽ cố gắng gửi token đến cho bạn sớm nhất có thể, nếu như không thành công, bạn sẽ được hoàn trả VND.",
  });
}
    
  };
  const formatter = new Intl.NumberFormat();

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)}>
        {" "}
        Nạp token{" "}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin mua tiền điện tử</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Đây là giao dịch hợp pháp. Khi các bạn bấm nút "Thanh toán", hệ
            thống sẽ tự chuyển tiền VND từ tài khoản các bạn đến các tài khoản
            của hệ thống chúng tôi tại các ngân hàng (Agribank, Sacombank, MB,
            ... ) hoặc app thanh toán trung gian (Momo, Paypal,...). Khi nhận
            được, chúng tôi sẽ kiểm tra hóa đơn, ghi nhận tính hợp lệ trước khi
            chuyển vào ví điện tử của bạn lượng token tương ứng.
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Số tiền muốn nạp (VND)</Form.Label>
              <Form.Control
                name="amount_VND"
                type="number"
                onChange={handleChange}
                onClick={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <div className="bold-text-no-margin">Token</div>
              </Form.Label>
              <Form.Select
                name="token"
                onClick={handleChange}
                onChange={handleChange}
                aria-label="Hãy chọn loại token bạn muốn giao dịch"
              >
                <option value="BTC"> BTC (Bitcoin)</option>
                <option value="USDT"> USDT (Đồng USDT)</option>
                <option value="ETH"> ETH (Ethereum)</option>
                <option value="BNB"> BNB (Đồng BNB)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {" "}
                <div className="bold-text-no-margin">Network</div>
              </Form.Label>

              <Form.Select
                disabled
                aria-label="Hãy chọn loại token bạn muốn giao dịch"
              >
                <option>Mặc định từ người bán</option>
              </Form.Select>
            </Form.Group>

            <div>
              <div className="bold-text">Token cơ bản: </div> {amount_token}{" "}
              {One ? One.token : "???"}
            </div>

            <div>
              <div className="bold-text">Phí gas (1%): </div>{" "}
              {(amount_token / 100).toFixed(5)} {One ? One.token : "???"}
            </div>

            <div>
              <div className="bold-text">Phí hoa hồng (0.5%): </div>{" "}
              {((amount_token * 0.5) / 100).toFixed(5)}{" "}
              {One ? One.token : "???"}
            </div>

            <div>
              <div className="bold-text"> Tổng token nhận được: </div>{" "}
              {One ? ((amount_token * 98.5) / 100).toFixed(5) : 0}{" "}
              {One ? One.token : "?"}
            </div>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    {" "}
                    Tôi đồng ý với các{" "}
                    <a className="normal-a">điều khoản qui định</a> và chấp nhận
                    mọi rủi ro.
                  </>
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Slippage-Tỉ lệ trượt giá chấp nhận được (%)
              </Form.Label>
              <Form.Control
                name="slippage"
                type="number"
                onChange={handleChange}
                defaultValue={1}
                disabled
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Thanh toán
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
        </Modal.Footer>


        <ToastContainer className="p-3" position="top-end">
          <Toast
            onClose={() => setToast({ ...toast, show: false })}
            show={toast.show}
            delay={3000}
            autohide
            bg={toast.bg}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toast.header}</strong>
              <small>0 seconds ago</small>
            </Toast.Header>
            <Toast.Body>{toast.content}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
    </>
  );
};

const CryptoWalletScreen = () => {
  const { user } = useContext(AuthContext);

  const price_token = JSON.parse(localStorage.getItem("price")) ?? null;
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
  });

  const handleCreateWallet=async ()=>{
try {
  const response = await axios.post(`${endpointUrl}/create-wallet`, {
    id: user.id,
    merchant: "111111"
  });

  if (response.data.success) {
    await UpdateCryptoInfo(user.id);
    setToast({
      show: true,
      bg: "success",
      header: "Tạo ví thành công!",
      content: "Chúc mừng bạn đã tạo ví thành công, từ giờ bạn có thể giao dịch bằng token. Nếu chưa có token trong ví, xin hãy nạp thêm!",
    });
  } else {

    setToast({
      show: true,
      bg: "danger",
      header: "Tạo ví thất bại",
      content:"Chúng tôi gặp lỗi trong lúc cố gắng tạo ví điện tử cho bạn, xin vui lòng thử lại"    });
  }
} catch (error) {
  setToast({
    show: true,
    bg: "danger",
    header: "Tạo ví thất bại",
    content:"Server gặp lỗi trong lúc cố gắng tạo ví điện tử cho bạn, xin vui lòng thử lại"    });
}
  }

  const formatter = new Intl.NumberFormat();

  return (
    <div>
      Đây là ví điện tử của bạn. Tại đây bạn có thể thực hiện giao dịch mua
      token (bằng VND hoặc đổi giữa các đồng token với nhau). Với giao dịch mua
      token bằng VND, các bạn chuyển VND đến các tài khoản của hệ thống chúng
      tôi tại các ngân hàng (Agribank, Sacombank, MB, ... ) hoặc app thanh toán
      trung gian (Momo, Paypal,...), khi nhận được, chúng tôi sẽ ghi nhận hóa
      đơn và chuyển vào ví điện tử của bạn lượng token tương ứng <br></br>
      <br></br>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Ví của bạn</Accordion.Header>
          <Accordion.Body>
            {!CryptoUser ? (
              <Button onClick={handleCreateWallet}>Bạn chưa có ví điện tử, tạo ngay!</Button>
            ) : (
              <>
                <div>
                  {" "}
                  <div className="bold-text"> Bitcoin: </div> {CryptoUser.BTC}{" "}
                  (BTC)
                </div>
                <div>
                  {" "}
                  <div className="bold-text"> Ethereum: </div> {CryptoUser.ETH}{" "}
                  (ETH)
                </div>
                <div>
                  {" "}
                  <div className="bold-text"> BNB: </div> {CryptoUser.BNB} (BNB)
                </div>
                <div>
                  {" "}
                  <div className="bold-text"> Tether: </div> {CryptoUser.USDT}{" "}
                  (USDT)
                </div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Tra cứu tỉ giá Token/VND </Accordion.Header>
          <Accordion.Body>
            Chúng tôi cập nhật tỉ giá các đồng token theo realtime <br></br>
            <br></br>
            {price_token &&
              price_token.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="bold-text">{item.name}: </div> {formatter.format(item.price)}{" "}
                    (VND/{item.name})
                  </div>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <BuyCryptoModal />

      <ToastContainer className="p-3" position="top-end">
          <Toast
            onClose={() => setToast({ ...toast, show: false })}
            show={toast.show}
            delay={3000}
            autohide
            bg={toast.bg}
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{toast.header}</strong>
              <small>0 seconds ago</small>
            </Toast.Header>
            <Toast.Body>{toast.content}</Toast.Body>
          </Toast>
        </ToastContainer>
    </div>
  );
};

export default CryptoWalletScreen;
