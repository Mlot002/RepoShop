  import React from 'react';
  import styled from "styled-components";
  import Navbar from "../components/Navbar";
  import ProductList from "../components/ProductList";
  import { useState } from "react";
  import { useLocation } from "react-router-dom";
  import Categories from "../components/Categories";

  const Container = styled.div``;
  const Title = styled.h1`
    margin: 20px;
  `;
  const Select = styled.select`
    font-size: 15px;
    padding: 10px;
    margin-right: 20px;
  `;
  const Option = styled.option`
    font-size: 15px;
  `;
  const Products = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
      const value = e.target.value;
      setFilters({
        ...filters,
        [e.target.name]: value,
      });
    };
    console.log(cat);

    return (
      <Container>
        <Navbar />
        <Categories />
        <Title>{cat?.toUpperCase()}</Title>
        <Select onChange={(e) => setSort(e.target.value)}>
          <Option value="newest">Newest</Option>
          <Option value="asc">Price (asc)</Option>
          <Option value="desc">Price(desc)</Option>
        </Select>
        <ProductList cat={cat} filters={filters} sort={sort} />
      </Container>
    );
  };

  export default Products;
