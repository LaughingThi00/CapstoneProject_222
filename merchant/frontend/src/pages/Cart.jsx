import React from 'react';
import '../css/detail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartScreen from '../components/CartScreen';

function Cart() {
    return (
      <>
      <Header />
      <div className="content">
          <CartScreen/>
      </div>
      <Footer />
      </>
    )
  }
  
  export default Cart;