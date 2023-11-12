import { styled } from "styled-components";

export const Img = styled.img`
  width: 6vw;
  height: 3.5vw;
  border: none;
  @media screen and (max-width: 900px) {
    scale: 2.3;
    margin-left: -10vw;
  }
  @media screen and (max-width: 500px) {
    scale: 2;
    margin-left: -9vw;
  }
`;
