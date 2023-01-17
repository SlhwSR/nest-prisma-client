import React, { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Video from "../../components/video";

const VideoDetail = memo(() => {
  const {
    state: { createdAt, poster, updatedAt, url },
  } = useLocation();
  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <div className="ml-96">
      {/* <video src={url} autoPlay loop></video> */}
      <Video url={url} poster={poster}></Video>
    </div>
  );
});

export default VideoDetail;
