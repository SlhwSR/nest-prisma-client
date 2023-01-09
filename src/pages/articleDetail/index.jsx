import {
  Descriptions,
  Tooltip,
  Avatar,
  Input,
  Form,
  Button,
  Col,
  Space,
} from "antd";
import React, { memo, useEffect, useState, createElement } from "react";
import { useLocation } from "react-router-dom";
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Comment } from "@ant-design/compatible";
const { TextArea } = Input;
const ArticleDetail = memo(() => {
  const location = useLocation();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [value, setValue] = useState("");
  const info = useSelector((state) => state.userInfoList.info);
  useEffect(() => {
    console.log(location.state);
  }, []);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };
  const handleComment = () => {
    console.log(value);
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    console.log(value);
  };
  return (
    <div>
      <Descriptions title={location.state?.detail?.title}>
        <Descriptions.Item label={"所属分类"}>
          {location.state.detail?.category.name}
        </Descriptions.Item>
      </Descriptions>
      <div
        dangerouslySetInnerHTML={{ __html: location.state.detail?.content }}
      ></div>
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        }
        datetime={
          <Tooltip title="2016-11-22 11:22:33">
            <span>8 hours ago</span>
          </Tooltip>
        }
      />
      {/* <div className="absolute bottom-0"> */}
      <Comment
        avatar={<Avatar src={info.avatar} alt={info.email} />}
        content={
          // <Editor
          //   onChange={handleChange}
          //   onSubmit={handleSubmit}
          //   // submitting={submitting}
          //   value={value}
          // />
          <Col span={24}>
            <Space className="w-full">
              <TextArea
                value={value}
                style={{ width: "1280px", height: "100px" }}
                onChange={(e) => setValue(e.target.value)}
              ></TextArea>
              <Button type="primary" onClick={handleComment}>
                提交
              </Button>
            </Space>
          </Col>
        }
      />
    </div>
  );
});

export default ArticleDetail;
