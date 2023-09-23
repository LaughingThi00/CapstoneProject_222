import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CryptoWalletScreen from '../components/CryptoWalletScreen'

const CryptoWallet = () => {
  return (
    <>
    <Header />
    <div className="content">
      <CryptoWalletScreen />
    </div>
    <Footer />
  </>
  )
}

export default CryptoWallet