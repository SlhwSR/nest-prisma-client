import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoodsList } from "@/store/goodsList";
import { Button, Card } from "antd";
import MiniCard from "../../components/miniCard";
const PlanManage = memo(() => {
  const dispatch = useDispatch();
  const goodsList = useSelector((state) => state.goodsList.goodlist);
  const [someday, setSomeday] = useState([]);
  useEffect(() => {
    dispatch(getGoodsList());
  }, []);
  return (
    <div>
      <Button type="primary" className="float-right">确定</Button>
      <div className="mx-auto flex space-x-4 flex-wrap justify-center space-y-10" style={{width:"700px"}}>
        {[1, 2, 3, 4].map((item, index) => (
          <MiniCard></MiniCard>
        ))}
      </div>
    </div>
  );
});
export default PlanManage;
