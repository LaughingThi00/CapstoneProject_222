import React, { useState } from 'react'
import styled from 'styled-components'
import InfoWarranty from './InfoWarranty'

const Content = styled.div`
  position: relative;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  z-index: 2;
  background-color: blue;
`

const WarrantyForm = styled.div`
  position: relative;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin: 0 auto;
  width: 30%;
`

const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  padding: 14.56px 21.84px 5.46px;
  gap: 22px;
  width: 30%;
  background-color: #ffffff;
  border-radius: 15px;
  border: 2px solid black;
`

const Title = styled.div`
  text-align: center;
  flex: none;
  align-self: stretch;
`

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: #ccc solid 1px;
  input {
    box-sizing: border-box;
    align-items: flex-start;
    width: 100%;
    height: 50px;
    background: #ffffff;
    padding-left: 10px;
    border: 2px solid rgba(36, 89, 173, 1);
    border-radius: 10px;
    &:focus {
      outline: none;
    }
  }
`

const Label = styled.label`
  align-items: center;
  padding: 0px;
  gap: 4.85px;
  width: 402.32px;
  height: 21px;
`

const Span = styled.span`
  color: red;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  gap: 10px;
  width: 100px;
  height: 40px;
  background: #307fe2;
  border-radius: 8px;
  border: none;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: rgba(255, 255, 255, 1);
  margin: 0 auto;
  cursor: pointer;
`

const CloseButton = styled.button`
  margin-left: auto;
  text-align: center;
  padding: 3px 10px 4px 10px;
  background: #ccc;
  border: none;
  border-radius: 4px;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
`

function SearchWarranty ({ open, onClose }) {
  const [InfoModal, setInfoModal] = useState(false)
  // const toggleInfoModal = () => {
  //   setInfoModal(!InfoModal);
  // };

  const handleSearch = () => {
    onClose()
    setInfoModal(true)
  }

  if (!open) return InfoModal && <InfoWarranty open={InfoModal} onClose={() => setInfoModal(false)} />

  else {
    return (
      <>

        <Content shouldCloseOnOverlayClick={false}>
          <WarrantyForm>
            <FormInner>
              <CloseButton onClick={onClose}>X</CloseButton>
              <Title>TRA CỨU THÔNG TIN BẢO HÀNH</Title>
              <InputForm>
                <Label>
               Nhập số Serial sản phẩm<Span> *</Span>
             </Label>
                <input type='text' name='phone' placeholder='TX-270266' />
              </InputForm>
              <Button onClick={handleSearch}>Tra cứu</Button>
            </FormInner>
          </WarrantyForm>
        </Content>
      </>
    )
  }
}

export default SearchWarranty
