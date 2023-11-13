import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import FaComment from "../../assets/comment.svg";
import YouTubeVideo from "../YouTubeVideo/YouTubeVideo";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import {
  CommentContent,
  CommentButtons,
  CommentButton,
  SolidButton,
  SolidButton2,
  NewCommentContainer,
  NewCommentInput,
  LikeDislike,
  CommentUser,
  VideoContainer,
  CommentTitle,
  Close,
  OptionsBox,
  Icon,
  ContainerEdit,
  Title,
  NewTitleInput,
  Close2,
  Post,
  Background,
  Container
} from "./PostDetailPageStyled";
import useProtectedPage from "../../hooks/useProtectedPage";

export const PostDetailPage = ({ post, changeScreen }) => {

  const togglePost = () => {
    changeScreen();
  };

  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [isActionBoxOpen, setIsActionBoxOpen] = useState(false);
  const [editPostOpen, setEditPostOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newLink, setNewLink] = useState(post.link);
  const [newContent, setNewContent] = useState(post.content);
  const [liked, setLiked] = useState(false);
  const [commentsData, setCommentsData] = useState({ comments: [], commentCount: 0 });
  const [autoLoadComments, setAutoLoadComments] = useState(true);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  useProtectedPage();

  useEffect(() => {
    findLike(post.id)
    if (autoLoadComments) {
      toggleComments(post.id)
      setAutoLoadComments(false)
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsResponse = await getComments(post.id);
      setCommentsData(commentsResponse);
    };
    fetchComments();
  }, [post.id]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`, config);
      window.location.reload();
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const editPost = async (id) => {
    try {
      const body = {
        title: newTitle || "",
        link: newLink || "",
        content: newContent || ""
      };
      await axios.put(`${BASE_URL}/posts/${id}`, body, config);
      setEditPostOpen(!editPostOpen);
      window.location.reload();
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const findCommentLike = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}/like`, config);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const likePost = async (id) => {
    try {
      const response = await axios.post(`${BASE_URL}/posts/${id}/like`, {}, config);
      findLike(post.id)
      setLikes(response.data.likes)
    } catch (error) {
      console.log(error.response);
    }
  };

  const findLike = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}/like`, config);
      if (response.data === "like exist") {
        setLiked(true)
      } else {
        setLiked(false)
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getComments = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${id}`, config);
      setComments(response.data);
      const commentsData = response.data;

      const commentsWithLikes = await Promise.all(
        commentsData.map(async (comment) => {
          const likeResponse = await findCommentLike(comment.id);
          const isLiked = likeResponse === "like exist" ? true : false;

          return {
            ...comment,
            liked: isLiked
          };
        })
      );
      setComments(commentsWithLikes);
      return {
        comments: commentsWithLikes,
        commentCount: commentsData.length
      };
    } catch (error) {
      console.log(error.response);
      return {
        comments: [],
        commentCount: 0
      };
    }
  };

  const createComment = async (id) => {
    try {
      const body = {
        content: newComment
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
      await axios.post(`${BASE_URL}/comments/${id}/like`, {}, config);
      getComments(postId);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const toggleComments = async (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
      setComments([]);
    } else {
      setExpandedPostId(postId);
      getComments(postId);
    }
  };

  const editPostBox = () => {
    setEditPostOpen(!editPostOpen);
    setIsActionBoxOpen(!isActionBoxOpen);
  };

  const editPostBoxClose = () => {
    setEditPostOpen(!editPostOpen);
    setIsActionBoxOpen(false);
  };
  const handleNewContentChange = (event) => {
    setNewContent(event.target.value);
  };
  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleNewLinkChange = (event) => {
    setNewLink(event.target.value);
  };

  const [visibleComments, setVisibleComments] = useState(5);

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 5);
  };

  return (
    <>
      <Background />
      <Container>
        <Post>
          <Close onClick={togglePost}>Close</Close>

          {localStorage.getItem("userId") === post.creator.id && (
            <div>
              <Icon>
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  onClick={() => setIsActionBoxOpen(!isActionBoxOpen)}
                />
              </Icon>
              {isActionBoxOpen && (
                <>
                  <Background />
                  <OptionsBox>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                    <button onClick={editPostBox}>Edit</button>
                    <button onClick={() => setIsActionBoxOpen(!isActionBoxOpen)}>
                      cancel
                    </button>
                  </OptionsBox>
                </>
              )}
            </div>
          )}

          <CommentUser>Posted by: {post.creator.name}</CommentUser>
          <CommentTitle>{post.title}</CommentTitle>
          <VideoContainer>
            <YouTubeVideo videoUrl={post.link} />
          </VideoContainer>
          <CommentContent>{post.content}</CommentContent>

          <CommentButtons>
            <LikeDislike>
              <button
                onClick={() => likePost(post.id)}
                className={liked ? "liked" : "notliked"}
              >
                <FontAwesomeIcon icon={faHeart} />
                {likes}
              </button>
            </LikeDislike>
            <CommentButton onClick={() => toggleComments(post.id)}>
              <img src={FaComment} /> {commentsData.commentCount}
            </CommentButton>
          </CommentButtons>

          {expandedPostId === post.id && (
            <div>
              {comments.slice(0, visibleComments).map((comment) => (
                <>
                  <CommentUser>{comment.creator.name}</CommentUser>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentButtons>
                    <LikeDislike>
                      <button
                        onClick={() => likeComment(comment.id, post.id)}
                        className={comment.liked ? "liked" : "notliked"}
                      >
                        <FontAwesomeIcon icon={faHeart} /> {comment.likes}
                      </button>
                    </LikeDislike>
                  </CommentButtons>
                </>
              ))}
              {visibleComments < comments.length && (
                <SolidButton2 onClick={loadMoreComments}>Show more</SolidButton2>
              )}
              <NewCommentContainer>
                <NewCommentInput
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={handleNewCommentChange}
                />
                <SolidButton onClick={() => createComment(post.id)}>
                  Comment
                </SolidButton>
              </NewCommentContainer>
            </div>
          )}

          {editPostOpen && (
            <>
              <ContainerEdit>
                <Title>Share your favorite music videos</Title>
                <Close2 onClick={editPostBoxClose}>x</Close2>
                <NewCommentContainer>
                  <NewTitleInput
                    placeholder="Post title..."
                    value={newTitle}
                    onChange={handleNewTitleChange}
                  />
                  <NewTitleInput
                    placeholder="Youtube link..."
                    value={newLink}
                    onChange={handleNewLinkChange}
                  />
                  <NewCommentInput
                    placeholder="Write a post..."
                    value={newContent}
                    onChange={handleNewContentChange}
                  />
                  <SolidButton onClick={() => editPost(post.id)}>Post</SolidButton>
                </NewCommentContainer>
              </ContainerEdit>
              <Background></Background>
            </>
          )}
          
        </Post>
      </Container>
    </>
  );
};