import React from "react";

const VideoPage = () => {
  return (
    <div>
      <h1>Videos</h1>
      <video controls>
        <source src="/public/videos/vid1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;
