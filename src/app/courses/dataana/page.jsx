import React from "react";

const VideoPage = () => {
  return (
    <div>
      <h1>Videos</h1>
      <iframe
        src="/public/videos/vid1.mp4"
        title="Video Player"
        width="560"
        height="315"
        allowFullScreen
      ></iframe>
      <iframe
        src="/public/videos/vid3.mp4"
        title="Video Player"
        width="560"
        height="315"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPage;
