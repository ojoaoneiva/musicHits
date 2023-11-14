import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
import React, { useState, useEffect } from 'react';
import useProtectedPage from "../../hooks/useProtectedPage";
import { Container, Input } from './SearchStyled'
import { goToProfile } from "../../router/Coordinator";

export const Search = ({setSearchOpen, closeAll, toggleMenu, searchOpen}) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token
    }
  };
  useProtectedPage();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/`, config);
      const usersData = response.data;
      setUsers(usersData);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const results = users.filter((user) =>
        user.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const profile = async (id) => {
    goToProfile(navigate, id)
    setSearchOpen(!searchOpen);
    toggleMenu();
    closeAll()
  };

  return (
    <>
      <Container>
        <h1>Search</h1>
        <Input
          type="text"
          placeholder="Search for user's name"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <ul>
          {searchResults.map((user) => (
            <li key={user.id}>
              <button onClick={()=>profile(user.id)}>
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};