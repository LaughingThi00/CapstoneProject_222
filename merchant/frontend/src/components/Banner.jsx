import React from "react";
import { list } from "./../data";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { homeUrl } from "../constants/Constant";
function Banner() {
  const [wordEntered, setWordEntered] = useState("");
  const [Search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleRedirect = () => {
    window.location.replace(`${homeUrl}/detail/${Search}`);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = list.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const SearchResults = styled.div`
    position: absolute;
    width: 92%;
    right: 23px;
    top: 50px;
    z-index: 0;
    max-height: 200px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    overflow-y: auto;
  `;

  const ProductItem = styled(Link)`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: lightgrey;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  `;

  return (
    <div className="banner">
      <div className="banner-search-container" style={{ position: "relative" }}>
        <input
          className="banner-search-input"
          placeholder="Bạn thích sản phẩm robot nào?"
          type="text"
          value={wordEntered}
          onChange={handleFilter}
        />
        {filteredData.length !== 0 && (
          <SearchResults>
            {filteredData.map((item, index) => {
              return (
                <ProductItem
                  key={index}
                  onClick={() => {
                    setWordEntered(item.name);
                    setSearch(item.id);
                    setFilteredData([]);
                  }}
                >
                  <p>{item.name}</p>
                </ProductItem>
              );
            })}
          </SearchResults>
        )}

        <button
          className="banner-search-icon button-hover"
          onClick={handleRedirect}
        >
          <ion-icon className="" name="search-outline" />
        </button>
      </div>

      <div className="banner-text">
        Chúng tôi cung cấp sản phẩm Robot hút bụi uy tín, chất lượng số 1 thị
        trường
      </div>
    </div>
  );
}

export default Banner;
