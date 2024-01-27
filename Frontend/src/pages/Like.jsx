import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
const Title = styled.h1`
  font-weight: 400;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  color: ${(props) => props.type === "filled" && "white"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: flex-start; 
  gap: 20px; 
  padding: 20px;
`;

const ProductContainer = styled(Link)`
  width: 200px; 
  margin: 10px;
  padding: 10px;
  text-decoration: none;
  color: inherit;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductDetails = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  padding: 5px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

const Like = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const fetchFavoriteProducts = async () => {
    try {
      const favoritesResponse = await axios.get(`http://localhost:3001/api/favorites?userId=${userId}`);
      const favorites = favoritesResponse.data.favorites;

      const favoritesWithDetails = await Promise.all(favorites.map(async (favorite) => {
        const productsResponse = await axios.get(`https://localhost:7080/api/products/${favorite.category}`);
        const productDetails = productsResponse.data.find(product => product.id.toString() === favorite.product_id.toString());

        return productDetails
          ? { ...favorite, name: productDetails.name, image: productDetails.image }
          : favorite;
      }));

      setFavoriteProducts(favoritesWithDetails);
    } catch (error) {
      console.error("Error fetching favorite products: ", error);
      setFavoriteProducts([]);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavoriteProducts();
    }
  }, [userId]);

  const removeProductFromWishlist = async (productId, favoriteId, userId) => {
    try {
      console.log(`Removing favoriteId: ${favoriteId}, userId: ${userId}`);
  
      const response = await axios.delete('http://localhost:3001/api/remove-favorite', {
        data: {
          favoriteId: favoriteId,
          userId: userId
        }
      });
  
      console.log(response.data);
  
      await fetchFavoriteProducts();
  
      setFavoriteProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error("Error removing product from wishlist: ", error);
    }
  };
  
  

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Lista ulubionych!</Title>
        <Top>
          <Link to={"/"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
        </Top>
        <Info>
          {favoriteProducts.length === 0 && (
            <div>No favorite products found.</div>
          )}
          {favoriteProducts.map((favorite, index) => (
            <ProductWrapper key={index}>
              <ProductContainer to={`/product/${favorite.category}/${favorite.product_id}`}>
                <ProductImage src={favorite.image} alt={favorite.name} />
                <ProductDetails>
                  <ProductName>{favorite.name}</ProductName>
                </ProductDetails>
              </ProductContainer>
              <RemoveButton onClick={() => removeProductFromWishlist(favorite.product_id, favorite.favorite_id, userId)}>
  Remove from wishlist
</RemoveButton>
            </ProductWrapper>
          ))}
        </Info>


      </Wrapper>
    </Container>
  );
};

export default Like;