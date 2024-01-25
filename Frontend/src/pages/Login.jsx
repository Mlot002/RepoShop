import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

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

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await publicRequest.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      console.log("Logged in successfully");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Invalid email or password"); // Set an appropriate error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Login in!</Title>
        {isLoggedIn ? (
          <p>Welcome, you are already logged in!</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Link>Forget password?</Link>
            <Link href={"/register"}>Register</Link>
            {error && <ErrorText>{error}</ErrorText>}
          </Form>
        )}
      </Wrapper>
    </Container>
  );
};

export default Login;
