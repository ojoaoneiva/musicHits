import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { goToProfile } from "../../router/Coordinator";
import { Header } from "../Header/Header";
import { LikeDislike } from "./HomeStyled";
import {
  Container,
  CommentList,
  CommentItem,
  CommentContent,
  CommentButtons,
  CommentButton,
  SolidButton,
  NewCommentContainer,
  NewCommentInput,
  Line,
  Loading,
  Loading2,
  CommentUser,
  VideoContainer,
  CommentTitle,
  Icon,
  Follow,
  White,
  PostMenu,
} from "./HomeStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FaComment from "../../assets/comment.svg";
import useProtectedPage from "../../hooks/useProtectedPage";
import YouTubeVideo from "../YouTubeVideo/YouTubeVideo";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { EditOptions } from "../PostDetailPage/EditOptions";
import { PostDetailPage } from "../PostDetailPage/PostDetailPage";

export const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token,
    },
  };

  useProtectedPage();

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [viewAllUsers, setViewAllUsers] = useState(true);
  const [friendsPosts, setFriendsPosts] = useState([]);
  const [renderedPosts, setRenderedPosts] = useState(new Set());

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/`, config);
      const postsData = response.data;

      const postsWithCommentCount = await Promise.all(
        postsData.map(async (post) => {
          const commentsResponse = await getComments(post.id);
          const likeResponse = await findLike(post.id);
          const isLiked = likeResponse === "like exist" ? true : false;
          const isFollowing = await checkIfAlreadyFollowing(post.creator.id);

          return {
            ...post,
            commentCount: commentsResponse.length,
            liked: isLiked,
            isFollowing: isFollowing,
          };
        })
      );

      setPosts(postsWithCommentCount);

      setFriendsPosts(
        postsWithCommentCount.filter(
          (post) =>
            post.creator.id !== localStorage.getItem("userId") &&
            post.isFollowing === true
        )
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkIfAlreadyFollowing = async (creatorId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/followers/${creatorId}`, config);
      const isFollowing = response.data.some(user => user.userIdFollower === localStorage.getItem("userId"));
      console.log(isFollowing)
      return isFollowing;
    } catch (error) {
      console.log(error.response);
    }
  };

  const followOrUnfollow = async (id) => {
    getPosts();
    try {
      await axios.post(`${BASE_URL}/users/${id}`, {}, config);
    } catch (error) {
      console.log(error.response);
    }
  };

  const findLike = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}/like`, config);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const findCommentLike = async (id) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/comments/${id}/like`,
        config
      );
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const likePost = async (id) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts/${id}/like`, {}, config);

      const likeResponse = await findLike(id);
      const isLiked = likeResponse === "like exist" ? true : false;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, liked: isLiked, likes: response.data.likes } : post
        )

      ); getPosts()
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}`, config);
      const commentsData = response.data;

      const commentsWithLikes = await Promise.all(
        commentsData.map(async (comment) => {
          const likeResponse = await findCommentLike(comment.id);
          const isLiked = likeResponse === "like exist" ? true : false;

          return {
            ...comment,
            liked: isLiked,
          };
        })
      );

      setComments(commentsWithLikes);

      return commentsWithLikes;
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const createComment = async (id) => {
    try {
      const body = {
        content: newComment,
      };
      await axios.post(`${BASE_URL}/comments/${id}`, body, config);
      getComments(id);
      setNewComment("");
    } catch (error) {
      console.log(error.response);
    }
  };

  const likeComment = async (id, postId) => {
    try {
      await axios.post(
        `${BASE_URL}/comments/${id}/like`,
        {},
        config
      );
      getComments(postId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const [postOpen, setPostOpen] = useState(false);
  const [expandedPost, setExpandedPost] = useState(false);
  const changeScreen = () => { setPostOpen(!postOpen) }

  const toggleComments = (post) => {
    setExpandedPost(post.id);
    setPostOpen(!postOpen)
  };

  const [editOpen, setEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const changeEditScreen = (post) => {
    setSelectedPost(post);
    setEditOpen(!editOpen);
  };

  const update = () => {
    getPosts();
  };

  const renderPostDetail = (post) => {
    setSelectedPost(post);
    setEditOpen(!editOpen);
  };
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [finished, setFinished] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5);
  const [scrollThreshold, setScrollThreshold] = useState(400);
  const [debounceDelay, setDebounceDelay] = useState(40);
  const [reachedBottom, setReachedBottom] = useState(false);

  useEffect(() => {
    if (postOpen) {
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'auto';
    }
  }, [postOpen]);
  
  useEffect(() => {
    fetchData(0);
  }, []);

  useEffect(() => {
    const handleScrollDebounced = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - scrollThreshold
      ) {
        if (!reachedBottom && finished === false) {
          setOffset(offset + 5);
          fetchData(offset + 5);
        }
        setReachedBottom(true);
      } else {
        setReachedBottom(false);
      }
    }, debounceDelay);

    window.addEventListener("scroll", handleScrollDebounced);

    return () => {
      window.removeEventListener("scroll", handleScrollDebounced);
    };
  }, [offset, scrollThreshold, debounceDelay, reachedBottom, finished]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const [loadingData, setLoadingData] = useState(true);

  const fetchData = async (offsetValue) => {
    try {
      setLoadingData(true);
      const response = await axios.get(`${BASE_URL}/posts/?offset=${offsetValue}`, config);
      const newPostsData = response.data;

      const postsWithCommentCount = await Promise.all(
        newPostsData.map(async (post) => {
          const commentsResponse = await getComments(post.id);
          const likeResponse = await findLike(post.id);
          const isLiked = likeResponse === "like exist" ? true : false;

          return {
            ...post,
            commentCount: commentsResponse.length,
            liked: isLiked,
          };
        })
      );

      if (postsWithCommentCount.length % 5 !== 0) {
        setFinished(true);
      }

      if (offsetValue === 0) {
        setPosts(postsWithCommentCount);
        setFriendsPosts(
          postsWithCommentCount.filter(
            (post) =>
              post.creator.id !== localStorage.getItem("userId") ||
              post.isFollowing === true
          )
        );
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postsWithCommentCount]);
        setFriendsPosts((prevFriendsPosts) => [
          ...prevFriendsPosts,
          ...postsWithCommentCount.filter(
            (post) =>
              post.creator.id !== localStorage.getItem("userId") &&
              post.isFollowing === true
          ),
        ]);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
      setLoadingData(false);
    }
  };

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 5);
  };

  useEffect(() => {
    const storedViewAllUsers = localStorage.getItem("viewAllUsers");
    if (storedViewAllUsers !== null) {
      setViewAllUsers(storedViewAllUsers === "true");
    }
  }, []);

  const handleForYouClick = () => {
    localStorage.setItem("viewAllUsers", true);
    window.location.reload();
    setViewAllUsers(true);
  };

  const handleFollowingClick = () => {
    localStorage.setItem("viewAllUsers", false);
    window.location.reload();
    setViewAllUsers(false);
  };


  return (
    <>
      <Header />
      <Container>

        <PostMenu>
          <White></White>
          <button onClick={handleForYouClick} className={viewAllUsers ? "clicked" : "notClicked"}>
            <p>For you</p>
            <div></div>
          </button>
          <button onClick={handleFollowingClick} className={!viewAllUsers ? "clicked" : "notClicked"}>
            <p>Following</p>
            <div></div>
          </button>
        </PostMenu>

        {loading ? (
          <Loading>Loading...</Loading>
        ) : (<>
          {viewAllUsers ? (
            <CommentList>
              {posts.map((post, index) => (
                <CommentItem key={index}>
                  <CommentUser>
                    <button onClick={() => goToProfile(navigate, post.creator.id)}>
                      {post.creator.name}
                    </button>{" "}
                    {post.creator.id !== localStorage.getItem("userId") &&
                      post.isFollowing === false && (
                        <Follow>
                          <button
                            onClick={() => followOrUnfollow(post.creator.id)}
                          >
                            Follow +
                          </button>
                        </Follow>
                      )}
                  </CommentUser>

                  {localStorage.getItem("userId") === post.creator.id && (
                    <div>
                      <Icon>
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          onClick={() => renderPostDetail(post)}
                        />
                      </Icon>
                      {editOpen && (
                        <EditOptions
                          post={selectedPost}
                          changeScreen={changeEditScreen}
                          update={update}
                        />
                      )}
                    </div>
                  )}

                  <CommentTitle>{post.title}</CommentTitle>
                  <VideoContainer>
                    <YouTubeVideo videoUrl={post.link} />
                  </VideoContainer>
                  <CommentContent>{post.content}</CommentContent>
                  <CommentButtons>
                    <LikeDislike>
                      <button
                        onClick={() => likePost(post.id)}
                        className={
                          post.liked === true ? "liked" : "notliked"
                        }
                      >
                        <FontAwesomeIcon icon={faHeart} /> {post.likes}
                      </button>
                    </LikeDislike>
                    <CommentButton onClick={() => toggleComments(post)}>
                      <img src={FaComment} /> {post.commentCount}
                    </CommentButton>
                    {expandedPost === post.id && postOpen && (
                      <PostDetailPage post={post} changeScreen={changeScreen}/>
                    )}
                  </CommentButtons>
                  <Line></Line>
                </CommentItem>
              ))}
              {loadingData && (
                <Loading2>Loading...</Loading2>
              )}
            </CommentList>

          ) : (

            <CommentList>
              {friendsPosts.map((post) => (
                <CommentItem key={post.id}>
                  <CommentUser>
                    <button onClick={() => goToProfile(navigate, post.creator.id)}>
                      {post.creator.name}
                    </button>{" "}
                  </CommentUser>

                  <CommentTitle>{post.title}</CommentTitle>
                  <VideoContainer>
                    <YouTubeVideo videoUrl={post.link} />
                  </VideoContainer>
                  <CommentContent>{post.content}</CommentContent>
                  <CommentButtons>
                    <LikeDislike>
                      <button
                        onClick={() => likePost(post.id)}
                        className={
                          post.liked === true ? "liked" : "notliked"
                        }
                      >
                        <FontAwesomeIcon icon={faHeart} /> {post.likes}
                      </button>
                    </LikeDislike>
                    <CommentButton onClick={() => toggleComments(post)}>
                      <img src={FaComment} /> {post.commentCount}
                    </CommentButton>
                    {expandedPost === post.id && postOpen && (
                      <PostDetailPage post={post} changeScreen={changeScreen} />
                    )}
                  </CommentButtons>
                  <Line></Line>
                </CommentItem>
              ))}
              {loadingData && (
                <Loading2>Loading...</Loading2>
              )}
            </CommentList>
          )}

        </>)}
      </Container>
    </>
  );
};