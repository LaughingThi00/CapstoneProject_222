import "../css/checkoutscreen.css";
import axios from "axios";
// import { useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import {
  apiPayment,
  endpointUrl,
  MerchantId,
  urlBackend,
} from "../constants/Constant";
import { useContext } from "react";
import { AuthContext } from "./../contexts/AuthContext";

export const transformCryptoUserData = (user) => {
  let res = {
    id: user.userId ?? user.id ,
    BTC: user.asset.find((item) => item.token === "BTC").amount,
    ETH: user.asset.find((item) => item.token === "ETH").amount,
    USDT: user.asset.find((item) => item.token === "USDT").amount,
    BNB: user.asset.find((item) => item.token === "BNB").amount,
    VND: user.asset.find((item) => item.token === "VND").amount,
  };
  return res;
};

// async
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
});

export const calculateOrder = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const toNum = (str) => {
    return Number(str.split(" ")[0].replace(/\./g, ""));
  };
  let sum = 0;
  cart.forEach((x) => {
    sum += toNum(x.product.priceOn) * x.num;
  });
  return sum;
};

function CheckoutScreen() {
  const { user } = useContext(AuthContext);

  const handlePay = async (e) => {
    e.preventDefault();
    try {
      const payment = await axios.post(`${apiPayment}`, {
        amount: sum,
        orderId: `DONHANG${Math.floor(Math.random() * 100000)}`,
        orderInfo: "DON HANG BKROBOTIC",
      });

      if (payment.data.code === 200) {
        window.location.replace(payment.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePrice = async () => {
    try {
      const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
        data: MerchantId,
      });
      const response = await axios.post(`${endpointUrl}/price/${MerchantId}`, {
        merchantEncrypt: merchantEncrypt.data.EncyptData,
      });
      if (response.data.statusCode === 200) {
        response.data.data.push({
          name: "VND",
          price: 1,
        });
        localStorage.setItem("price", JSON.stringify(response.data.data));
      } else {
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
        window.location.replace("/crypto-payment");
      } else {
        localStorage.setItem("wallet", null);
        window.location.replace("/crypto-payment");
      }
    } catch (error) {
      localStorage.setItem("wallet", null);
      window.location.replace("/crypto-payment");
    }
  };

  const sum = calculateOrder();
  const handleCryptoPayment = async () => {
    await takePrice();
    await FindInfoCrypto();
  };

  return (
    <div className="container">
      <div className="form">
        <form>
          <h3>Thông tin giao hàng</h3>

          <label id="fullname">
            {" "}
            Họ và tên <span className="star">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            style={{ width: "100%" }}
            placeholder="Nguyễn Văn A"
          />

          <div className="flex-row">
            <div className="flex-col-2">
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                style={{ width: "100%" }}
                placeholder="abc@hcmut.edu.vn"
              />
            </div>
            <div className="flex-col-2">
              <label>
                Số điện thoại <span> *</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                style={{ width: "100%" }}
                placeholder="0948566534"
              />
            </div>
          </div>

          <label id="adr">
            {" "}
            Địa chỉ <span className="star">*</span>
          </label>
          <input
            type="text"
            style={{ width: "100%" }}
            name="address"
            placeholder="Đại học Bách Khoa"
          />

          <div className="separation" />

          <p>Phương thức thanh toán</p>
          <div className="radio-item">
            <label id="COD">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/5720/5720434.png"
              />
              Thanh toán khi nhận hàng
            </label>
            <input type="radio" id="COD" name="pay-method" value="COD" />
          </div>

          <div className="radio-item">
            <label id="bank">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/5720/5720434.png"
              />
              Chuyển khoản qua ngân hàng
            </label>
            <input type="radio" id="bank" name="pay-method" value="bank" />
          </div>
          <div className="radio-item">
            <label id="momo">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/5720/5720434.png"
              />
              Ví momo
            </label>
            <input type="radio" id="momo" name="pay-method" value="momo" />
          </div>
          <div className="radio-item">
            <label id="zalo">
              <img
                alt=""
                src="https://cdn-icons-png.flaticon.com/512/5720/5720434.png"
              />
              Ví zalopay
            </label>
            <input type="radio" id="zalo" name="pay-method" value="zalo" />
          </div>
          <div style={{ margin: "10px" }}>
            {/* <a href="/crypto-payment"> */}
            <Button onClick={handleCryptoPayment}>
              Thanh toán với ví điện tử{" "}
            </Button>
            {/* </a> */}
          </div>

          <div className="separation" />

          <div className="end-form">
            <p>Giá trị đơn hàng</p>
            <p>{formatter.format(sum)}</p>
          </div>

          <div className="end-form">
            <p>Phí vận chuyển</p>
            <p>{formatter.format("30000")}</p>
          </div>

          <div className="end-form">
            <p>Tổng cộng</p>
            <div className="number-positive">
            <p>{formatter.format(sum + 30000)}</p>
                  
                  </div>
                  
          </div>

          <div className="separation" />

          {/* <Button variant="danger" onClick={()=><Navigate to='/cart' />}> Giỏ hàng</Button> */}
        </form>
        <div className="checkout-button">
          <Button variant="success" onClick={() => <Navigate to="/cart" />}>
            {" "}
            Về giỏ hàng
          </Button>
          <Button variant="primary" onClick={handlePay}>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutScreen;
