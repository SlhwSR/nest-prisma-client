import React, { memo } from "react";
import logo from "@/assets/img/logo.png";
import { Card, Image, message } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined,DeleteOutlined } from '@ant-design/icons';
import {deleteCategory} from '@/service/modules/category'
const { Meta } = Card;
const MiniCard = memo(({ cover, title, description,permission,id,getListCallback }) => {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<Image src={cover} preview={false}></Image>}
        actions={permission?[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <DeleteOutlined key="ellipsis" onClick={()=>{
            deleteCategory(id).then(res=>{
               message.success("删除成功！")
               getListCallback()
            }).catch(err=>{
              message.error(err.response?.data?.message)
            })
          }} />,
        ]:[]}
      >
        <Meta title={title} description={description ? description : ""}></Meta>
      </Card>
    </div>
  );
});

export default MiniCard;
