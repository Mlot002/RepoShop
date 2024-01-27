import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom"; 
import { publicRequest } from "../requestMethods";
import { useContext } from "react";
import AuthContext from '../AuthContext';

const Container = styled.div`
  height: auto;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ width: "50px" })}
`;

const Input = styled.input`
  border: none;
  width: 90%;
  /* ${mobile({ width: "30px" })} */
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  font-size: 60px;
  font-weight: bold;
  font-family: "Roboto";
  ${mobile({ fontSize: "24px" })}
  color: black;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  color: black;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  &:hover {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const linkStyle = {
  textDecoration: "none",
};

const Navbar = () => {
  const { isLoggedIn, user, login, logout } = useContext(AuthContext);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("user:", user);
  console.log()

  const [data, setData] = useState();
  useEffect(() => {
    const myFetch = async () => {
      const res = await publicRequest.get("/like");
      setData(res.data.data.items.length);
    };
    myFetch();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>{/* ... */}</Left>
        <Center>
          <Link to={"/"} style={linkStyle}>
            <Logo>BestSalesHub</Logo>
          </Link>
        </Center>
        <Right>
        {isLoggedIn ? (
  <>
    <Link to={"/like"}>
      <MenuItem>
        <Badge badgeContent={data || 0} color="primary">
          <FavoriteIcon />
        </Badge>
      </MenuItem>
    </Link>
    <Link to ={"/"}>
    <MenuItem onClick={logout} to ={"/"}>
      <ExitToAppIcon />
    </MenuItem>
    </Link>
  </>
) : (
  <>
    <Link to={"/login"}>
      <MenuItem>ZALOGUJ SIĘ</MenuItem>
    </Link>
    <Link to={"/register"}>
      <MenuItem>ZAREJESTRUJ SIĘ</MenuItem>
    </Link>
  </>
)}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;