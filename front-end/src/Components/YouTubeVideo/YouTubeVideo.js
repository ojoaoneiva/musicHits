import React, { useState } from "react";
import { Iframe, Img, StyledPlayButton } from "./YVStyled";
import { FaPlay } from 'react-icons/fa';

const YouTubeVideo = ({ videoUrl }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videoId = getVideoIdFromUrl(videoUrl);

  const playVideo = () => {
    setVideoLoaded(true);
  };

  return (
    <div>
      {videoLoaded ? (
        <Iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        >
        </Iframe>
      ) : (
        <>
          <Img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video Thumbnail"
            onClick={playVideo}
          />
          <StyledPlayButton onClick={playVideo}>
            <FaPlay />
          </StyledPlayButton>
        </>
      )}
    </div>
  );
};

const getVideoIdFromUrl = (url) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("v");
};

export default YouTubeVideo;