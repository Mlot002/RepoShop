import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import Modal from 'react-modal';

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
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

Modal.setAppElement('#root');

const CustomModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  color: teal;
  margin-bottom: 15px;
`;

const ModalMessage = styled.p`
  color: #333;
`;

const CloseButton = styled.button`
  background-color: teal;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]*$/;
    return nameRegex.test(name);
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        openModal({
          title: "Validation Error",
          message: "Please fill in all fields.",
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        openModal({
          title: "Validation Error",
          message: "Passwords do not match.",
        });
        return;
      }

      if (!isValidEmail(formData.email)) {
        openModal({
          title: "Validation Error",
          message: "Please enter a valid email address.",
        });
        return;
      }

      if (!isValidName(formData.firstName) || !isValidName(formData.lastName)) {
        openModal({
          title: "Validation Error",
          message: "Please enter a valid name with only letters.",
        });
        return;
      }

      const res = await publicRequest.post(
        "http://localhost:3001/api/register",
        formData
      );

      openModal({
        title: "Success",
        message: "User registered successfully.",
      });

      setTimeout(() => {
        window.location.href = "/login"; 
      }, 2000); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;


    if ((name === "firstName" || name === "lastName") && !/^[a-zA-Z]*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">Create</Button>
        </Form>
      </Wrapper>
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={modalContent.title}
      >
        <ModalTitle>{modalContent.title}</ModalTitle>
        <ModalMessage>{modalContent.message}</ModalMessage>
        
      </CustomModal>
    </Container>
  );
};

export default Register;
