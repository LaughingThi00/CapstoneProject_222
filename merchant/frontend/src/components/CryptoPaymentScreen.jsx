import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Form,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { calculateOrder, transformCryptoUserData } from "./CheckoutScreen";
import "../css/cryptopayment.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { MerchantId, endpointUrl, urlBackend } from "../constants/Constant";
import axios from "axios";
import {
  BuyCryptoModal,
  ChangeCryptoModal,
  UpdateCryptoInfo,
} from "./CryptoWalletScreen";

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

export const getPrice = (data) => {
  const PriceFromAPI =
    data ?? JSON.parse(localStorage.getItem("price")) ?? null;
  let Price = { BTC: 0, ETH: 0, BNB: 0, USDT: 0, VND: 0 };

  if (!PriceFromAPI) return Price;

  PriceFromAPI.forEach((item) => {
    switch (item.name) {
      case "BTC":
        Price.BTC = item.price.toFixed(5);
        break;
      case "ETH":
        Price.ETH = item.price.toFixed(5);
        break;
      case "BNB":
        Price.BNB = item.price.toFixed(5);
        break;
      case "USDT":
        Price.USDT = item.price.toFixed(5);
        break;
      case "VND":
        Price.VND = 1;
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
  const [One, setOne] = useState({ token: null, amount: null, kind: null });
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
    hash: null,
  });
  const handleChange = (e) => {
    if (!e.target.name || !e.target.value) {
      setToast({
        show: true,
        bg: "warning",
        header: "Thiếu thông tin",
        content: `Cần điền đủ thông tin: Loại token muốn giao dịch, lượng token, loại giao dịch (tập trung hay phi tập trung).`,
      });
      return;
    }
    if (e.target.name === "token")
      setOne({
        ...One,
        [e.target.name]: e.target.value,
        amount: Number((price[e.target.value] * 1.015).toFixed(5)),
      });
    else setOne({ ...One, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!One || !One.token || !One.kind || !CryptoUser) return;
    if (One.amount >= CryptoUser[One.token]) {
      setShowToast(true);
    } else {
      try {
        const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
          data: MerchantId,
        });
        const response =
          One.kind === "outbound"
            ? await axios.put(
                `${endpointUrl}/transfer-outbound/${MerchantId}`,
                {
                  merchantEncrypt: merchantEncrypt.data.EncyptData,
                  merchant: MerchantId,
                  sender: CryptoUser.id,
                  receiver: "0xcd3f68850ef63f079becb302870245dcb461dc1b",
                  byAmount: One.amount,
                  byToken: One.token,
                }
              )
            : await axios.put(`${endpointUrl}/transfer-inbound/${MerchantId}`, {
                merchantEncrypt: merchantEncrypt.data.EncyptData,
                merchant: MerchantId,
                sender: CryptoUser.id,
                receiver: "TEST_INBOUND_USER1",
                byAmount: One.amount,
                byToken: One.token,
              });
        if (response.data.statusCode === 200) {
          await UpdateCryptoInfo(CryptoUser.id);
          setToast({
            show: true,
            bg: "success",
            header: "Thanh toán thành công",
            content: `Giao dịch đã thành công, bạn đã mua được hàng.`,
            hash: response.data.data.hash,
          });
        } else {
          setToast({
            show: true,
            bg: "danger",
            header: "Thanh toán thất bại",
            content:
              "Giao dịch đã thất bại. Chúng tôi hủy giao dịch của bạn sớm nhất để tránh phát sinh sự cố.",
          });
        }
      } catch (error) {
        setToast({
          show: true,
          bg: "danger",
          header: "Thanh toán thất bại",
          content: `Giao dịch đã thất bại. Chúng tôi hủy giao dịch của bạn sớm nhất để tránh phát sinh sự cố. \nSERVER: ${error?.message} `,
        });
      }
    }
  };

  const handleBuyCrypto = () => {
    navigate("/crypto-wallet");
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

  return (
    <>
      <Button
        variant="success"
        onClick={() => setShow(true)}
        style={{ margin: "20px" }}
      >
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
                  name="kind"
                  onClick={handleChange}
                  aria-label="Hãy chọn loại giao dịch bạn muốn tiến hành"
                >
                  <option value="inbound">
                    {" "}
                    Inbound (Giao dịch tập trung - Nhanh, ít chi phí){" "}
                  </option>
                  <option value="outbound">
                    {" "}
                    Outbound (Giao dịch phi tập trung - Chậm hơn, bảo mật, mất
                    nhiều phí){" "}
                  </option>
                </Form.Select>
              </Form.Group>
              <div>
                <div className="bold-text">Phí gas: </div>{" "}
                {One && One?.kind === "outbound"
                  ? formatter.format((price[One?.token] * 1) / 100)
                  : 0}{" "}
                {One.token} ({One?.kind === "outbound" ? 1 : 0} %)
              </div>

              <div>
                <div className="bold-text">Phí hoa hồng: </div>{" "}
                {One && One?.kind === "outbound"
                  ? formatter.format((price[One?.token] * 0.5) / 100)
                  : 0}{" "}
                {One.token} ({One?.kind === "outbound" ? 0.5 : 0} %)
              </div>

              <div>
                <div className="bold-text"> Tổng: </div>{" "}
                {One
                  ? formatter.format(
                      (price[One.token] *
                        (One?.kind === "outbound" ? 101.5 : 100)) /
                        100
                    )
                  : 0}{" "}
                {One ? One.token : "?"}
              </div>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={
                    <>
                      {" "}
                      Tôi đồng ý với các{" "}
                      <a className="normal-a" href="/policy">
                        điều khoản qui định
                      </a>{" "}
                      và chấp nhận mọi rủi ro.
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
                    {One ? formatter.format(One.amount) : "???"}
                  </div>
                  <div className="block-small-margin">
                    <div className="bold-text">Số dư: </div>{" "}
                    {One ? formatter.format(CryptoUser[One.token]) : "??"}
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
                {toast.hash && One.kind === "outbound" && (
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

const WithdrawCryptoModal = () => {
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const [ShowToast, setShowToast] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [One, setOne] = useState({ token: null, amount: null, address: null });
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
    hash: null,
  });
  const handleChange = (e) => {
    if (!e.target.name || !e.target.value) return;
    setOne({
      ...One,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!One || !One.token || !One.amount || !One.address || !CryptoUser)
      return;
    if (One.amount >= CryptoUser[One.token]) {
      setToast({
        show: true,
        bg: "danger",
        header: "Rút tiền thất bại",
        content:
          "Số token bạn định rút vượt quá số dư trong tài khoản. Vui lòng chọn số dư phù hợp!",
      });
      // setShowToast(true);
    } else {
      try {
        const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
          data: MerchantId,
        });
        const response = await axios.put(
          `${endpointUrl}/transfer-outbound/${MerchantId}`,
          {
            merchantEncrypt: merchantEncrypt.data.EncyptData,
            merchant: MerchantId,
            sender: CryptoUser.id,
            receiver: One.address,
            byAmount: One.amount,
            byToken: One.token,
          }
        );
        if (response.data.statusCode === 200) {
          await UpdateCryptoInfo(CryptoUser.id);
          setToast({
            show: true,
            bg: "success",
            header: "Rút tiền thành công",
            content: `Giao dịch đã thành công, số token đã được chuyển vào hotwallet của bạn.`,
            hash: response.data.data.hash,
          });
        } else {
          setToast({
            show: true,
            bg: "danger",
            header: "Rút tiền thất bại",
            content:
              "Giao dịch đã thất bại. Chúng tôi sẽ cố gắng gửi token đến cho bạn sớm nhất có thể, nếu như không thành công, ví của bạn sẽ được giữ nguyên.",
          });
        }
      } catch (error) {
        setToast({
          show: true,
          bg: "danger",
          header: "Thanh toán thất bại",
          content: `Giao dịch đã thất bại. Chúng tôi hủy giao dịch của bạn sớm nhất để tránh phát sinh sự cố. \nSERVER: ${error?.message} `,
        });
      }
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShow(true)}
        style={{ margin: "20px" }}
      >
        {" "}
        Rút token
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
            <Modal.Title>Thông tin rút token</Modal.Title>
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
                  aria-label="Hãy chọn loại token bạn muốn rút"
                >
                  <option value="BTC"> BTC (Bitcoin)</option>
                  <option value="USDT"> USDT (Đồng USDT)</option>
                  <option value="ETH"> ETH (Ethereum)</option>
                  <option value="BNB">BNB (Đồng BNB)</option>
                  {/* <option value="VND">{price.VND} VND (Đồng Việt Nam)</option> */}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  {" "}
                  <div className="bold-text-no-margin">Network</div>
                </Form.Label>
                <Form.Select
                  aria-label="Hãy chọn loại token bạn muốn giao dịch"
                  disabled
                >
                  <option>Mặc định từ người bán</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="bold-text-no-margin">
                    Số token muốn rút ({One.token})
                  </div>
                </Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  onChange={handleChange}
                  onClick={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="bold-text-no-margin">
                    Nhập địa chỉ ví của bạn
                  </div>
                </Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  onChange={handleChange}
                  onClick={handleChange}
                />
              </Form.Group>

              <div>
                <div className="bold-text">Phí gas: </div>{" "}
                {One ? formatter.format((One.amount * 1) / 100) : 0} (1%)
              </div>

              <div>
                <div className="bold-text">Phí hoa hồng: </div>{" "}
                {One ? formatter.format((One.amount * 0.5) / 100) : 0} (0.5%)
              </div>

              <div>
                <div className="bold-text"> Tổng: </div>{" "}
                {One ? formatter.format((One.amount * (100 - 1.5)) / 100) : 0}{" "}
                {One ? One.token : "?"}
              </div>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={
                    <>
                      {" "}
                      Tôi đồng ý với các{" "}
                      <a className="normal-a" href="/policy">
                        điều khoản qui định
                      </a>{" "}
                      và chấp nhận mọi rủi ro.
                    </>
                  }
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Rút
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
                    {One ? formatter.format(One.amount) : "???"}
                  </div>
                  <div className="block-small-margin">
                    <div className="bold-text">Số dư: </div>{" "}
                    {One ? formatter.format(CryptoUser[One.token]) : "??"}
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

const WithdrawBankingModal = () => {
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const [ShowToast, setShowToast] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [One, setOne] = useState({
    platform: null,
    amount: null,
    address: null,
  });
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
    hash: null,
  });
  const handleChange = (e) => {
    if (!e.target.name || !e.target.value) return;
    setOne({
      ...One,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!One || !One.platform || !One.amount || !One.address || !CryptoUser)
      return;
    if (One.amount >= CryptoUser["VND"]) {
      setToast({
        show: true,
        bg: "danger",
        header: "Rút tiền thất bại",
        content:
          "Số token bạn định rút vượt quá số dư trong tài khoản. Vui lòng chọn số dư phù hợp!",
      });
      // setShowToast(true);
    } else {
      try {
        const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
          data: MerchantId,
        });

        const response = await axios.put(
          `${endpointUrl}/transfer-banking/${MerchantId}`,
          {
            merchantEncrypt: merchantEncrypt.data.EncyptData,
            merchant: MerchantId,
            sender: CryptoUser.id,
            receiver: One.address,
            byAmount: One.amount,
            platformWithdraw: One.platform,
          }
        );
        if (response.data.statusCode === 200) {
          await UpdateCryptoInfo(CryptoUser.id);
          setToast({
            show: true,
            bg: "success",
            header: "Rút tiền thành công",
            content: `Giao dịch đã thành công, số tiền đã được chuyển vào tài khoản ngân hàng của bạn.`,
            hash: response.data.data.hash,
          });
        } else {
          setToast({
            show: true,
            bg: "danger",
            header: "Rút tiền thất bại",
            content:
              "Giao dịch đã thất bại. Chúng tôi sẽ cố gắng gửi tiền đến cho bạn sớm nhất có thể, nếu như không thành công, ví của bạn sẽ được giữ nguyên.",
          });
        }
      } catch (error) {
        setToast({
          show: true,
          bg: "danger",
          header: "Thanh toán thất bại",
          content: `Giao dịch đã thất bại. Chúng tôi hủy giao dịch của bạn sớm nhất để tránh phát sinh sự cố. \nSERVER: ${error?.message} `,
        });
      }
    }
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShow(true)}
        style={{ margin: "20px" }}
      >
        {" "}
        Rút tiền
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
            <Modal.Title>Thông tin rút VND về ngân hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* =========================== GENERAL FORM ========================= */}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="bold-text-no-margin">Chọn ngân hàng</div>
                </Form.Label>
                <Form.Select
                  name="platform"
                  onClick={handleChange}
                  aria-label="Hãy chọn ngân hàng hoặc nền tảng tài chính bạn muốn rút về"
                >
                  <option value="SACOMBANK"> Sacombank</option>
                  <option value="AGRIBANK"> Agribank</option>
                  <option value="TECHCOMBANK">Techcombank</option>
                  <option value="TIMOBANK">Timobank</option>
                  <option value="VIETTINBANK">Viettinbank</option>
                  <option value="HDBANK">HD Bank</option>
                  <option value="MOMO"> MOMO </option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="bold-text-no-margin">
                    Lượng tiền muốn rút (VND)
                  </div>
                </Form.Label>
                <Form.Control
                  name="amount"
                  type="number"
                  onChange={handleChange}
                  onClick={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <div className="bold-text-no-margin">
                    Nhập số tài khoản của bạn
                  </div>
                </Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  onChange={handleChange}
                  onClick={handleChange}
                />
              </Form.Group>

              <div>
                <div className="bold-text">Phí gas: </div>{" "}
                {One ? formatter.format((One.amount * 1) / 100) : 0} (1%)
              </div>

              <div>
                <div className="bold-text">Phí hoa hồng: </div>{" "}
                {One ? formatter.format((One.amount * 0.5) / 100) : 0} (0.5%)
              </div>

              <div>
                <div className="bold-text"> Tổng: </div>{" "}
                {One ? formatter.format(One.amount / 100) : 0} VND{" "}
              </div>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label={
                    <>
                      {" "}
                      Tôi đồng ý với các{" "}
                      <a className="normal-a" href="/policy">
                        điều khoản qui định
                      </a>{" "}
                      và chấp nhận mọi rủi ro.
                    </>
                  }
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Rút
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
                Số dư VND của bạn hiện không đủ, vui lòng nạp thêm!
                <div>
                  <div className="block-small-margin">
                    <div className="bold-text">Cần thanh toán: </div>{" "}
                    {One ? One.amount : "???"} VND
                  </div>
                  <div className="block-small-margin">
                    <div className="bold-text">Số dư: </div>{" "}
                    {One ? CryptoUser["VND"] : "??"} VND
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
              <Toast.Body>{toast.content}</Toast.Body>
            </Toast>
          </ToastContainer>
        </Modal>
      </div>
    </>
  );
};

const CryptoPaymentScreen = () => {
  useEffect(() => {
    const takePrice = async () => {
      try {
        const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
          data: MerchantId,
        });
        const response = await axios.post(
          `${endpointUrl}/price/${MerchantId}`,
          {
            merchantEncrypt: merchantEncrypt.data.EncyptData,
          }
        );
        console.log("HANDLE THIS DATA:", response.data);
        if (response.data.statusCode === 200) {
          response.data.data.push({
            name: "VND",
            price: 1,
          });
          localStorage.setItem("price", JSON.stringify(response.data.data));
          setPrice(getPrice(response.data.data));
          console.log("RIGHT TAKEPRICE 964" + response.data.data);
        } else {
          console.log("Wrong response 966");
          localStorage.setItem("price", null);
        }
      } catch (error) {
        localStorage.setItem("price", null);
      }
    };

    const FindInfoCrypto = async () => {
      try {
        const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
          data: MerchantId,
        });
        const response = await axios.post(
          `${endpointUrl}/user-info/${MerchantId}/${user.id}`,
          { merchantEncrypt: merchantEncrypt.data.EncyptData }
        );
        if (response.data.statusCode === 200) {
          localStorage.setItem(
            "wallet",
            JSON.stringify(transformCryptoUserData(response.data.data))
          );
          setCryptoUser(transformCryptoUserData(response.data.data));
        } else {
          localStorage.setItem("wallet", null);
        }
      } catch (error) {
        localStorage.setItem("wallet", null);
      }
    };
    takePrice();
    FindInfoCrypto();
  }, []);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const cash = calculateOrder();
  const [price, setPrice] = useState(getPrice());
  const [CryptoUser, setCryptoUser] = useState(
    JSON.parse(localStorage.getItem("wallet"))
  );

  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
    hash: null,
  });

  const handleCreateWallet = async () => {
    try {
      const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
        data: MerchantId,
      });
      const response = await axios.post(
        `${endpointUrl}/create-user/${MerchantId}/${user.id}`,
        { merchantEncrypt: merchantEncrypt.data.EncyptData }
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

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

  return (
    <div className="container">
      Chào mừng bạn đến với thanh toán với ví điện tử. Lượng token cơ bản bạn
      cần thanh toán tương đương với: {formatter.format(cash)}. Hãy chọn loại
      token, chọn network, đồng ý điều khoản và mức phí (hoa hồng, gas),
      slippage, bấm OK. Nếu thiếu token hãy nạp thêm (Các bạn chuyển VND qua cho
      chúng tôi thông qua các nền tảng tài chính trung gian, chúng tôi gửi token
      về cho bạn với một ít phí hoa hồng)
      <Accordion defaultActiveKey={["0", "1"]} alwaysOpen flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Ví của bạn</Accordion.Header>
          <Accordion.Body>
            {!CryptoUser ? (
              <Button onClick={handleCreateWallet}>
                Bạn chưa có ví điện tử, tạo ngay!
              </Button>
            ) : (
              <>
                <div>
                  <strong>Bitcoin: </strong> {formatter.format(CryptoUser.BTC)}{" "}
                  (BTC)
                </div>
                <div>
                  <strong>Ethereum: </strong> {formatter.format(CryptoUser.ETH)}{" "}
                  (ETH)
                </div>
                <div>
                  <strong>BNB: </strong> {formatter.format(CryptoUser.BNB)}{" "}
                  (BNB)
                </div>
                <div>
                  <strong>Tether: </strong> {formatter.format(CryptoUser.USDT)}{" "}
                  (USDT)
                </div>
                <div>
                  <strong>VND: </strong> {formatter.format(CryptoUser.VND)}{" "}
                  (VND)
                </div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Thời giá</Accordion.Header>
          <Accordion.Body>
            Cập nhật thời giá các token theo VND
            <br />
            <>
              <div>
                <strong>Theo Bitcoin: </strong> {formatter.format(price.BTC)}{" "}
                (VND/BTC)
              </div>
              <div>
                <strong>Theo Ethereum: </strong> {formatter.format(price.ETH)}{" "}
                (VND/ETH){" "}
              </div>
              <div>
                <strong>Theo BNB: </strong> {formatter.format(price.BNB)}{" "}
                (VND/BNB){" "}
              </div>
              <div>
                <strong>Theo Tether: </strong> {formatter.format(price.USDT)}{" "}
                (VND/USDT){" "}
              </div>
            </>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {CryptoUser && (
        <>
          <CryptoPaymentModal />

          <BuyCryptoModal />
          <ChangeCryptoModal />
          <Button
            style={{ marginLeft: "20px" }}
            onClick={() => {
              navigate("/crypto-transaction");
            }}
            variant="secondary"
          >
            Xem lịch sử giao dịch
          </Button>
          <div style={{ display: "flex", margin: "0px" }}>
            <WithdrawCryptoModal />
            <WithdrawBankingModal />
          </div>
        </>
      )}
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
