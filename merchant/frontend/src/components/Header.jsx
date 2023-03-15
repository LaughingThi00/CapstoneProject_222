import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import call from '../icon-font/call-outline.svg';
import cart from '../icon-font/cart-outline.svg';
import search from '../icon-font/search-outline.svg';
import { useState } from 'react';

const LinkItem = styled(Link)`
    color:black;
    text-decoration:none;
`;

function Header() {
    const [item,setItem]=useState(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).length : 0);

    window.addEventListener('storage', () => {
setItem(JSON.parse(localStorage.getItem('cart')).length)    })    

  return (
    <div className="header">
        <div className="header-logo">
        <Link to='/'>
            <div className="header-logo-img button-hover">
                <img src="../img/icon.png" alt="" />
            </div>
        </Link>
        <LinkItem to='/'>
            <div className="header-logo-text button-hover">BK ROBOTIC</div>
        </LinkItem>    
        </div>
        <ul className="header-slider">
            <LinkItem to='/'>
                <li className={window.location.pathname==='/'? "header-slider-item tab-header-now":"header-slider-item"  }>Trang chủ</li>   
            </LinkItem>

            <LinkItem to='/product'>    
                <li className={window.location.pathname==='/product'? "header-slider-item tab-header-now":"header-slider-item"  }>Sản phẩm</li>
            </LinkItem>

            <LinkItem to='/showroom'>
                <li className={window.location.pathname==='/showroom'? "header-slider-item tab-header-now":"header-slider-item"  }>Show room</li>
            </LinkItem>

            <LinkItem to='/news'>
            <li className={window.location.pathname==='/news'? "header-slider-item tab-header-now":"header-slider-item"  }>Tin tức</li>
            </LinkItem>

            <LinkItem to='/warranty'>
            <li className={window.location.pathname==='/warranty'? "header-slider-item tab-header-now":"header-slider-item"  }>Bảo hành</li>
            </LinkItem>
            <LinkItem to='/policy'>
            <li  className={window.location.pathname==='/policy'? "header-slider-item tab-header-now":"header-slider-item"  }>Chính sách</li>
            </LinkItem>
            
        </ul>
        <div className="header-icon">
            <img src={call} className="header-icon-item button-hover" name="call-outline" alt=""></img>
            <Link to="/cart" className='relative-div'>
            <img src={cart} className={item === 0 ? "header-icon-item button-hover":"header-icon-item button-hover cart-something"} name="cart-outline" alt=""></img>
            <div className="cart-num">{item}</div>
            </Link>
            <i className="fa-solid fa-user"></i>

            <img src={search} className="header-icon-item button-hover" name="search-outline" alt=""></img>
        </div>
    </div>
  )
}

export default Header