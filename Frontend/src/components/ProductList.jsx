import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  width: 80%;
  padding: 20px 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const ProductList = ({ cat, filters, sort }) => {
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
           "https://localhost:7080/api/Products/" + cat
        );
        console.log(cat);
        setApiProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [cat]);

  console.log(apiProducts);

  return (
    <Container>
      {apiProducts.map((item) => (
        <ProductContainer key={item._id}>
          <ProductImage src={item.image} alt={item.name} />
          <ProductName>{item.name}</ProductName>
          <ProductPrice>{item.price}</ProductPrice>
        </ProductContainer>
      ))}
    </Container>
  );
};

const ProductContainer = styled.div`
  width: 200px;
  margin: 10px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ProductName = styled.h3`
  margin: 10px 0;
  font-size: 13px;
`;

const ProductPrice = styled.p``;

export default ProductList;
