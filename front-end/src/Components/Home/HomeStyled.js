import { styled } from "styled-components";

export const Container = styled.div`
  height: fit-content;
  padding: 5%;
  background-color: white;
  color: black;
  width: 90%;
  padding-top: 60px;
  @media screen and (min-width: 900px) {
    width: 59.5%;
  }
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CommentItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 12px;
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
margin: 0;
color: #6F6F6F;
font-weight: 400;
font-family: Arial, Helvetica, sans-serif;
display: flex;
button{
  font-family: Anton;
  font-size: 22px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
:hover{
  text-decoration: underline;
  color: gray;
}
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
  scale: 1.5;
`;

export const CommentCount = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 5px;
`;

export const NewCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const White = styled.div`
  width: 100%;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    z-index: 20;
`;

export const PostMenu = styled.div`
  display: flex;
  width: 80%;
  border-bottom: 2px solid gray;
  position: fixed;
  z-index: 20;
  
  button{
    border: none;
    background-color: transparent;
    color: gray;
    font-size: 18px;
    font-family: 'Anton';
    width: 45%;
    margin-top: -60px; 
    cursor: pointer;
    z-index:20;
  }
  .clicked{    
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    div{
      background-color: #0091ff;
      width: 75px;
      height: 6px;
      border-radius: 5px;
      margin-bottom: -1px;
    }
  }
  :hover{
    background-color: #dcdcdc;
  }
  @media screen and (min-width: 900px) {
    width: 60%;
  }
`;

export const LikeDislike = styled.div`
  display: flex;
  padding: 5px 10px;
  scale: 1.5;
  button{
    cursor: pointer;
    border: none;
background-color: transparent;
  }
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
  color: #9c9c9c;
}
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

export const Line = styled.div`
border: none;
margin: 10% 0;
    width: 100%;
    height: 1px;
    background-color: #b2b2b2;
    @media screen and (min-width: 760px) {
      margin: 20px 0;
  }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  cursor: pointer;
`;

export const Icon = styled.div`
width: 30px;
  position: relative;
  left: 95%;
  top: 0;
  scale: 1.5;
  color: grey;
  cursor: pointer;
`;

export const Follow = styled.div`
  button {
    padding: 10px;
    color: #5f62f1;
    font-size: 18px;
    border: none;
    cursor: pointer;
  }
  :hover {
      text-decoration: underline;
      color: #5f62f1;
    }
`;

export const Loading = styled.div`
  height: 30vh;
  margin-top: 50vh;
  display:flex;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 2.5vw;
  @media screen and (max-width: 500px) {
    font-size: 20px;
    margin-top: 40vh;
  }
`;

export const Loading2 = styled.div`
  height: 1vh;
  display:flex;
  align-items: center;
  justify-content: center;
  color: gray;
  font-size: 2vw;
  position: fixed;
  bottom: 80px;
  z-index: 55;
  width:60%;
  @media screen and (max-width: 900px) {
    font-size: 20px;
    width:90%;
  }
`;