import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import useForms from "../../hooks/useForms";
import { useNavigate } from "react-router-dom";
import { goToHome, goToLoginPage } from "../../router/Coordinator"
import { Container, Title, SingUp, Form, Text, Icon, Subtitle1, Subtitle2, InputContainer, Input, SolidButton, ButtonContainer } from "./SignUpPageStyled"
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const { form, onChange } = useForms({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const body = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      const res = await axios.post(`${BASE_URL}/users/signup`, body);
      localStorage.setItem("token", res.data.token);
      goToHome(navigate);
      getUserId(res.data.token);
    } catch (error) {
      alert(error?.response?.data);
      console.error(error?.response?.data);
    } finally {
      setIsLoading(false);
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
      <SingUp>
        <Text>WE BELIEVE IN THE POWER OF SHARING YOUR FAVORITE MUSIC VIDEOS AND CREATING AN ONLINE COMMUNITY</Text>
        <Subtitle2>Don't have an acount yet? Sign up and have access to all the features</Subtitle2>
      </SingUp>
      <Container>
        <Title>Music hits</Title>
        <Subtitle2>Welcome! Sign up to continue</Subtitle2>

        <form onSubmit={signUp}>
          <Form >
            <InputContainer>
              <label>Name</label>
              <Input placeholder="Anne Carry"
                id="name"
                name="name"
                type="name"
                required
                value={form.name}
                onChange={onChange}
              />
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

            <ButtonContainer>
              <SolidButton>Create an acount</SolidButton>
            </ButtonContainer>
          </Form>
        </form>
        <Subtitle1>Already have an acount? Click here to
          <button onClick={() => goToLoginPage(navigate)}>
            Login
          </button>
        </Subtitle1>
        {isLoading && <div>Loading...Please wait</div>}
      </Container>
    </>
  )
}