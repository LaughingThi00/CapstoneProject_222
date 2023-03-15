import React from 'react'
import '../css/news.css';
import Header from '../components/Header';
import Chapter from '../components/Chapter';
import Tech from '../components/Tech';
import Customer from '../components/Customer';
import Rate from '../components/Rate';
import Guide from '../components/Guide';
import Footer from '../components/Footer';

function News() {
  return (
    <>   
    <Header/>
    <div className="content">
        <div className="main">
            <Chapter/>
            <div id="tech">
                <Tech/>
                <Customer/>
                <Rate/>
                <Guide/>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default News