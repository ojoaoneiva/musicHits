import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { goToLoginPage, goToProfile } from "../../router/Coordinator";
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
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);
  const [viewAllUsers, setViewAllUsers] = useState(true);
  const [friendsPosts, setFriendsPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [viewAllUsers, alreadyFollowing]);

  useEffect(() => {
    if (posts.length > 0) {
      const friendsList = posts
        .filter((post) => post.creator.id !== localStorage.getItem("userId"))
        .map((post) => post.creator.id);
      setFriendsPosts(
        posts.filter(
          (post) =>
            friendsList.includes(post.creator.id) && alreadyFollowing
        )
      );
    }
  }, [posts, alreadyFollowing]);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/`, config);
      const postsData = response.data;

      const postsWithCommentCount = await Promise.all(
        postsData.map(async (post) => {
          const commentsResponse = await getComments(post.id);
          const likeResponse = await findLike(post.id);
          const isLiked = likeResponse === "like exist" ? true : false;

          await checkIfAlreadyFollowing(post.creator.id);

          return {
            ...post,
            commentCount: commentsResponse.length,
            liked: isLiked,
          };
        })
      );

      setPosts(postsWithCommentCount);
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkIfAlreadyFollowing = async (creatorId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/followers/${creatorId}`, config);
      const isFollowing = response.data.some(user => user.userIdFollower === localStorage.getItem("userId"));
      setAlreadyFollowing(isFollowing);
    } catch (error) {
      console.log(error.response);
    }
  };

  const followOrUnfollow = async (id) => {
    setAlreadyFollowing(!alreadyFollowing);

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
      await axios.post(`${BASE_URL}/posts/${id}/like`, {}, config);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, liked: true, likes: post.likes + 1 } : post
        )
      );
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
  const [offset, setOffset] = useState(5);
  const [visiblePosts, setVisiblePosts] = useState(10);
  const [visibleComments, setVisibleComments] = useState(5);
  const [scrollThreshold, setScrollThreshold] = useState(600);
  const [debounceDelay, setDebounceDelay] = useState(20);

  useEffect(() => {
    fetchData(0);
  }, []);


  useEffect(() => {
    setVisiblePosts(10);
    setOffset(5)
  }, []);


  useEffect(() => {
    const handleScrollDebounced = debounce(() => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - scrollThreshold
      ) {
        loadMorePosts();
      }
    }, debounceDelay);

    window.addEventListener("scroll", handleScrollDebounced);

    return () => {
      window.removeEventListener("scroll", handleScrollDebounced);
    };
  }, [offset, scrollThreshold, debounceDelay]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleScrollDebounced = debounce(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - scrollThreshold
    )
      loadMorePosts();
  }, debounceDelay);

  const fetchData = async (offsetValue) => {
    try {
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

      if (offsetValue === 0) {
        setPosts(postsWithCommentCount);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postsWithCommentCount]);
      }

      setOffset(offsetValue + 5);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = () => {
    fetchData(offset);
    setVisiblePosts((prevVisible) => prevVisible + 10);
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
              {posts.slice(0, visiblePosts).map((post) => (
                <CommentItem key={post.id}>
                  <CommentUser>
                    <button onClick={() => goToProfile(navigate, post.creator.id)}>
                      {post.creator.name}
                    </button>{" "}
                    {post.creator.id !== localStorage.getItem("userId") &&
                      !alreadyFollowing && (
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
                      <PostDetailPage post={post} changeScreen={changeScreen} />
                    )}
                  </CommentButtons>
                  <Line></Line>
                </CommentItem>
              ))}
            </CommentList>

          ) : (

            <CommentList>
              {friendsPosts.slice(0, visiblePosts).map((post) => (
                <CommentItem key={post.id}>
                  <CommentUser>
                    <button onClick={() => goToProfile(navigate, post.creator.id)}>
                      {post.creator.name}
                    </button>{" "}
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
                    <CommentButton onClick={() => toggleComments(post.id)}>
                      <img src={FaComment} /> {post.commentCount}
                    </CommentButton>
                  </CommentButtons>
                  {expandedPost === post.id && (
                    <div>
                      {comments.slice(0, visibleComments).map((comment) => (
                        <CommentItem key={comment.id}>
                          <CommentUser>{comment.creator.name}</CommentUser>
                          <CommentContent>{comment.content}</CommentContent>
                          <CommentButtons>
                            <LikeDislike>
                              <button
                                onClick={() =>
                                  likeComment(comment.id, post.id)
                                }
                                className={
                                  comment.liked === true
                                    ? "likedComment"
                                    : "notlikedComment"
                                }
                              >
                                <FontAwesomeIcon icon={faHeart} />{" "}
                                {comment.likes}
                              </button>
                            </LikeDislike>
                          </CommentButtons>
                        </CommentItem>
                      ))}
                      <NewCommentContainer>
                        <NewCommentInput
                          placeholder="Adicionar um comentário..."
                          value={newComment}
                          onChange={handleNewCommentChange}
                        />
                        <SolidButton
                          onClick={() => createComment(post.id)}
                        >
                          Responder
                        </SolidButton>
                        <Line></Line>
                      </NewCommentContainer>
                      {visibleComments < comments.length && (
                        <SolidButton onClick={loadMoreComments}>Load More</SolidButton>
                      )}
                    </div>
                  )}
                </CommentItem>
              ))}

            </CommentList>
          )}

        </>)}
      </Container>
    </>
  );
};