import React, { memo } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getUserCategoryDetail } from "@/service/modules/user";
import { useState } from "react";
import { Tabs } from "antd";
import MiniCard from "../../components/miniCard";
const { TabPane } = Tabs;
const Personal = memo(() => {
  const [categoryList, setCategoryList] = useState([]);
  const location = useLocation();
  useEffect(() => {
    getUserCategoryDetail({ id: location.state.personalId }).then((res) => {
      console.log(res.data.category);
      setCategoryList(res.data.category);
      // console.log(res.data);
    });
  }, []);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "我创建的分类",
            key: "1",
            children: (categoryList || []).map((item) => (
              <div className="flex flex-shrink-0 flex-nowrap flex-col">
                <MiniCard cover={item.cover} title={item.name}></MiniCard>
              </div>
            )),
          },
          {
            label: "我创建的文章",
            key: "2",
            children: 1,
          },
        ]}
      ></Tabs>
    </div>
  );
});

export default Personal;
