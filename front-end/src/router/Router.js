import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LoginPage} from "../Components/LoginPage/LoginPage"
import {SignUpPage} from "../Components/SignUpPage/SignUpPage"
import {Home} from "../Components/Home/Home"
import {Post} from "../Components/Post/Post"
import {Search} from "../Components/Search/Search"
import {Settings} from "../Components/Settings/Settings"
import {Profile} from "../Components/Profile/Profile"
import {Notifications} from "../Components/Notifications/Notifications"
import {PostDetailPage} from "../Components/PostDetailPage/PostDetailPage"

export const Routess = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Login/" element={<LoginPage />} />
        <Route path="/SignUp/" element={<SignUpPage />} />
        <Route path="/" element={<Home/>} />
        <Route path="/Search/" element={<Search/>} />
        <Route path="/Post/" element={<Post/>} />
        <Route path="/Profile/:userId" element={<Profile />} />
        <Route path="/Notifications/" element={<Notifications/>} />
        <Route path="/postDetailPage/:postId" element={<PostDetailPage />} />
        <Route path="/Settings/" element={<Settings/>} />
      </Routes>
    </BrowserRouter>
  );
};