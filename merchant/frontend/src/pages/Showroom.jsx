import React from 'react';
import '../css/showroom.css';
import Header from '../components/Header';
import List from '../components/ListShowroom';
import Trust from '../components/Trust';
import Help from '../components/Help';
import Footer from '../components/Footer';



function Showroom() {
  return (
    <>
        <Header />
        <List />
        <Trust />
        <Help />
        <Footer />
    </>
  )
}

export default Showroom