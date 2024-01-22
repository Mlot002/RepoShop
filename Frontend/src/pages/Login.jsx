import { useRef } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import Cookies from "universal-cookie";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://ro.com.pl/wp-content/uploads/2017/02/programowanie-i-kodowanie.jpg")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;

  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  width: fit-content;
`;
const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const cookies = new Cookies();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("users/login", {
        email: email.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", res.data.token);
      console.log("Logged IN");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Zaloguj się</Title>
        <Form onSubmit={handleSubmit}>
          <Input ref={email} placeholder="Email"></Input>
          <Input type="password" ref={password} placeholder="Password"></Input>
          <Button type="submit">Zaloguj</Button>
          <Link>Zapomniałeś hasła?</Link>
          <Link href={"/register"}>Utwórz konto</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
