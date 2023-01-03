import React, { memo } from "react";
import logo from "@/assets/img/logo.png";
import { Card, Image } from "antd";
const { Meta } = Card;
const MiniCard = memo(({ cover, title, description }) => {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<Image src={cover} preview={false}></Image>}
      >
        <Meta title={title} description={description ? description : ""}></Meta>
      </Card>
    </div>
  );
});

export default MiniCard;
