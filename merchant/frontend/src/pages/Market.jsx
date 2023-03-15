import React from 'react'
import '../css/market.css';
import Header from '../components/Header';
import Recommend from '../components/Recommend';
import DemoProduct from '../components/DemoProduct';
import YourNeed from '../components/YourNeed';

function Market() {
  return (
    <>
        <Header/>
        <Recommend />
        <DemoProduct />
        <YourNeed />
    </>
  )
}

export default Market