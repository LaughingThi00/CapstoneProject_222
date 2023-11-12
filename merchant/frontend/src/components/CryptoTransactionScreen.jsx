import React from 'react'
import Header from './Header'
import CryptoTransaction from './CryptoTransaction'
import Footer from './Footer'

const CryptoTransactionScreen = () => {
  return (
    <>
    <Header />
    <div className="content">
      <CryptoTransaction />
    </div>
    <Footer />
  </>
  )
}

export default CryptoTransactionScreen