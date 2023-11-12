import { Img } from "./YVStyled3";

const YouTubeVideo3 = ({ link }) => {

  const getVideoIdFromUrl = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  const videoId = getVideoIdFromUrl(link);

  return (
    <div>
      <Img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt="Video Thumbnail"
      />
    </div>
  );
};

export default YouTubeVideo3;