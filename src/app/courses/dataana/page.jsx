import React from "react";

const VideoPage = () => {
  return (
    <div>
      <h1>Videos</h1>
      <video controls width="560" height="315">
        <source
          src="https://github.com/Meet5703/TESTDATA/blob/main/public/videos/vid1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <video controls width="560" height="315">
        <source src="/videos/vid3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video controls width="560" height="315">
        <source src="/videos/234.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;
