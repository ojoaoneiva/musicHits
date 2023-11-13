import { styled } from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #373737;
  background-color: #ededed;
  @media screen and (min-width: 750px) {
    width: 50vw;
    position: absolute;
    right: 0;
    background-color: white;
  }
`;

export const Form = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Icon = styled.span`
    color: #ababab;
    scale: 1.2;
    margin-left: -35px;
    margin-top: 15px;
`;

export const SingUp = styled.div`
  display: none; 
  background-color: #ededed;
  width: 50vw;
  height:100%;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  @media screen and (min-width: 750px) {
   display: flex;
  }
`;

export const Title = styled.h1`
 font-size: 10vw;
 text-transform: uppercase;
 color: black;
  font-weight: 700;
  text-align: left;
  margin-bottom: -10px;
  margin-top: -10%;
  @media screen and (min-width: 750px) {
    margin-top: 0;
    font-size: 28px;
  }
`;

export const Text = styled.h1`
  font-size: 6vw;
  text-align: left;
  line-height: 6vw;
  padding-right: 2vw;
margin-left: 20px;
margin-top: 20px;
`;

export const Subtitle1 = styled.p`
  font-size: 16px;
  font-weight: 300;
  padding: 20px;
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
 margin-bottom: 10%;
  padding-left: 20px;
  padding-right: 20px;
  @media screen and (min-width: 750px) {
    margin-bottom: 40px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: start;
  div{
    display: flex;
  }
`;

export const Input = styled.input`
  width: 90vw;
  max-width: 300px;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 10px;
  height: 30px;
  border: 1px solid #D5D8DE;
  @media screen and (min-width: 750px) {
    max-width: 250px;
    width: 20vw;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  color: gray;
  margin-top: -1vw;
`;

export const SolidButton = styled.button`
  background: #5f62f1;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 30px;
  cursor: pointer;
  width: 70vw;
  max-width: 250px;
  height: 51px;
  border-radius: 27px;
  font-size: 16px;
  @media screen and (min-width: 750px) {
    width: 20vw;
  }
`;
