import React, { useState } from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
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
const SearchInput = styled.input`
  font-size: 15px;
  padding: 10px;
  margin-right: 20px;
`;

const Products = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Categories />
      <Title>{cat?.toUpperCase()}</Title>
      <SearchInput
        type="text"
        placeholder="Szukaj"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Select onChange={(e) => setSort(e.target.value)}>
      <Option value="default">Sortowanie domyślne</Option>
        <Option value="lowest">Cena (od najniższej)</Option>
        <Option value="highest">Cena (od najwyższej)</Option>
      </Select>
      <ProductList cat={cat} filters={{ ...filters, search: searchQuery }} sort={sort} />
    </Container>
  );
};

export default Products;