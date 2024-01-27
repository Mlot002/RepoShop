import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import { FavoriteBorder } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import AuthContext from "../AuthContext";

const PricesSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
`;

const ImageLink = styled.a`
  display: block;
  margin-bottom: 10px;
`;

const PriceDetail = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const StorePrice = styled.span`
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;

const StoreName = styled.span`
  font-weight: 600;
  color: #555;
`;

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

const ButtonsContainer = styled.div`
  display: flex;
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
  const { category, id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7080/api/Products/${category}`
        );
        const foundProduct = res.data.find((p) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProduct();
  }, [category, id]);

  const handleClick = async () => {
    try {
      const userId = user.id; // Użyj bezpośrednio id zalogowanego użytkownika
      console.log("user id: " + user.id)
      const productId = id;
      console.log("product id: " + id)
      const selectedCategory = category; // Zmiana nazwy zmiennej na coś innego niż "category"
      console.log("kategoria: " + selectedCategory)
  
      const res = await axios.post(
        "http://localhost:3001/api/favorites",
        {
          userId,
          productId,
          category: selectedCategory, // Użycie zmienionej nazwy zmiennej
        }
      );
  
      if (res.status === 200) {
        console.log("Favorite added successfully");
      } else {
        console.error("Failed to add favorite");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <Container>
      <Navbar />
      <Categories />
      <Wrapper>
        <ImageContainer>
          {product.image && <Image src={product.image} alt={product.name} />}
          {product.image && <Image src={product.image} alt={product.name} />}
        </ImageContainer>
        <InfoContainer>
          <InfoContainer2>
            <Title>{product.name?.toUpperCase()}</Title>
            <Description>{product.description}</Description>
            <ButtonsContainer>
              <WishButton onClick={handleClick}>
                <FavoriteBorder />
              </WishButton>
            </ButtonsContainer>
            <PricesSection>
              <PriceDetail>
                Cena w x-kom: <StorePrice>{product.price}</StorePrice>
              </PriceDetail>
              <PriceDetail>
                Cena w MediaMarkt: <StorePrice>{product.priceMorele}</StorePrice>
              </PriceDetail>
            </PricesSection>
          </InfoContainer2>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default Product;
