import { styled } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ededed;
  color: #373737;
  width: 100vw;
    height: 100%;
    position: absolute;
    right: 0;
`;

export const Title = styled.h1`
  font-size: 15vw;
  font-weight: 700;
  text-transform: uppercase;
  color: black;
  margin: 0;
  margin-top: -3vw;
`;

export const Subtitle1 = styled.p`
  font-size: 16px;
  font-weight: 300;
  button{
    background-color: transparent;
    border: none;
    font-family: Anton;
    font-size: 16px;
    color: blue;
    cursor: pointer;
  }
  :hover{
    text-decoration: underline;
  }
`;

export const Subtitle2 = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: gray;

  margin-top: -2vw;
  
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  @media screen and (max-width: 600px) {
    top: 20%;
  }
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 70%;
  span{
    position: relative;
    right: 30px;
    color: gray;
    scale: 1.1;
  }
  @media screen and (max-width: 450px) {
    span{
    position: relative;
    top: -45px;
    left: 100%;
  }
  }
`;

export const Input = styled.input`
  width: 250px;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 30px;
  border: 1px solid #D5D8DE;
  @media screen and (max-width: 450px) {
    width: 110%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SolidButton = styled.button`
  background: #5f62f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 250px;
  height: 51px;
  border-radius: 27px;
  font-size: 16px;
  margin-left: -20px;
`;

export const Icon = styled.span`
    position: relative;
    color: #ababab;
    scale: 1.2;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: start;
  margin-bottom: 20%;
  @media screen and (min-width: 760px) {
    margin-bottom: 20px;
  }
`;