import { styled } from "styled-components";

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 30;
`;

export const Background2 = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 30;
`;

export const Container = styled.div`
  width: 50%;
  height: 83%;
  max-width: 600px;
  position: fixed;
  top: 5%;
  left: 20%;
  background-color: white;
  z-index: 35;
  padding: 7%;
  padding-top: 0;
  padding-bottom: 40px;
  border-radius:15px;
  @media screen and (min-width: 1000px) {
    padding: 85px;
    padding-top: 0;
  padding-bottom: 40px;
  }
  @media screen and (max-width: 500px) {
    overflow-y: scroll;
    overflow-x: hidden;
    width: 80%;
  height: fit-content;
  max-height: 85%;
  padding: 10px;
  padding-right: 15px;
  left: 7%;
  }
`;

export const Post = styled.div`
    overflow-y: scroll;
     height: 100%;
     width: 102%;
     padding-right: 12%;
     margin-top: 10px;
`;

export const Close = styled.button`
position: absolute;
right: 30px;
top: 20px;
border: none;
background-color: transparent;
font-family: 'Anton';
font-size: 18px;
cursor: pointer;
`;

export const OptionsBox = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  width: 50%;
  left: 25%;
  top: 100px;
  z-index: 40;
  button{
    font-size:14px;
    cursor:pointer;
    padding: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #d3d3d3
  }
  button:first-child{
    color: red;
    font-weight:bold;
  }
  button:last-child{
    border-bottom: none;
  }
  @media screen and (max-width: 500px) {
    width: 80%;
    left: 10%;
  }
  @media screen and (max-width: 900px) {
    width: 50%;
    left: 15%;
  }
`;

export const OptionsBox2 = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  background-color: white;
  border-radius: 15px;
  width: 30%;
  left: 35%;
  top: 200px;
  z-index: 40;
  button{
    font-size:14px;
    cursor:pointer;
    padding: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #d3d3d3
  }
  button:first-child{
    color: red;
    font-weight:bold;
  }
  button:last-child{
    border-bottom: none;
  }
  @media screen and (max-width: 500px) {
    width: 70%;
    left: 15%;
  }
  @media screen and (max-width: 900px) {
    width: 40%;
    left: 30%;
  }
`;

export const Icon = styled.div`
  position: absolute;
  right: 13%;
  top: 60px;
  scale: 1.5;
  color: grey;
  cursor:pointer;
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  width:100%;
`;

export const CommentTitle = styled.h2`
  font-size: 50px;
  text-transform: uppercase;
  margin: 0;
  
`;

export const CommentContent = styled.p`
  font-size: 16px;
  color: grey;
  font-family: Arial, Helvetica, sans-serif;
`;

export const CommentUser = styled.p`
font-size: 12px;
color: #6F6F6F;
font-weight: 400;
font-family: Arial, Helvetica, sans-serif;
`;

export const CommentButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const CommentButton = styled.button`
background-color: transparent;
border:none;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CommentCount = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 5px;
`;

export const LikeDislike = styled.div`
border:none;
  display: flex;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  align-items: center;
  .liked {
  color: red; 
}
.notliked {
  color: #9c9c9c;
}
.likedComment {
  color: red; 
}
.notlikedComment {
  color: black;
}
  button{
    border: none;
    cursor: pointer;
background-color: transparent;
  }
`;

export const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const DeleteMessage = styled.div`
  z-index: 40;
  position: fixed; 
  top: 40%;
  left: 45vw;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
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
  @media screen and (max-width: 500px) {
    width: 90%;
    min-height: 3rem;
    margin-top: 10px;
  }
`;

export const Line = styled.div`
border: none;
margin: 10% 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%), #ACACAC;
    @media screen and (min-width: 760px) {
      margin: 20px 0;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
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
  @media screen and (max-width: 500px) {
    width: 40vw;
  }
`;

export const SolidButton2 = styled.button`
  background: gray;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 10vw;
  padding: 5px;
  border-radius: 27px;
  font-size: 16px;
  margin: 10px 19vw;
  @media screen and (max-width: 500px) {
    width: 40vw;
    margin: 10px 21vw;
  }
`;

export const ContainerEdit = styled.div`
  background-color: white;
  color: black;
  width: 40%;
  height: fit-content;
  position: fixed;
  top: 15%;
  left: 30%;
  z-index: 40;
  padding: 20px;
  border-radius: 15px;
`;

export const Title = styled.h2`
  font-size: 35px;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 40px;
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

export const Close2 = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 20px;
  top: 25px;
  font-size: 25px;
  cursor: pointer;
  font-weight: bold;
`;