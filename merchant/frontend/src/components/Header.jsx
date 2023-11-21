import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import call from "../icon-font/call-outline.svg";
import cart from "../icon-font/cart-outline.svg";
import search from "../icon-font/search-outline.svg";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

const LinkItem = styled(Link)`
  color: black;
  text-decoration: none;
`;
export const LoginButton = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { loginUser, user } = useContext(AuthContext);

  //=========================== OBJECT =========================

  const [One, setOne] = useState({
    username: null,
    password: null,
  });

  //=========================== HANDLE CHANGE FUNCTION =========================

  const handleChange = (e) => {
    setOne({ ...One, [e.target.name]: e.target.value });
  };

  //=========================== HANDLE SUBMIT FUNCTION =========================
  const handleLogin = async (e) => {
    e.preventDefault();
    const LoginResult = await loginUser(One);
  };
  if (user) return;
  else
    return (
      <>
        <Button variant="success" onClick={handleShow}>
          Đăng nhập
        </Button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Đăng nhập</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* =========================== GENERAL FORM ========================= */}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  type="text"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Đăng nhập
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Thoát
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export const LogOutButton = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <Button
      variant="danger"
      onClick={() => {
        logoutUser();
      }}
    >
      Log out
    </Button>
  );
};

function Header() {
  const { user } = useContext(AuthContext);

  const [item, setItem] = useState(
    JSON.parse(localStorage.getItem("cart"))
      ? JSON.parse(localStorage.getItem("cart")).length
      : 0
  );

  window.addEventListener("storage", () => {
    setItem(JSON.parse(localStorage.getItem("cart")).length);
  });
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <div className="header-logo-img button-hover">
            <img src="../img/icon.png" alt="" />
          </div>
        </Link>
        <LinkItem to="/">
          <div className="header-logo-text button-hover">BK ROBOTIC</div>
        </LinkItem>
      </div>
      <ul className="header-slider">
        <LinkItem to="/">
          <li
            className={
              window.location.pathname === "/"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            Trang chủ
          </li>
        </LinkItem>

        <LinkItem to="/product">
          <li
            className={
              window.location.pathname === "/product"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            Sản phẩm
          </li>
        </LinkItem>

        <LinkItem to="/showroom">
          <li
            className={
              window.location.pathname === "/showroom"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            Show room
          </li>
        </LinkItem>

        <LinkItem to="/news">
          <li
            className={
              window.location.pathname === "/news"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            Tin tức
          </li>
        </LinkItem>

        <LinkItem to="/warranty">
          <li
            className={
              window.location.pathname === "/warranty"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            Bảo hành
          </li>
        </LinkItem>
        <LinkItem to="/policy">
          <li
            className={
              window.location.pathname === "/policy"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            Chính sách
          </li>
        </LinkItem>
        <LinkItem to="/crypto-payment">
          <li
            className={
              window.location.pathname === "/crypto-payment"
                ? "header-slider-item tab-header-now"
                : "header-slider-item"
            }
          >
            <strong> Ví điện tử </strong>
          </li>
        </LinkItem>
      </ul>
      <div className="header-icon">
        <img
          src={call}
          className="header-icon-item button-hover"
          name="call-outline"
          alt=""
        />
        {user && (
          <Link to="/cart" className="relative-div">
            <img
              src={cart}
              className={
                item === 0
                  ? "header-icon-item button-hover"
                  : "header-icon-item button-hover cart-something"
              }
              name="cart-outline"
              alt=""
            />
            <div className="cart-num">{item}</div>
          </Link>
        )}
        <i className="fa-solid fa-user" />

        <img
          src={search}
          className="header-icon-item button-hover"
          name="search-outline"
          alt=""
        />
        {!user ? <LoginButton /> : <LogOutButton />}
      </div>
    </div>
  );
}

export default Header;
