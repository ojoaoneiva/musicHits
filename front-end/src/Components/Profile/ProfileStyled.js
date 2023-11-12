import { styled } from "styled-components";

export const Container = styled.section`
  width: 70%;
  height: 95vh;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  @media screen and (max-width: 900px) {
    padding: 10px;
    margin: 10px;
  }
`;

export const UserProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  @media screen and (max-width: 900px) {
    width: 8vw;
  height: 8vw;
  position: relative;
  top: -40px;
  }
`;

export const NoUserProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  @media screen and (max-width: 900px) {
    width: 8vw;
  height: 8vw;
  position: relative;
  top: -40px;
  }
`;

export const UserProfileInfo = styled.div`
  margin-left: 20px;
`;

export const UserProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const UserProfileStats = styled.div`
  display: flex;
  margin-top: 10px;
  :hover{
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }
`;

export const UserProfileStat = styled.button`
  margin-right: 20px;
  display: flex;
  gap: 3px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  div{
    font-weight: 600;
    color: black;
  }
`;

export const UserProfileBio = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

export const UserProfilePosts = styled.div`
width:92%;
padding: 20px;
  display: flex;
  flex-wrap:wrap;
  justify-content: flex-start;
  @media screen and (max-width: 500px) {
  }
`;

export const CommentCount = styled.span`
  font-size: 12px;
  color: #888;
  margin-left: 5px;
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

export const CommentItem = styled.div`
  width: 31%;
  padding: 2px;
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  cursor: pointer;
`;

export const Followers = styled.div`
  width: 30vw;
  max-width: 300px;
  height: 50%;
  top: 20%;
  left: 20%;
  background-color: white;
  position: absolute;
  z-index: 4;
  overflow: hidden;
  border-radius: 15px;
  padding: 20px;
  padding-right: 0;
  @media screen and (max-width: 900px) {
    left: 35%;
  }
  @media screen and (max-width: 500px) {
    width: 60vw;
    left: 17%;
  }
  button{
    background-color: transparent;
    border: none;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const FollowersHeader = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;

export const ScrollContainer = styled.div`
  height: 90%;
  overflow-y: scroll;
  margin-top: 20px;
`;

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
`;

export const Follow = styled.div`
margin-top: -7px;
  button {
    padding: 5px;
    color: white;
    background-color: #5f62f1;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s, box-shadow 0.2s;
  }
  :hover {
      background-color: #8890fa; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
`;

export const Unfollow = styled.div`
margin-top: -7px;
  button {
    padding: 5px;
    color: white;
    background-color: #7a7a7a;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.5s, box-shadow 0.2s;
  }
  :hover {
      background-color: #b2b2b2; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
`;