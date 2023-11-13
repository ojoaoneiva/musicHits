import { styled } from "styled-components";

export const Container = styled.section`
  width: 22vw;
  height: 100%;
  position: absolute;
  left: 0;
  border-right: 1px solid gray;
  padding: 13px;
  padding-right:0;
  @media screen and (max-width: 900px) {
    width: 73vw;
  }
  @media screen and (max-width: 500px) {
    width: 70vw;
  }
  h1{
    text-transform: uppercase;
    font-weight: normal;
    @media screen and (max-width: 900px) {  
      margin-left: 7vw;
      font-size: 26px;
    }
    @media screen and (max-width: 500px) {
      margin-left: 4vw;
    }
  }
`;

export const Ul = styled.ul`
  padding-top: 10px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  overflow-y: scroll;
`;

export const Li = styled.li`
  margin-left: -3.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3px;
  width: 119%;  
  font-size : 1.1vw;
  flex-wrap: wrap;
  border-bottom: 1px solid #b0b0b0;
  padding-top: 20px;
  padding-bottom: 20px;
  @media screen and (max-width: 900px) {
    font-size : 2.5vw;
    width: 90%;  
    padding-top: 3vw;
    padding-bottom: 3vw;
    margin:0;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    font-size : 16px;
    padding-top: 6vw;
    padding-bottom: 6vw;
    margin-left: -7vw;
  }
  div{
    :hover{
      color: #0000ff88;
      text-decoration: underline;
    }
  }
`;

export const User = styled.button`
background-color: transparent;
border: none;
font-size : 1.1vw;
font-family: Anton;
color: blue;
text-transform: capitalize;
cursor: pointer;
@media screen and (max-width: 900px) {
  font-size : 2.5vw;
  }
@media screen and (max-width: 500px) {
  font-size : 16px;
  }
`;