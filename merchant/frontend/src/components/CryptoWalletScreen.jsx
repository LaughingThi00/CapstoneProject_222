import React, { useContext, useState } from "react";
import { transformCryptoUserData } from "./CheckoutScreen";
import Accordion from "react-bootstrap/Accordion";
import { Button, Form, Modal, Toast, ToastContainer } from "react-bootstrap";
import "../css/cryptowallet.css";
import axios from "axios";
import { MerchantId, endpointUrl, urlBackend } from "../constants/Constant";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const UpdateCryptoInfo = async (id) => {
  try {
    const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
      data: MerchantId,
    });
    const response = await axios.post(
      `${endpointUrl}/user-info/${MerchantId}/${id}`,
      { merchantEncrypt: merchantEncrypt.data.EncyptData }
    );

    if (response.data.statusCode === 200) {
      localStorage.setItem(
        "wallet",
        JSON.stringify(transformCryptoUserData(response.data.data))
      );
    } else {
      localStorage.setItem("wallet", null);
    }
  } catch (error) {
    localStorage.setItem("wallet", null);
  }
};

export const BuyCryptoModal = () => {
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const Price = JSON.parse(localStorage.getItem("price")) ?? null;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
      const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
        data: MerchantId,
      });
      const response =
        One.token === "VND"
          ? await axios.put(`${endpointUrl}/deposit-vnd/${MerchantId}`, {
              merchantEncrypt: merchantEncrypt.data.EncyptData,
              userId: CryptoUser.id,
              merchant: MerchantId,
              amountVND: One.amount_VND,
              bill: `MOMO${Math.floor(Math.random() * 1000000)}`,
              platform: "MOMO",
            })
          : await axios.put(`${endpointUrl}/buy-crypto-direct/${MerchantId}`, {
              merchantEncrypt: merchantEncrypt.data.EncyptData,
              userId: CryptoUser.id,
              merchant: MerchantId,
              amountVND: One.amount_VND,
              forToken: One.token,
              bill: `MOMO${Math.floor(Math.random() * 1000000)}`,
              platform: "MOMO",
            });

      if (response.data.statusCode === 200) {
        await UpdateCryptoInfo(CryptoUser.id);
        setToast({
          show: true,
          bg: "success",
          header: `Thanh toán thành công.`,
          content: "Giao dịch đã thành công, bạn đã được cộng token.",
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
  };

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
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <div className="bold-text-no-margin">
                  Số tiền muốn nạp (VND)
                </div>
              </Form.Label>
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
                <option value="VND"> VND (Đồng Việt Nam)</option>
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
                <option disabled>Mặc định từ người bán</option>
              </Form.Select>
            </Form.Group>

            <div>
              <div className="bold-text">Token cơ bản: </div> {amount_token}{" "}
              {One ? One.token : "???"}
            </div>

            <div>
              <div className="bold-text">Phí gas (1%): </div>{" "}
              {One.token === "VND" ? 0 : (amount_token / 100).toFixed(5)}{" "}
              {One ? One.token : "???"}
            </div>

            <div>
              <div className="bold-text">Phí hoa hồng (0.5%): </div>{" "}
              {One.token === "VND"
                ? 0
                : ((amount_token * 0.5) / 100).toFixed(5)}{" "}
              {One ? One.token : "???"}
            </div>

            <div>
              <div className="bold-text"> Tổng token nhận được: </div>{" "}
              {One
                ? One.token === "VND"
                  ? amount_token
                  : ((amount_token * 98.5) / 100).toFixed(5)
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
              {/* {toast.hash && (
                <div>
                  Bạn có thể kiểm tra giao dịch vừa thực hiện trên hệ thống
                  blockchain tại{" "}
                  <a href={"https://testnet.bscscan.com/tx/" + toast.hash}>
                    {" "}
                    đây{" "}
                  </a>
                </div>
              )} */}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
    </>
  );
};

export const ChangeCryptoModal = () => {
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const Price = JSON.parse(localStorage.getItem("price")) ?? null;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [One, setOne] = useState({
    byToken: "",
    forToken: "",
    amount: 0,
    slippage: 1,
  });
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
      if (One.byToken && One.forToken && One.amount) {
        console.log("Price:", Price);
        if (["amount", "byToken", "forToken"].includes(e.target.name)) {
          switch (e.target.name) {
            case "amount":
              setAmount_Token(
                Number(
                  (e.target.value *
                    Price.find((x) => x.name === One.byToken).price) /
                    Price.find((x) => x.name === One.forToken).price
                ).toFixed(5)
              );

              break;
            case "byToken":
              setAmount_Token(
                Number(
                  (One.amount *
                    Price.find((x) => x.name === e.target.value).price) /
                    Price.find((x) => x.name === One.forToken).price
                ).toFixed(5)
              );

              break;
            case "forToken":
              setAmount_Token(
                Number(
                  (One.amount *
                    Price.find((x) => x.name === One.byToken).price) /
                    Price.find((x) => x.name === e.target.value).price
                ).toFixed(5)
              );

              break;
            default:
              break;
          }
        }
      }
      setOne({ ...One, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !CryptoUser.id ||
      !One.amount ||
      !One.forToken ||
      One.byToken === One.forToken
    ) {
      return;
    }
    try {
      if (CryptoUser[One.byToken] < One.amount) {
        setToast({
          show: true,
          bg: "danger",
          header: "Đổi token thất bại",
          content: `Số dư token nguồn của bạn không đủ. Vui lòng nạp thêm vào tài khoản!`,
        });
        return;
      }
      const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
        data: MerchantId,
      });
      const response = await axios.put(
        `${endpointUrl}/change-token/${MerchantId}`,
        {
          merchantEncrypt: merchantEncrypt.data.EncyptData,
          userId: CryptoUser.id,
          merchant: MerchantId,
          amount: One.amount,
          byToken: One.byToken,
          forToken: One.forToken,
        }
      );

      if (response.data.statusCode === 200) {
        await UpdateCryptoInfo(CryptoUser.id);
        setToast({
          show: true,
          bg: "success",
          header: "Đổi token thành công",
          content: `${One.amount} ${One.byToken} đã được đổi thành ${amount_token} ${One.forToken}. Hãy tiếp tục sử dụng`,
          hash: response.data.data.hash,
        });
      } else {
        setToast({
          show: true,
          bg: "danger",
          header: "Đổi token thất bại",
          content:
            "Giao dịch đã thất bại. Tài khoản của bạn được đảm bảo giữ nguyên hiện trạng.",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        bg: "danger",
        header: "Đổi token thất bại",
        content:
          "Giao dịch đã thất bại. Tài khoản của bạn được đảm bảo giữ nguyên hiện trạng.",
      });
    }
  };

  return (
    <>
      <Button
        variant="warning"
        style={{ marginLeft: "20px" }}
        onClick={() => setShow(true)}
      >
        {" "}
        Đổi token{" "}
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chuyển đổi tiền điện tử</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Đây là giao dịch hợp pháp. Khi các bạn bấm nút "Chuyển đổi",{" "}
            <strong>hệ thống nội bộ</strong> sẽ chuyển đổi các đồng token trong
            ví theo yêu cầu của bạn và theo thời giá thị trường.
          </div>
          <br />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                <div className="bold-text-no-margin">
                  Số token muốn chuyển đổi ({One.byToken})
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
                <div className="bold-text-no-margin">Token nguồn</div>
              </Form.Label>
              <Form.Select
                name="byToken"
                onClick={handleChange}
                onChange={handleChange}
                aria-label="Hãy chọn loại token bạn muốn giao dịch"
              >
                <option value="VND"> VND (Đồng Việt Nam)</option>
                <option value="BTC"> BTC (Bitcoin)</option>
                <option value="USDT"> USDT (Đồng USDT)</option>
                <option value="ETH"> ETH (Ethereum)</option>
                <option value="BNB"> BNB (Đồng BNB)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                <div className="bold-text-no-margin">Token đích</div>
              </Form.Label>
              <Form.Select
                name="forToken"
                onClick={handleChange}
                onChange={handleChange}
                aria-label="Hãy chọn loại token bạn muốn giao dịch"
              >
                <option value="VND"> VND (Đồng Việt Nam)</option>
                <option value="BTC"> BTC (Bitcoin)</option>
                <option value="USDT"> USDT (Đồng USDT)</option>
                <option value="ETH"> ETH (Ethereum)</option>
                <option value="BNB"> BNB (Đồng BNB)</option>
              </Form.Select>
            </Form.Group>

            <div>
              <div className="bold-text">Token nguồn: </div> {amount_token}{" "}
              {One ? One.forToken : "???"}
            </div>

            <div>
              <div className="bold-text">Phí gas (0.01%): </div>{" "}
              {((amount_token * 0.01) / 100).toFixed(5)}{" "}
              {One ? One.forToken : "???"}
            </div>

            <div>
              <div className="bold-text">Phí hoa hồng (0.05%): </div>{" "}
              {((amount_token * 0.05) / 100).toFixed(5)}{" "}
              {One ? One.forToken : "???"}
            </div>

            <div>
              <div className="bold-text"> Tổng token nhận được: </div>{" "}
              {((amount_token * 99.4) / 100).toFixed(5)}{" "}
              {One ? One.forToken : "?"}
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
                  Hệ thống nội bộ vừa ghi nhận giao dịch của bạn. Cảm ơn đã tin
                  dùng!
                </div>
              )}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
    </>
  );
};

const CryptoWalletScreen = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const price_token = JSON.parse(localStorage.getItem("price")) ?? null;
  const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
  const [toast, setToast] = useState({
    show: false,
    bg: null,
    header: null,
    content: null,
  });

  const handleReturn = () => {
    navigate("/crypto-payment");
  };

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
              <Button onClick={handleCreateWallet}>
                Bạn chưa có ví điện tử, tạo ngay!
              </Button>
            ) : (
              <>
                <div>
                  {" "}
                  <div className="bold-text">
                    {" "}
                    <strong>Bitcoin: </strong>
                  </div>{" "}
                  {CryptoUser.BTC} (BTC)
                </div>
                <div>
                  {" "}
                  <div className="bold-text">
                    {" "}
                    <strong>Ethereum: </strong>
                  </div>{" "}
                  {CryptoUser.ETH} (ETH)
                </div>
                <div>
                  {" "}
                  <div className="bold-text">
                    <strong>BNB: </strong>{" "}
                  </div>{" "}
                  {CryptoUser.BNB} (BNB)
                </div>
                <div>
                  {" "}
                  <div className="bold-text">
                    <strong>Tether: </strong>{" "}
                  </div>{" "}
                  {CryptoUser.USDT} (USDT)
                </div>
                <div>
                  {" "}
                  <div className="bold-text">
                    <strong>VND: </strong>{" "}
                  </div>{" "}
                  {formatter.format(CryptoUser.VND)} (VND)
                </div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Tra cứu tỉ giá Token/VND </Accordion.Header>
          <Accordion.Body>
            Chúng tôi cập nhật tỉ giá các đồng token theo thời giá hiện tại{" "}
            <br></br>
            <br></br>
            {price_token &&
              price_token.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="bold-text">{item.name}: </div>{" "}
                    {formatter.format(item.price)} (VND/{item.name})
                  </div>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
      <Button
        style={{ marginLeft: "20px" }}
        onClick={handleReturn}
        variant="primary"
      >
        Trở về thanh toán
      </Button>
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
    </div>
  );
};

export default CryptoWalletScreen;
