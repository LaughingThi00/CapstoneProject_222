import React, { useEffect, useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import "../css/cryptopayment.css";
import { MerchantId, endpointUrl, urlBackend } from "../constants/Constant";
import axios from "axios";

const CryptoTransaction = () => {
  const [transactionList, setTransactionList] = useState([]);

  const sortByTimeLastest = () => {
    setTransactionList(
      [...transactionList.sort((a, b) => a.createdAt - b.createdAt)].reverse()
    );
  };

  const sortByTimeOldest = () => {
    setTransactionList(
      [...transactionList.sort((a, b) => b.createdAt - a.createdAt)].reverse()
    );
  };

  useEffect(() => {
    const browseTransaction = async () => {
      const CryptoUser = JSON.parse(localStorage.getItem("wallet"));
      const merchantEncrypt = await axios.post(`${urlBackend}/rsa`, {
        data: MerchantId,
      });
      const res = await axios.post(
        `${endpointUrl}/transactions/${MerchantId}/${CryptoUser.id}`,
        { merchantEncrypt: merchantEncrypt.data.EncyptData }
      );
      if (res.data.statusCode === 200) {
        localStorage.setItem("transactions", JSON.stringify(res.data.data));
        setTransactionList(res.data.data);
      } else;
    };

    browseTransaction().catch(console.error);
  }, []);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

  return (
    <div>
      <div style={{ margin: "20px" }}>
        Đây là nơi bạn xem lại toàn bộ các lần thực hiện giao dịch của mình
        (chuyển/nhận tiền, mua bán, ... ), ở cả <strong>hệ thống nội bộ</strong>{" "}
        và <strong>hệ thống quốc tế</strong>. Hãy phản hồi cho chúng tôi về bất
        cứ giao dịch bất thường nào bạn nhận thấy.
      </div>

      <>
        <div className="table-fixed table-container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th colSpan="1" scope="col">
                  #
                </th>

                <th colSpan="2" scope="col">
                  Loại
                </th>
                <th colSpan="2" scope="col">
                  Ngày tạo
                </th>
                <th colSpan="2" scope="col">
                  {" "}
                  Token
                </th>
                <th colSpan="2" scope="col">
                  Số lượng
                </th>
                <th colSpan="2" scope="col">
                  Chi tiết
                </th>
              </tr>
            </thead>

            <tbody>
              {transactionList.map((item, index) => {
                return (
                  <tr key={index}>
                    <th colSpan="1" scope="row">
                      {index + 1}
                    </th>
                    <td colSpan="2">{item.type}</td>
                    <td colSpan="2">
                      {String(new Date(item.createdAt * 1000))}
                    </td>
                    <td colSpan="2">{item.byToken ? item.byToken : "Không"}</td>
                    <td colSpan="2">
                      {item.byAmount
                        ? formatter.format(item.byAmount)
                        : "Không"}
                    </td>
                    <td colSpan="2">
                      <TransactionDetail detail={item._id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "center", margin: "20px" }}>
          <Button variant="warning" onClick={sortByTimeLastest}>
            Sắp xếp (tạo gần nhất){" "}
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            variant="warning"
            onClick={sortByTimeOldest}
          >
            Sắp xếp (tạo lâu nhất)
          </Button>
        </div>
        <div style={{ textAlign: "center" }}></div>
      </>
    </div>
  );
};

export const TransactionDetail = ({ detail }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });

  const [transactionList, setTransactionList] = useState(
    localStorage.getItem("transactions")
      ? JSON.parse(localStorage.getItem("transactions"))
      : []
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const transaction = transactionList.find((i) => i._id === detail);
  if (!transaction) return;
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Chi tiết
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Transaction {transaction ? transaction._id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* =========================== GENERAL INFO ========================= */}
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Thông tin chung</Accordion.Header>
              <Accordion.Body>
                <div>
                  <h6>ID:</h6>
                  <p>
                    {transaction
                      ? transaction._id
                        ? transaction._id
                        : "Chưa có"
                      : "Chưa xác định"}
                  </p>
                </div>

                <div>
                  <h6>Loại giao dịch:</h6>
                  <p>{transaction.type}</p>
                </div>

                <div>
                  <h6>Thời gian:</h6>
                  <p> {String(new Date(transaction.createdAt * 1000))}</p>
                </div>

                {transaction.byToken && (
                  <div>
                    <h6>Token nguồn:</h6>
                    <p>{transaction.byToken}</p>
                  </div>
                )}
                {transaction.byAmount !== null && (
                  <div>
                    <h6>Lượng token giao dịch:</h6>
                    <p>
                      {formatter.format(transaction.byAmount)} ({" "}
                      {transaction.byToken} )
                    </p>
                  </div>
                )}

                {transaction.forToken && (
                  <div>
                    <h6>Token đích:</h6>
                    <p>{transaction.forToken}</p>
                  </div>
                )}
                {transaction.forAmount && (
                  <div>
                    <h6>Lượng token nhận về:</h6>
                    <p>
                      {formatter.format(transaction.forAmount)} ({" "}
                      {transaction.forToken} )
                    </p>
                  </div>
                )}
                {transaction.platformWithdraw && (
                  <div>
                    <h6>Platform rút tiền:</h6>
                    <p>{transaction.platformWithdraw}</p>
                  </div>
                )}

                {transaction.gas && (
                  <div>
                    <h6>Phí gas:</h6>
                    <p>
                      {formatter.format(transaction.gas)} ({" "}
                      {transaction.byToken} )
                    </p>
                  </div>
                )}

                {transaction.commission && (
                  <div>
                    <h6>Phí commission:</h6>
                    <p>
                      {formatter.format(transaction.commission)} ({" "}
                      {transaction.byToken} )
                    </p>
                  </div>
                )}
                {transaction.hash &&
                transaction.hash !== String(transaction.timestamp) ? (
                  <div>
                    <h6>Mã hash:</h6>
                    <p>{transaction.hash}</p>
                    <a
                      href={
                        "https://testnet.bscscan.com/tx/" + transaction.hash
                      }
                    >
                      {" "}
                      Kiểm tra trên bscscan{" "}
                    </a>
                    <br />
                  </div>
                ) : (
                  <div>
                    <h6>
                      Mã hash: <strong>Giao dịch nội bộ</strong>
                    </h6>
                  </div>
                )}
                {transaction.from_ && (
                  <div>
                    <h6>Ví nguồn:</h6>
                    <p>{transaction.from_}</p>
                  </div>
                )}
                {transaction.to_ && (
                  <div>
                    <h6>Ví đích:</h6>
                    <p>{transaction.to_}</p>
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CryptoTransaction;
