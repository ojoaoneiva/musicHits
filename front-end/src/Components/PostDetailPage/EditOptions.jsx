import { Background, Background2, } from "./PostDetailPageStyled";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useEffect, useState } from "react";
import {
  SolidButton,
  NewCommentContainer,
  NewCommentInput,
  OptionsBox2,
  ContainerEdit,
  Title,
  NewTitleInput,
  Close2,
  DeleteMessage
} from "./PostDetailPageStyled"
import useProtectedPage from "../../hooks/useProtectedPage";

export const EditOptions = ({ post, changeScreen, update }) => {

  useProtectedPage();
  const togglePost = () => {
    changeScreen()
  };

  const [isActionBoxOpen, setIsActionBoxOpen] = useState(true);
  const [editPostOpen, setEditPostOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newLink, setNewLink] = useState(post.link);
  const [newContent, setNewContent] = useState(post.content);
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  useEffect(() => {
    setIsActionBoxOpen(true)
  }, []);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: token
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postId}`, config);
      setIsActionBoxOpen(!isActionBoxOpen)
      setIsPostDeleted(true);
      setTimeout(() => {
        update()
        setIsPostDeleted(false);
      }, 1500);

    } catch (error) {
      console.log(error.response);
    }
  };

  const editPost = async (id) => {
    try {
      const body = {
        title: newTitle || "",
        link: newLink || "",
        content: newContent || ""
      }
      await axios.put(`${BASE_URL}/posts/${id}`, body, config);
      setEditPostOpen(!editPostOpen)
      update()
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const editPostBox = () => {
    setEditPostOpen(!editPostOpen)
    setIsActionBoxOpen(!isActionBoxOpen)
  };

  const editPostBoxClose = () => {
    setEditPostOpen(!editPostOpen)
    setIsActionBoxOpen(false)
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

  return (
    <>
      {isPostDeleted && (
        <>
          <Background />
          <DeleteMessage>
            post deleted!
          </DeleteMessage>
        </>
      )}
      <div>
        {isActionBoxOpen && (
          <>
            <Background2 />
            <OptionsBox2>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              <button onClick={editPostBox}>Edit</button>
              <button onClick={togglePost}>cancel</button>
            </OptionsBox2>
          </>
        )}
      </div>

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
                placeholder="Write your post..."
                value={newContent}
                onChange={handleNewContentChange}
              />
              <SolidButton onClick={() => editPost(post.id)}>Post</SolidButton>

            </NewCommentContainer>
          </ContainerEdit>
          <Background></Background>
        </>
      )}
    </>
  )
}