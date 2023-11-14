import React, { useEffect, useState } from "react";
import { Container, User, Ul, Li } from "./NotificationsStyled";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import YouTubeVideo3 from "../YouTubeVideo/YouTubeVideo3";
import useProtectedPage from "../../hooks/useProtectedPage";
import { goToProfile } from "../../router/Coordinator";
import { useNavigate } from "react-router-dom";

export const Notifications = ({setNotificationsOpen, closeAll,toggleMenu, notificationsOpen}) => {
  const [allNotifications, setAllNotifications] = useState([]);
  const [finalNotifications, setfinalNotifications] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  const navigate = useNavigate();
  useProtectedPage();

  useEffect(() => {
    if (userId) {
      getPosts(userId);
      getFollowers(userId);

    }
  }, []);

  useEffect(() => {
    const uniqueNotifications = [];
    const seenUserIds = new Set();
    const seenUserPostPairs = new Set();

    for (const notification of allNotifications) {
      if (notification.userIdFollowing) {
        if (!seenUserIds.has(notification.userIdFollower)) {
          seenUserIds.add(notification.userIdFollower);
          uniqueNotifications.push(notification);
        }
      } else if (
        notification.post_id &&
        notification.user_id &&
        notification.user_id !== localStorage.getItem("userId")
      ) {
        const key = `${notification.post_id}-${notification.user_id}`;
        if (!seenUserPostPairs.has(key)) {
          seenUserPostPairs.add(key);
          uniqueNotifications.push(notification);
        }
      } else {
        uniqueNotifications.push(notification);
      }
    }
    const sortedNotifications = uniqueNotifications.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
    const filteredNotifications = sortedNotifications.filter(
      (notification) => notification.user_id !== localStorage.getItem("userId")
    );
    setfinalNotifications(filteredNotifications);
  }, [allNotifications]);

  const getPosts = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/user/${userId}`, config);
      const postsData = response.data;
      const getLikesPromises = postsData.map((post) => getLikes(post.id))
      await Promise.all(getLikesPromises);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getLikes = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`, config);
      const postsData = response.data;
      if (postsData !== "like doesn't exists yet") {
        postsData.forEach((like) => {
          if (!allNotifications.some((notification) => notification.id === like.id)) {
            setAllNotifications((prevNotifications) => [...prevNotifications, like]);
          }
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getFollowers = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/followers/${id}`, config);
      const followersData = response.data
      setAllNotifications((prevNotifications) => [...prevNotifications, ...followersData]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const profile = async (id) => {
    goToProfile(navigate, id)
    setNotificationsOpen(!notificationsOpen);
    toggleMenu();
    closeAll()
  };

  return (
    <Container>
      <h1>Notifications</h1>
      <Ul>
        {finalNotifications.map((notification, index) => (
          <Li key={index}>
            {notification.userIdFollowing ? (
              <div>
                <User onClick={()=>profile(notification.userIdFollower)}>
                  {notification.name}
                </User>
                just followed you</div>
            ) : (
              <>
                <div>
                  <User onClick={()=>profile(notification.user_id)}>
                    {notification.name}
                  </User> liked your post:
                </div>
                <div>
                  <YouTubeVideo3 link={notification.link} />
                </div>
              </>
            )}
          </Li>

        ))}
      </Ul>
    </Container>
  );
}