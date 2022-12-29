import React, { memo } from "react";
import logo from "@/assets/img/logo.png";
import { Card, Image } from "antd";
const { Meta } = Card;
const MiniCard = memo(({ cover, title }) => {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<Image src={cover} preview={false}></Image>}
      >
        <Meta title={title} description={"just a descitption"}></Meta>
      </Card>
    </div>
  );
});
 
export default MiniCard;
