import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 80%;
  padding: 20px 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
`;

const ProductContainer = styled(Link)`
  width: 200px;
  margin: 10px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc; /* Dodaj ramkę dla odróżnienia produktów */
  border-radius: 5px; /* Zaokrąglony róg ramki */
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

const ProductList = ({ cat, filters, sort }) => {
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`https://localhost:7080/api/Products/${cat}`);
        setApiProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [cat]);

  const filteredProducts = apiProducts.filter((item) =>
    item.name.trim().toLowerCase().includes(filters.search.trim().toLowerCase())
  );

  const sortedProducts = sortProducts(filteredProducts, sort);

  return (
    <Container>
      {sortedProducts.map((item) => (
        <ProductContainer key={item.id} to={`/product/${cat}/${item.id}`}>
          <ProductImage src={item.image} alt={item.name} />
          <ProductName>{item.name}</ProductName>
          <ProductPrice>{item.price.replace(/\s/g, '')}</ProductPrice>
        </ProductContainer>
      ))}
    </Container>
  );
};

const sortProducts = (products, sort) => {

  switch (sort) {
    case 'lowest':
      return [...products].sort((a, b) => parseFloat(a.price.replace(/\s/g, '')) - parseFloat(b.price.replace(/\s/g, '')));
    case 'highest':
      return [...products].sort((a, b) => parseFloat(b.price.replace(/\s/g, '')) - parseFloat(a.price.replace(/\s/g, '')));
    case 'default':
        return products;
    default:
        return products;
  }
};

export default ProductList;