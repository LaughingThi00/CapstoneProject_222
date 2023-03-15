import React from 'react';
import '../css/detail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DetailProduct from '../components/DetailProduct';
import styled from 'styled-components';

const ProductContent = styled.div`
  background-color: rgba(244, 244, 244, 1);
  padding: 20px 20px;
  display: flex;
`;

function Detail() {
  return (
    <>
    <Header />
    <ProductContent>
      <DetailProduct />
    </ProductContent>
    <Footer />
    </>
  )
}

export default Detail