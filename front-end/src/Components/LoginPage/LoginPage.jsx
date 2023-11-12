import { BASE_URL } from "../../constants/BASE_URL";
import { useNavigate } from "react-router-dom";
import useForms from "../../hooks/useForms";
import { goToHome, goToSignUpPage } from "../../router/Coordinator";
import {
  Container,
  Title,
  Header,
  Subtitle1,
  Subtitle2,
  Input,
  SolidButton,
  Icon,
  ButtonContainer,
  Form,
  InputContainer,
} from "./LoginPageStyled";
import axios from "axios";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const LoginPage = () => {
  const navigate = useNavigate();

  const { form, onChange } = useForms({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendLogin = async (event) => {
    event.preventDefault();
    try {
      const body = {
        email: form.email,
        password: form.password,
      };
      const res = await axios.post(`${BASE_URL}/users/login`, body);
      localStorage.setItem("token", res.data.token);
      getUserId(res.data.token)
      goToHome(navigate);
    } catch (error) {
      alert(error?.response?.data);
      console.error(error?.response?.data);
    }
  };

  const getUserId = async (token) => {
    const config = {
      headers: {
        Authorization: token
      }
    }
    try {
      const response = await axios.get(`${BASE_URL}/users/`, config);
      const usersData = response.data;
      const user = usersData.find(user => user.email === form.email);
      localStorage.setItem("userId", user.id);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Music Hits</Title>
          <Subtitle2>Sign in to continue</Subtitle2>
        </Header>

        <form onSubmit={sendLogin}>
          <Form>
            <InputContainer>
              <label>Email</label>
              <Input
                placeholder="anne.carry@mail.com"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={onChange}
              />
              <label>Password</label>
              <div>
                <Input
                  placeholder="Password123"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={onChange}
                />
                <Icon
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Icon>
              </div>
            </InputContainer>
          </Form>
          <ButtonContainer>
            <SolidButton>Login</SolidButton>
          </ButtonContainer>
        </form>
        <Subtitle1>Already have an account?
          <button onClick={() => goToSignUpPage(navigate)}>
            Creat an account
          </button>
        </Subtitle1>
      </Container>
    </>
  );
};
