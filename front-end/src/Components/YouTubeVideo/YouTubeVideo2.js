import React, { useState } from "react";
import { Img } from "./YVStyled2";
import { PostDetailPage } from "../PostDetailPage/PostDetailPage";

const YouTubeVideo2 = ({ post }) => {
const [postOpen, setPostOpen] = useState(false);
const changeScreen = () => { setPostOpen(!postOpen) }
  
  const renderPostDetail = () => {
    setPostOpen(true);
  };

const getVideoIdFromUrl = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
};

  const videoId = getVideoIdFromUrl(post.link);

  return (
    <div>
      {postOpen ? (
        <>
        <PostDetailPage post={post} changeScreen={changeScreen}/>
        <Img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video Thumbnail"
          />
          </>
      ) : (
          <Img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video Thumbnail"
            onClick={renderPostDetail}
          />
      )}
    </div>
  );
};

export default YouTubeVideo2;