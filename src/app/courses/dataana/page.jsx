import React from "react";

const VideoPage = () => {
  return (
    <div>
      <h1>Videos</h1>

      <video controls controlsList="nodownload" width="640" height="360">
        <source src="/videos/vid3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;
