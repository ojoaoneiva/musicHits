import { styled } from "styled-components";

export const Container = styled.section`
  width: 20vw;
  height: 100%;
  position: absolute;
  left: 0;
  border-right: 1px solid gray;
  padding: 20px;
  @media screen and (max-width: 900px) {
    width: 70vw;
  }
  @media screen and (max-width: 500px) {
    width: 63vw;
  }
  h1{
    text-transform: uppercase;
    font-weight: normal;
    @media screen and (max-width: 900px) {
          font-size: 26px;
  }
  }
  ul{
    list-style: none;
    li{
      
      button{
        cursor: pointer;
        font-family: Anton;
        background-color: transparent;
        border: none;
        font-size: 2vw;
        @media screen and (max-width: 900px) {
          font-size: 26px;
  }
      }
    }
  }
`;

export const Input = styled.input`
padding: 10px;
border-radius: 8px;
border: none;
width: 90%;
font-size: 18px;
`;