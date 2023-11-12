import React, { useContext, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { calculateOrder } from "./CheckoutScreen";
import "../css/cryptopayment.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { MerchantId, endpointUrl } from "../constants/Constant";
import axios from "axios";
import { UpdateCryptoInfo } from "./CryptoWalletScreen";

export const getPriceByToken = () => {
  const cash = calculateOrder();
  const PriceFromAPI = JSON.parse(localStorage.getItem("price")) ?? null;
  let Price = { BTC: 0, ETH: 0, BNB: 0, USDT: 0, VND: 0 };

  if (!PriceFromAPI) return Price;

  PriceFromAPI.forEach((item) => {
    switch (item.name) {
      case "BTC":
        Price.BTC = (cash / item.price).toFixed(5);
        break;
      case "ETH":
        Price.ETH = (cash / item.price).toFixed(5);
        break;
      case "BNB":
        Price.BNB = (cash / item.price).toFixed(5);
        break;
      case "USDT":
        Price.USDT = (cash / item.price).toFixed(5);
        break;
      case "VND":
        Price.VND = cash;
        break;
      default:
        break;
    }
  });
  return Price;
};

const CryptoPaymentModal = () => {
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  let price = getPriceByToken();
  const navigate = useNavigate();
  const [ShowToast, setShowToast] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [One, setOne] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
    hash: null,
  });
  const handleChange = (e) => {
    if (!e.target.name || !e.target.value) return;
    if (e.target.name === "token")
      setOne({
        ...One,
        [e.target.name]: e.target.value,
        amount: Number((price[e.target.value] * 1.015).toFixed(5)),
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!One || !One.token || !One.amount || !CryptoUser) return;
    if (One.amount >= CryptoUser[One.token]) {
      setShowToast(true);
    } else {
      try {
        const response = await axios.put(`${endpointUrl}/transfer-outbound/${MerchantId}`, {
          merchant: MerchantId,
          sender: CryptoUser.id,
          receiver: "0xcd3f68850ef63f079becb302870245dcb461dc1b",
          byAmount: One.amount,
          byToken: One.token,
        });
        if (response.data.statusCode === 200) {
          await UpdateCryptoInfo(CryptoUser.id);
          setToast({
            show: true,
            bg: "success",
            header: "Thanh toán thành công",
            content: `Giao dịch đã thành công, bạn đã được cộng token.`,
            hash: response.data.data.hash,
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
    }
  };

  const handleBuyCrypto = () => {
    navigate("/crypto-wallet");
  };

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)}>
        {" "}
        Thanh toán ngay!
      </Button>

      <div className="crypto-payment-modal">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông tin thanh toán bằng tiền điện tử</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* =========================== GENERAL FORM ========================= */}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="bold-text-no-margin">Token</div>
                </Form.Label>
                <Form.Select
                  name="token"
                  onClick={handleChange}
                  aria-label="Hãy chọn loại token bạn muốn giao dịch"
                >
                  <option value="BTC">{price.BTC} BTC (Bitcoin)</option>
                  <option value="USDT">{price.USDT} USDT (Đồng USDT)</option>
                  <option value="ETH">{price.ETH} ETH (Ethereum)</option>
                  <option value="BNB">{price.BNB} BNB (Đồng BNB)</option>
                  <option value="VND">{price.VND} VND (Đồng Việt Nam)</option>
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
                <div className="bold-text">Phí gas: </div>{" "}
                {One ? ((price[One?.token] * 1) / 100).toFixed(5) : 0} (1%)
              </div>

              <div>
                <div className="bold-text">Phí hoa hồng: </div>{" "}
                {One ? ((price[One?.token] * 0.5) / 100).toFixed(5) : 0} (0.5%)
              </div>

              <div>
                <div className="bold-text"> Tổng: </div>{" "}
                {One ? ((price[One.token] * 101.5) / 100).toFixed(5) : 0}{" "}
                {One ? One.token : "?"}
              </div>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={
                    <>
                      {" "}
                      Tôi đồng ý với các{" "}
                      <a className="normal-a" href="/policy">điều khoản qui định</a> và chấp
                      nhận mọi rủi ro.
                    </>
                  }
                />
              </Form.Group>

              {/* <Form.Group className="mb-3">
              <Form.Label>Slippage (%)</Form.Label>
              <Form.Control
                name="slippage"
                type="number"
                onChange={handleChange}
              />
            </Form.Group> */}
              <Button variant="primary" type="submit">
                Thanh toán
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                variant="success"
                onClick={handleBuyCrypto}
              >
                Nạp thêm
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
              onClose={() => setShowToast(false)}
              show={ShowToast}
              delay={3000}
              autohide
              bg="warning"
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Thông báo</strong>
                <small>0 seconds ago</small>
              </Toast.Header>
              <Toast.Body>
                Số dư đồng {One ? One.token : "???"} của bạn hiện không đủ, vui
                lòng chọn token khác hoặc nạp thêm!
                <div>
                  <div className="block-small-margin">
                    <div className="bold-text">Token: </div>{" "}
                    {One ? One.token : "???"}
                  </div>
                  <div className="block-small-margin">
                    <div className="bold-text">Cần thanh toán: </div>{" "}
                    {One ? One.amount : "???"}
                  </div>
                  <div className="block-small-margin">
                    <div className="bold-text">Số dư: </div>{" "}
                    {One ? CryptoUser[One.token] : "??"}
                  </div>
                </div>
              </Toast.Body>
            </Toast>
          </ToastContainer>

          <ToastContainer className="p-3" position="top-end">
            <Toast
              onClose={() => setToast({ ...toast, show: false })}
              show={toast.show}
              delay={10000}
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
              <Toast.Body>
                {toast.content}
                {toast.hash && (
                  <div>
                    Bạn có thể kiểm tra giao dịch vừa thực hiện trên hệ thống
                    blockchain tại{" "}
                    <a href={"https://testnet.bscscan.com/tx/" + toast.hash}>
                      {" "}
                      đây{" "}
                    </a>
                  </div>
                )}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </Modal>
      </div>
    </>
  );
};

const CryptoPaymentScreen = () => {
  const { user } = useContext(AuthContext);

  const cash = calculateOrder();
  let price = getPriceByToken();
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));

  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
    hash: null,
  });

  const handleCreateWallet = async () => {
    try {
      const response = await axios.post(
        `${endpointUrl}/create-user/${MerchantId}/${user.id}`
      );
      if (response.data.statusCode === 200) {
        await UpdateCryptoInfo(user.id);
        setToast({
          show: true,
          bg: "success",
          header: "Tạo ví thành công!",
          content:
            "Chúc mừng bạn đã tạo ví thành công, từ giờ bạn có thể giao dịch bằng token. Nếu chưa có token trong ví, xin hãy nạp thêm!",
        });
      } else {
        setToast({
          show: true,
          bg: "danger",
          header: "Tạo ví thất bại",
          content:
            "Chúng tôi gặp lỗi trong lúc cố gắng tạo ví điện tử cho bạn, xin vui lòng thử lại",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        bg: "danger",
        header: "Tạo ví thất bại",
        content:
          "Server gặp lỗi trong lúc cố gắng tạo ví điện tử cho bạn, xin vui lòng thử lại",
      });
    }
  };

  const formatter = new Intl.NumberFormat();

  return (
    <div>
      Chào mừng bạn đến với thanh toán với ví điện tử. Lượng token cơ bản bạn
      cần thanh toán tương đương với: {formatter.format(cash)}. Hãy chọn loại
      token, chọn network, đồng ý điều khoản và mức phí (hoa hồng, gas),
      slippage, bấm OK. Nếu thiếu token hãy nạp thêm (Các bạn chuyển VND qua cho
      chúng tôi thông qua các nền tảng tài chính trung gian, chúng tôi gửi token
      về cho bạn với một ít phí hoa hồng)
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Ví của bạn</Accordion.Header>
          <Accordion.Body>
            {!CryptoUser ? (
              <Button onClick={handleCreateWallet}>
                Bạn chưa có ví điện tử, tạo ngay!
              </Button>
            ) : (
              <>
                <div>Bitcoin: {CryptoUser.BTC}</div>
                <div>Ethereum: {CryptoUser.ETH}</div>
                <div>BNB: {CryptoUser.BNB}</div>
                <div>Tether: {CryptoUser.USDT}</div>
                <div>VND: {formatter.format(CryptoUser.VND)}</div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Đơn hàng</Accordion.Header>
          <Accordion.Body>
            Hãy chọn loại token bạn muốn thanh toán:
            <>
              <div>Theo Bitcoin:{price.BTC}</div>
              <div>Theo Ethereum:{price.ETH}</div>
              <div>Theo BNB:{price.BNB}</div>
              <div>Theo Tether:{price.USDT}</div>
            </>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {CryptoUser && <CryptoPaymentModal />}
      <ToastContainer className="p-3" position="top-end">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={10000}
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
          <Toast.Body>
            {toast.content}
            {toast.hash && (
              <div>
                Bạn có thể kiểm tra giao dịch vừa thực hiện trên hệ thống
                blockchain tại{" "}
                <a href={"https://testnet.bscscan.com/tx/" + toast.hash}>
                  {" "}
                  đây{" "}
                </a>
              </div>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default CryptoPaymentScreen;
