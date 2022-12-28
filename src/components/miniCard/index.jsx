import React, { memo } from "react";
import logo from "@/assets/img/logo.png";
import { Card, Image } from "antd";
const { Meta } = Card;
const MiniCard = memo(() => {
  return (
    <div>
      <Card hoverable style={{ width: 240 }} cover={<Image src={logo} preview={false}></Image>}>
        <Meta title="test1111" description={"just a descitption"}></Meta>
      </Card>
    </div>
  );
});

export default MiniCard;
