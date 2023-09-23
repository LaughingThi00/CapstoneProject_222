import React, { useState } from 'react'
import styled from 'styled-components'
import SearchWarranty from './SearchWarranty'
import NeedWarranty from './NeedWarranty'

const Main = styled.div`
    padding-bottom: 200px;
`

const Chapter = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin: 100px 0;
    z-index: 1;
`

const ChapterLine = styled.div`
    position: absolute;
    border: #b4b4b4 solid 1px;
    width: 100%;
    top: 20px;
`

const ChapterName = styled.div`
    position: absolute;
    z-index: 1;
    height: 50px;
    background-color: #fff;
    border: #b4b4b4 solid 1px;
    text-align: center;
    font-size: 22px;
    font-weight: 900;
    padding: 5px;
`
const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const ServiceItem = styled.div`
    border: #000 solid 2px;
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(174, 171, 171, 0.5);
    width: 23%;
    text-align: center;
    cursor: pointer;
`

const TiImage = styled.img`
    border-radius: 10px;
    max-width: 100%;
    height: auto;
    padding-top: 40px;
`

const TiName = styled.div`
    padding: 20px;
    font-weight: 700;
    font-size:20px;
`

function Service () {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }

  const [needModal, setNeedModal] = useState(false)
  const toggleNeedModal = () => {
    setNeedModal(!needModal)
  }

  return (
    <>
      <NeedWarranty open={needModal} onClose={() => setNeedModal(false)} />
      <SearchWarranty open={modal} onClose={() => setModal(false)} />
      <Main>

        <Chapter>
          <ChapterLine />
          <ChapterName>Dịch vụ bảo hành</ChapterName>
        </Chapter>

        <Container>
          <ServiceItem onClick={toggleModal}>
            <TiImage src={require('../img/service/search.png')} />
            <TiName>Tra cứu bảo hành</TiName>
          </ServiceItem>

          <ServiceItem onClick={toggleNeedModal}>
            <TiImage src={require('../img/service/reason03.png')} />
            <TiName>Yêu cầu bảo hành, sữa chữa</TiName>
          </ServiceItem>

          <ServiceItem>
            <TiImage src={require('../img/service/zalo.png')} onClick={() => window.location.replace('https://zalo.me/84921430237')} />
            <TiName>Hướng dẫn siêu tốc</TiName>
          </ServiceItem>
        </Container>
      </Main>
    </>
  )
}

export default Service
