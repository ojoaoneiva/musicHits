import { styled } from "styled-components";

export const Container = styled.div`
  background-color: white;
  color: black;
  width: 40%;
  height: fit-content;
  position: fixed;
  top: 15%;
  left: 20%;
  z-index: 20;
  padding: 20px;
  border-radius: 15px;
  @media screen and (max-width: 900px) {
    width: 60%;
    left: 17%;
  }
  @media screen and (max-width: 500px) {
    width: 75%;
    left: 8%;
  }
`;

export const Close = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 20px;
  top: 25px;
  font-size: 25px;
  cursor: pointer;
  font-weight: bold;
  @media screen and (max-width: 500px) {
    width: 40vw;
    width: 40px;
  }
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);;
  z-index: 2;
`;

export const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewCommentInput = styled.textarea`
  width: 97%;
  resize: none;
  min-height: 6rem;
  padding: 10px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  font-family: 'anton';
  font-size: 16px;
  color: #373737;
  background-color: #f0f0f0;
`;

export const NewTitleInput = styled.textarea`
  width: 97%;
  height: 25px;
  resize: none;
  padding: 10px;
  display: flex;
  align-items: start;
  justify-content: flex-start;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  font-family: 'anton';
  font-size: 16px;
  color: #373737;
  background-color: #f0f0f0;
`;

export const Title = styled.h2`
  font-size: 35px;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 40px;
`;

export const SolidButton = styled.button`
  background: #5f62f1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 20vw;
  height: 51px;
  border-radius: 27px;
  font-size: 16px;
  margin: 10px;
`;
