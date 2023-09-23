import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CryptoPaymentScreen from "../components/CryptoPaymentScreen";

const CryptoPayment = () => {
  return (
    <>
      <Header />
      <div className="content">
        <CryptoPaymentScreen />
      </div>
      <Footer />
    </>
  );
};

export default CryptoPayment;
