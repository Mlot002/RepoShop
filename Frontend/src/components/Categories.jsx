import React from "react";
import styled from "styled-components";
import Category from "./CategoryItem";
import { categories } from "../data";

const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <Category item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;