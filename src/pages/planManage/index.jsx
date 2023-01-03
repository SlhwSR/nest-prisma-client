import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoodsList } from "@/store/goodsList";
import { Button, Card, Form, Input, Modal, Upload, Image, message } from "antd";
import MiniCard from "../../components/miniCard";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AddOneCategory, getCategoryList } from "@/service/modules/category";
import { getPersonalInfo } from "@/service/modules/personal";
const PlanManage = memo(() => {
  const dispatch = useDispatch();
  const [someday, setSomeday] = useState([]);
  const [form] = Form.useForm();
  const [visibile, setVisibile] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getPersonalInfo().then((res) => {
      setId(res.data?.id);
      // getUserDetail({id:res.data.id}).then(res=>{
      //   console.log(res);
      // })
    });
    getCategoryList().then((res) => {
      setList(res.data.data);
      setTotal(res.data.total);
    });
  }, []);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const uploadConfig = {
    name: "file",
    action: "http://localhost:3000/upload/image",
    headers: {
      authorization:
        "Bearer " +
        window.localStorage.getItem("blog-token").split('"').join(""),
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name}` + "上传成功");
        console.log("--------------------------");
        const result =
          "http://localhost:3000/uploads/" + info.file.response.filename;
        setImageUrl(result);
        // const url=info.response.d
      } else if (info.file.status === "error") {
        message.error("上传失败");
      }
    },
    showUploadList: false,
    listType: "picture-card",
  };
  const handleCategory = () => {
    AddOneCategory({
      name: form.getFieldValue("name"),
      cover: imageUrl,
      userId: id,
    }).then((res) => {
      message.success("新增成功！");
      setVisibile(false);
      getCategoryList().then((res) => {
        setList(res.data.data);
        setTotal(res.data.total);
      });
    });
  };
  return (
    <div>
      <Button
        type="primary"
        className="float-right"
        onClick={() => setVisibile(true)}
      >
        添加分类
      </Button>
      <div
        className="mx-auto flex space-x-4 flex-wrap justify-center space-y-10"
        style={{ width: "700px" }}
      >
        {(list || []).map((item, index) => (
          <MiniCard cover={item.cover} title={item.name} description={"作者:"+item?.user?.email}></MiniCard>
        ))}
      </div>
      <Modal
        open={visibile}
        onCancel={() => setVisibile(false)}
        onOk={handleCategory}
      >
        <Form form={form} className="mt-7">
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ message: "封面必传!", required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="分类封面"
            name={"cover"}
            rules={[{ message: "封面必传!", required: true }]}
          >
            <Upload {...uploadConfig}>
              {imageUrl ? <Image src={imageUrl}></Image> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
export default PlanManage;
