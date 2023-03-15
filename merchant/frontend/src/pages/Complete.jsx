import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/policy.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import {apiMessage, homeUrl } from "../constants/Constant";


const Complete = () => {
    

    const handleClick=async ()=>{

        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        const toNum=(str)=>{
            return Number(str.split(' ')[0].replace(/\./g,''))
           }
          let sum=0;
        

        cart.forEach(x=>{
        sum+=toNum(x.product.priceOn)*x.num
        })
          
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'VND',
        
          });
        await axios.post(`${apiMessage}`, {
      phoneTo: "+84389895377",
      bodyMessage:
        `Quý khách đã đặt hàng thành công đơn hàng Robot trị giá ${formatter.format(sum)}. BK ROBOTIC cảm ơn và hẹn gặp lại!`,
    });

    localStorage.setItem("cart",JSON.stringify([]));
    window.dispatchEvent(new Event("storage"));
        window.location.replace(`${homeUrl}`)
    }

  return (
    <>
      <Header />
      <div className="Policy-background">
        <div className="Policy-container" style={{textAlign:"center"}}>
          <img src={require('./../img/success.jpg')} alt='' />
            <h1  style={{textAlign:"center",color:"#009B77",textShadow:"1px 1px"}}>Chúc mừng bạn đã mua hàng thành công. Chúng tôi sẽ gửi tin nhắn xác nhận qua số điện thoại trong giây lát. Mời bạn quay về trang chủ!</h1>
            <Button variant="success" style={{margin:"20px"}} onClick={handleClick}>Xác nhận</Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Complete;
