import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import { useEffect, useState } from "react";
import {
  Container,
  NewCommentContainer,
  Title,
  NewCommentInput,
  Background,
  NewTitleInput,
  Close,
} from "./SettingsStyled";
import { SolidButton } from "../PostDetailPage/PostDetailPageStyled"
import useProtectedPage from "../../hooks/useProtectedPage";

export const Settings = ({ user, changeScreen, update }) => {

  const [newName, setNewName] = useState(user.name);
  const [newBio, setNewBio] = useState(user.bio);
  const [newProfilePhoto, setNewProfilePhoto] = useState(user.profilePhoto);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [isActionBoxOpen, setIsActionBoxOpen] = useState(true);

  useEffect(() => {
    setIsActionBoxOpen(true)
  }, []);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  useProtectedPage();

  const editUser = async (id) => {
    try {
      const body = {
        name: newName || "",
        bio: newBio || "",
        profilePhoto: newProfilePhoto || ""
      }
      await axios.put(`${BASE_URL}/users/`, body, config);
      setSettingsOpen(!settingsOpen)
      update()
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const editPostBoxClose = () => {
    setSettingsOpen(!settingsOpen)
    setIsActionBoxOpen(false)
  };
  const handleNewContentChange = (event) => {
    setNewProfilePhoto(event.target.value);
  };
  const handleNewTitleChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNewLinkChange = (event) => {
    setNewBio(event.target.value);
  };

  return (
    <>
      {settingsOpen && (
        <>
          <Container>
            <Title>Profile Settings</Title>
            <Close onClick={editPostBoxClose}>x</Close>
            <NewCommentContainer>
              <NewTitleInput
                placeholder="Post title..."
                value={newName}
                onChange={handleNewTitleChange}
              />
              <NewTitleInput
                placeholder="Youtube link..."
                value={newBio}
                onChange={handleNewLinkChange}
              />
              <NewCommentInput
                placeholder="url to your new profile picture"
                value={newProfilePhoto}
                onChange={handleNewContentChange}
              />
              <SolidButton onClick={() => editUser(user.id)}>Post</SolidButton>
            </NewCommentContainer>
          </Container>
          <Background></Background>
        </>
      )}
    </>
  );
};