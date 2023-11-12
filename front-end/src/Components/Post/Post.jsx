import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useState } from "react";
import {
  Container,
  SolidButton,
  NewCommentContainer,
  Title,
  NewCommentInput,
  Background,
  NewTitleInput,
  Close,
} from "./PostStyled";
import useProtectedPage from "../../hooks/useProtectedPage";

export const Post = ({ createPostOpen, setCreatePostOpen }) => {

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token
    }
  };

  useProtectedPage();

  const [newTitle, setNewTitle] = useState("");
  const [newLink, setNewLink] = useState("");
  const [newContent, setNewContent] = useState("");
  const [linkError, setLinkError] = useState(null);
  const [titleError, setTitleError] = useState(null);

  const createPost = async () => {
    if (!newTitle) {
      setTitleError("Title is required.");
      return;
    }
    if (!newLink) {
      setTitleError("YouTube link is required.");
      return;
    }
    if (!isValidYouTubeLink(newLink)) {
      setLinkError("Please enter a valid YouTube link.");
      return;
    }
    try {
      const body = {
        title: newTitle,
        link: newLink,
        content: newContent
      };
      await axios.post(`${BASE_URL}/posts/`, body, config);
      setNewTitle("");
      setNewLink("");
      setNewContent("");
      setTitleError(null);
      setLinkError(null);
      setCreatePostOpen(!createPostOpen);
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const isValidYouTubeLink = (link) => {
    const youtubeRegExp = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+(&[\w-]+=\w+)*(&[\w-]+=\w+)*$|^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]+$/;
    return youtubeRegExp.test(link);
  };

  const togglePost = () => {
    setTitleError(null);
    setLinkError(null);
    setCreatePostOpen(!createPostOpen);
  };

  const handleNewContentChange = (event) => {
    setNewContent(event.target.value);
  };
  const handleNewTitleChange = (event) => {
    setNewTitle(event.target.value);
    setTitleError(null);
  };
  const handleNewLinkChange = (event) => {
    const link = event.target.value;
    if (!isValidYouTubeLink(link)) {
      setLinkError("Please enter a valid YouTube link.");
    } else {
      setLinkError(null);
    }
    setNewLink(link);
  };

  return (
    <>
      {createPostOpen && (
        <>
          <Container>
            <Title>Share your favorite music videos</Title>
            <Close onClick={togglePost}>x</Close>
            <NewCommentContainer>
              <NewTitleInput
                placeholder="Post title..."
                value={newTitle}
                onChange={handleNewTitleChange}
              />
              {titleError && <p style={{ color: "red" }}>{titleError}</p>}
              <NewTitleInput
                placeholder="YouTube link..."
                value={newLink}
                onChange={handleNewLinkChange}
              />
              {linkError && <p style={{ color: "red" }}>{linkError}</p>}
              <NewCommentInput
                placeholder="Write your post..."
                value={newContent}
                onChange={handleNewContentChange}
              />
              <SolidButton onClick={createPost}>Post</SolidButton>
            </NewCommentContainer>
          </Container>
          <Background></Background>
        </>
      )}
    </>
  );
};