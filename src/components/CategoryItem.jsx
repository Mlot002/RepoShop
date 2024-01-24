import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 5px 30px;
  align-items: center;
  justify-content: space-between;
  font-family: "Josefin Sans", sans-serif;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    border-bottom: 1.6px solid;
  }
`;

const linkStyle = {
  textDecoration: "none",
};

const Name = styled.div`
  color: black;
`;

const CategoryItem = ({ item }) => {
  return (
    <Link to={`/products/${item.name.toLowerCase()}`} style={linkStyle}>
      <Container>
        <Name>{item.name}</Name>
      </Container>
    </Link>
  );
};

export default CategoryItem;