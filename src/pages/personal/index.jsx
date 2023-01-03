import React, { memo } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserCategoryDetail, getUserArticle } from "@/service/modules/user";
import { useState } from "react";
import { Tabs } from "antd";
import MiniCard from "../../components/miniCard";
const { TabPane } = Tabs;
const Personal = memo(() => {
  const [categoryList, setCategoryList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const location = useLocation();
  const getCategoryList = () => {
    getUserCategoryDetail({ id: location.state.personalId }).then((res) => {
      // console.log(res.data.category);
      setCategoryList(res.data.category);
      // console.log(res.data);
    });
  };
  const getArticleList = () => {
    getUserArticle(location.state.personalId).then((res) => {
      // console.log(res.data.data);
      setArticleList(res.data.data);
    });
  };
  useEffect(() => {
    console.log("---参数");
    console.log(location.state);
    getCategoryList();
  }, []);
  const changeTab = (val) => {
    if (val === 1) {
      getCategoryList();
    } else {
      getArticleList();
    }
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={changeTab}
        className="w-full"
        items={[
          {
            label: "我创建的分类",
            key: "1",
            children: (categoryList || []).map((item) => (
              <div className="w-full flex flex-nowrap flex-col">
                <MiniCard cover={item.cover} title={item.name}></MiniCard>
              </div>
            )),
          },
          {
            label: "我创建的文章",
            key: "2",
            children: (articleList || []).map((item, index) => (
              <MiniCard cover={item.category?.cover} title={item.title} description={item.content}></MiniCard>
            )),
          },
        ]}
      ></Tabs>
    </div>
  );
});

export default Personal;
