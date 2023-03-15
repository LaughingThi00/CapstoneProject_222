import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckoutScreen from '../components/CheckoutScreen';

function Checkout() {
    return (
      <>
      <Header />
      <div className="content">
          <CheckoutScreen />
      </div>
      <Footer />
      </>
    )
  }
  
  export default Checkout;