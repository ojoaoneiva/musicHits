import { Header } from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import React, { useEffect, useState } from "react";
import { 
  UserProfileContainer, 
  UserProfilePicture, 
  NoUserProfilePicture, 
  UserProfileInfo,
  UserProfileName, 
  UserProfileStats, 
  UserProfileStat, 
  UserProfileBio, 
  UserProfilePosts, 
  Container, 
  Background, 
  FollowersHeader,
  CommentItem, 
  VideoContainer, 
  Followers, 
  ScrollContainer, 
  Follow, 
  Unfollow 
} from "./ProfileStyled";
import YouTubeVideo2 from "../YouTubeVideo/YouTubeVideo2";
import { useParams } from 'react-router-dom';
import { Settings } from "../Settings/Settings";
import useProtectedPage from "../../hooks/useProtectedPage";

export const Profile = () => {
  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const { userId } = useParams();
  const [postLikes, setPostLikes] = useState({});

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  useProtectedPage();

  useEffect(() => {
    if (userId) {
      getPosts(userId);
      getUserById(userId)
      getFollowers(userId)
      getFollowing(userId)
      checkIfAlreadyFollowing(userId);
    }
  }, [userId]);

  useEffect(() => {
    const list = followers.map(user => user.name);
    setFollowersList(list);
  }, [followers]);

  useEffect(() => {
    const list = following.map(user => user.name);
    setFollowingList(list);
  }, [following]);

  const getPosts = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/user/${id}`, config);
      const postsData = response.data;

      postsData.sort((postA, postB) => {
        const dateA = new Date(postA.createdAt);
        const dateB = new Date(postB.createdAt);
        return dateB - dateA;
      });

      const likes = {};
      setPostLikes(likes);
      setPosts(postsData);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    posts.forEach((post) => {
      const previousLikes = postLikes[post.id];
    });

    const updatedLikes = {};
    posts.forEach((post) => {
      updatedLikes[post.id] = post.likes;
    });
    setPostLikes(updatedLikes);
  }, [posts]);

  const getFollowers = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/followers/${id}`, config);
      setFollowers(response.data);
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const getFollowing = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/following/${id}`, config);
      setFollowing(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const followOrUnfollow = async (id) => {
    setAlreadyFollowing(!alreadyFollowing);

    try {
      await axios.post(`${BASE_URL}/users/${id}`, {}, config);
      getFollowers(userId);
      getFollowing(userId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkIfAlreadyFollowing = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/followers/${id}`, config);
      const isFollowing = response.data.some(user => user.userIdFollower === localStorage.getItem("userId"));
      setAlreadyFollowing(isFollowing);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`, config);
      const usersData = response.data;
      setUser(usersData[0]);

    } catch (error) {
      console.log(error.response);
    }
  };

  const followersListOpen = () => {
    setFollowersOpen(!followersOpen)
  }

  const followingListOpen = () => {
    setFollowingOpen(!followingOpen)
  }

  const [postOpen, setPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const changeScreen = (post) => {
    setSelectedPost(post);
    setPostOpen(!postOpen);
  };

  const update = () => {
    getUserById(userId)
  };

  const renderPostDetail = (post) => {
    setSelectedPost(post);
    setPostOpen(!postOpen);
  };

  return (
    <>
      <Header />
      <Container>
        <UserProfileContainer>
          {user && user.profilePhoto ? (
            <UserProfilePicture src={user.profilePhoto} alt={user.name} />
          ) : (
            <NoUserProfilePicture>{user && user.name ? user.name[0] : "No Name"}</NoUserProfilePicture>
          )}

          <UserProfileInfo>
            <UserProfileName>{user && user.name}</UserProfileName>
            <UserProfileStats>
              <UserProfileStat onClick={followersListOpen}> <div>{followers.length}</div> followers </UserProfileStat>
              <UserProfileStat onClick={followingListOpen}> <div>{following.length}</div> following  </UserProfileStat>
              {userId !== localStorage.getItem("userId") && alreadyFollowing && (
                <Unfollow><button onClick={() => followOrUnfollow(userId)}> Unfollow - </button></Unfollow>
              )}
              {userId !== localStorage.getItem("userId") && !alreadyFollowing && (
                <Follow><button onClick={() => followOrUnfollow(userId)}> Follow + </button></Follow>
              )}
              {userId === localStorage.getItem("userId") && (
                <button onClick={() => renderPostDetail(user)}>settings</button>
              )}
            </UserProfileStats>
            <UserProfileBio>{user.bio}</UserProfileBio>
          </UserProfileInfo>

          {postOpen && (
            <Settings
              user={user}
              changeScreen={changeScreen}
              update={update}
            />
          )}
        </UserProfileContainer>

        {followersOpen && (<>
          <Background></Background>
          <Followers>
            <FollowersHeader>
              <h3>Followers:</h3>
              <button onClick={followersListOpen}>X</button>
            </FollowersHeader>
            <ScrollContainer>
              {followersList.map((user) =>
                <p>{user}</p>
              )}
            </ScrollContainer>
          </Followers>
        </>
        )}

        {followingOpen && (<>
          <Background></Background>
          <Followers>
            Following:
            <button onClick={followingListOpen}>X</button>
            <ScrollContainer>
              {followingList.map((user) =>
                <p>{user}</p>
              )}
            </ScrollContainer>
          </Followers>
        </>
        )}
        <UserProfilePosts>
          {posts.map((post) => (
            <CommentItem key={post.id}>
              <VideoContainer>
                <YouTubeVideo2 post={post} />
              </VideoContainer>
            </CommentItem>
          ))}
        </UserProfilePosts>
      </Container>
    </>
  );
};