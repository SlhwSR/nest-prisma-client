import { Descriptions } from "antd";
import React, { memo, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ArticleDetail = memo(() => {
  const location = useLocation();
  useEffect(()=>{
   console.log(location.state);
  },[])
  return <div>
    <Descriptions title={location.state?.detail?.title}>
        <Descriptions.Item label={"所属分类"}>{location.state.detail?.category.name}</Descriptions.Item>
    </Descriptions>
    <div dangerouslySetInnerHTML={{__html:location.state.detail?.content}}></div>
  </div>;
});

export default ArticleDetail;
