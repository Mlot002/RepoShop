import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import { FavoriteBorder } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  min-height: 200px;
`;
const ImageContainer = styled.div`
  flex: 7;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Image = styled.img`
  width: 48%;
  padding: 1%;
`;
const InfoContainer = styled.div`
  padding: 10px;
  flex: 3;
  margin-right: 30px;
`;
const InfoContainer2 = styled.div`
  position: sticky;
  top: 10px;
`;
const Title = styled.div`
  font-size: 35px;
  font-family: "Inconsolata", monospace;
  font-weight: 500;
  letter-spacing: 1px;
`;
const Price = styled.div`
  margin-top: 10px;
  font-size: 25px;
  font-family: "Inconsolata", monospace;
  font-weight: 600;
`;
const Sizes = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
`;
const Size = styled.li`
  font-weight: 400;
  font-size: 20px;
  margin: 20px 5px 20px 0px;
  padding: 0 10px;
  min-width: 35px;
  min-height: 35px;
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  &:hover,
  :active {
    background-color: black;
    border: 1px solid black;
    color: white;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
`;
const CartButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  font-family: "Lora", sans-serif;
  flex: 5;
  margin-right: 15px;
  height: 40px;
  border: 3px solid #b9a471;
  background-color: transparent;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: #b9a471;
    color: white;
  }
`;
const WishButton = styled.button`
  background-color: transparent;
  border: 3px solid #b9a471;
  flex: 1;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background-color: #b9a471;
    color: white;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const quantity = 1;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/" + id);
        setProduct(res.data.data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };
  return (
    <Container>
      <Navbar />
      <Categories />
      <Wrapper>
        <ImageContainer>
          {product.img?.map((i) => (
            <Image key={i} src={i} />
          ))}
        </ImageContainer>
        <InfoContainer>
          <InfoContainer2>
            <Title>{product.name?.toUpperCase()}</Title>
            <Price>{product.price} zł</Price>
            <ButtonsContainer>
              <CartButton onClick={handleClick}>DODAJ DO KOSZYKA</CartButton>
              <WishButton>
                <FavoriteBorder />
              </WishButton>
            </ButtonsContainer>
          </InfoContainer2>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
