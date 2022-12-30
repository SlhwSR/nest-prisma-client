import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Row,
  Col,
  Space,
  Button,
  Divider,
  Modal,
  Table,
  message,
} from "antd";
import React, { memo, useEffect, useState } from "react";
import {
  AddOneGroup,
  GetGroupList,
  DeleteOne,
  UpdateOne,
  searchSome,
} from "@/service/modules/group";
import { getPullCategoryList } from "@/service/modules/category";
import { getPersonalInfo } from "@/service/modules/personal";
const GroupManage = memo(() => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [visibile, setVisibile] = useState(false);
  const [visibile2, setVisibile2] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0);
  const [pullList, setPullList] = useState([]);
  const colum = [
    {
      dataIndex: "id",
      title: "序号Id",
    },
    {
      dataIndex: "title",
      title: "标题",
    },
    {
      dataIndex: "content",
      title: "内容",
    },
    {
      title: "操作",
      render: (_, row) => (
        <Space>
          <Button type="primary" onClick={() => eidt(row)}>
            编辑
          </Button>
          <Button type="danger" onClick={() => deleteOne(row.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];
  const deleteOne = (id) => {
    DeleteOne(id).then((res) => {
      message.success("删除成功");
      GetGroupList({ current, pageSize }).then((res) =>
        setDataSource(res.data.data)
      );
    });
  };
  const eidt = (row) => {
    setVisibile2(true);
    formEdit.setFieldValue("title", row.title);
    formEdit.setFieldValue("content", row.content);
    formEdit.setFieldValue("id", row.id);
  };
  const updateOne = () => {
    UpdateOne(formEdit.getFieldsValue()).then((res) => {
      message.success("更新成功");
      GetGroupList({ current, pageSize }).then((res) =>
        setDataSource(res.data.data)
      );
      setVisibile2(false);
    });
  };
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    // AddOneGroup().then(res=>console.log(res))
    GetGroupList({ current, pageSize }).then((res) => {
      setDataSource(res.data.data);
      setTotal(res.data.total);
    });
    getPersonalInfo().then((res) => {
      getPullCategoryList({ id: res.data.id }).then((res) => {
        setPullList(res.data)
      });
    });
  }, []);
  const addOne = () => {
    setVisibile(true);
  };
  const handleData = () => {
    console.log(formEdit.getFieldsValue());
    AddOneGroup({
      title: formEdit.getFieldValue("title"),
      content: formEdit.getFieldValue("content"),
    })
      .then((res) => {
        message.success("创建成功");
        // console.log("---------------------");
        // console.log(res);
        setVisibile(false);
        formEdit.setFieldsValue({
          title: "",
          content: "",
        });
        GetGroupList({ current, pageSize }).then((res) => {
          setDataSource(res.data.data);
          setTotal(res.data.total);
        });
      })
      .catch((error) => {
        // console.log(error?.response?.data?.message);
        message.error(error?.response?.data?.message);
      });
  };
  const handleSearch = (val) => {
    searchSome(val).then((res) => {
      setDataSource(res.data);
      // console.log(res.data);
    });
  };
  return (
    <div>
      <Form form={form} onFinish={handleSearch}>
        <Row gutter={24}>
          <Col span={14}></Col>
          <Col span={6}>
            <Form.Item label="标题" name={"title"}>
              <Input placeholder="请输入名称"></Input>
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button
                onClick={() => {
                  GetGroupList({ current: 1, pageSize: 10 }).then((res) => {
                    setDataSource(res.data.data);
                    setTotal(res.data.total);
                  });
                }}
              >
                重置
              </Button>
              <Button
                type="primary"
                onClick={() => addOne()}
                icon={<PlusOutlined></PlusOutlined>}
              >
                新增
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Divider></Divider>
      <Table
        dataSource={dataSource}
        columns={colum}
        pagination={{
          total,
          showTotal: () => <span>共{total}条</span>,
          showQuickJumper: true,
          showSizeChanger: true,
          onChange: (page, pagesize) => {
            GetGroupList({ current: page, pageSize: pagesize }).then((res) => {
              setPageSize(pagesize);
              setCurrent(current);
              setDataSource(res.data.data);
              setTotal(res.data.total);
            });
          },
        }}
      ></Table>
      <Modal
        open={visibile}
        onCancel={() => {
          formEdit.setFieldsValue({
            title: "",
            content: "",
          });
          setVisibile(false);
        }}
        footer={[
          <Space>
            <Button type="primary" onClick={handleData}>
              提交
            </Button>
            <Button
              onClick={() => {
                formEdit.setFieldsValue({
                  title: "",
                  content: "",
                });
                setVisibile(false);
              }}
            >
              取消
            </Button>
          </Space>,
        ]}
      >
        <Form
          form={formEdit}
          style={{ marginTop: "30px" }}
          onFinish={handleData}
        >
          <Form.Item label="标题" name={"title"}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="内容" name="content">
            <TextArea></TextArea>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={visibile2}
        onCancel={() => setVisibile2(false)}
        footer={[
          <Space>
            <Button type="primary" onClick={() => updateOne()}>
              更新
            </Button>
            <Button onClick={() => setVisibile2(false)}>取消</Button>
          </Space>,
        ]}
      >
        <Form form={formEdit} style={{ marginTop: "30px" }}>
          <Form.Item label="id" name={"id"}>
            <Input disabled={true}></Input>
          </Form.Item>
          <Form.Item label="标题" name={"title"}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="内容" name="content">
            <TextArea></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default GroupManage;
