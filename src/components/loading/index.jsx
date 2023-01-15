import React, { memo } from "react";
import { Spin } from "antd";
import "./index.css";
const Loading = memo(() => {
  return (
    <div className="example">
      <Spin></Spin>
    </div>
  );
});

export default Loading;
