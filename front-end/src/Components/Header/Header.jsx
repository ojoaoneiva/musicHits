import { HeaderStyle, MobileButton, Close } from './HeaderStyled';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { goToHome, goToProfile, goToLoginPage } from "../../router/Coordinator";
import { Search } from '../Search/Search';
import { Notifications } from '../Notifications/Notifications';
import { Post } from '../Post/Post';
import useProtectedPage from '../../hooks/useProtectedPage';

export const Header = () => {
    const navigate = useNavigate();
    useProtectedPage();

    const [menuopen, setMenuopen] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [createPostOpen, setCreatePostOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [mobilemenuopen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuopen(!menuopen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobilemenuopen);
    };

    const closeMenu = () => {
        toggleMenu()
        setSearchOpen(false);
        setNotificationsOpen(false)
    };

    const toggleSearch = () => {
        toggleMenu()
        setSearchOpen(!searchOpen);
    };

    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        toggleMenu();
    };

    const toggleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        goToLoginPage(navigate)
    };

    const togglePost = () => {
        setCreatePostOpen(true);
    };

    const toggleProfile = () => {
        goToProfile(navigate, localStorage.getItem("userId"))
        setMobileMenuOpen(false);
    };

    const toggleHome = () => {
        goToHome(navigate)
        setMobileMenuOpen(false);
    };

    return (
        <>
            <MobileButton onClick={toggleMobileMenu} menuopen={menuopen.toString()}>Menu</MobileButton>
            <HeaderStyle menuopen={menuopen.toString()} mobilemenuopen={mobilemenuopen.toString()}>
            <Close className="close" menuopen={menuopen.toString()} onClick={toggleMobileMenu}>X</Close>

                <div className="navbar">
                    {!menuopen && (<>

                        <div className="menu-icon" onClick={closeMenu}>
                            Menu
                        </div>
                    </>
                    )}

                    {menuopen && (
                        <div className="menu">
                            <ul className="ul">
                                <li className="li">
                                    <button onClick={toggleHome}>Home</button>
                                </li>
                                <li className="li">
                                    <button onClick={toggleSearch}>Search</button>
                                </li>
                                <li className="li">
                                    <button onClick={toggleNotifications}>Notifications</button>
                                </li>
                                <li className="li">
                                    <button onClick={togglePost}>Post</button>
                                </li>
                                <li className="li">
                                    <button onClick={toggleProfile}>Profile</button>
                                </li>

                                <li className="li">
                                    <button onClick={toggleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                    {notificationsOpen && <Notifications/>}
                    {searchOpen && <Search />}
                    {createPostOpen && <Post createPostOpen={createPostOpen} setCreatePostOpen={setCreatePostOpen} />}

                </div>
            </HeaderStyle>
        </>
    )
}