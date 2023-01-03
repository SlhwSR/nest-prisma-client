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
  Select,
  Image,
} from "antd";
import React, { memo, useEffect, useState } from "react";
import {
  GetGroupList,
  searchSome,
} from "@/service/modules/group";
import { getPullCategoryList } from "@/service/modules/category";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  AddOneArticle,
  getArticleList,
  updateArticle,
  deleteArticle,
  querySearch
} from "@/service/modules/article";
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
  const [articleId, setArticleId] = useState(0);
  const colum = [
    {
      dataIndex: "id",
      title: "序号Id",
    },
    {
      // dataIndex: "categoryId",
      title: "所属分类",
      render: (_, row, index) => <span>{row?.category?.name}</span>,
    },
    {
      title: "分类封面",
      render: (_, row, index) => <Image src={row?.category?.cover}></Image>,
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
      dataIndex: "createdAt",
      title: "创建时间",
      render: (_, row, index) => (
        <span>{dayjs(row.createdAt).format("YYYY-MM-DD-hh:mm:ss")}</span>
      ),
    },
    {
      dataIndex: "updatedAt",
      title: "更新时间",
      render: (_, row, index) => (
        <span>{dayjs(row.updatedAt).format("YYYY-MM-DD-hh:mm:ss")}</span>
      ),
    },
    {
      title: "操作",
      render: (_, row) => (
        <Space>
          {row.category.userId === info.id ? (
            <>
              <Button type="primary" onClick={() => eidt(row)}>
                编辑
              </Button>
              <Button type="danger" onClick={() => deleteOne(row.id)}>
                删除
              </Button>
            </>
          ) : (
            <Button>查看</Button>
          )}
        </Space>
      ),
    },
  ];
  const deleteOne = (id) => {
    deleteArticle(id).then((res) => {
      message.success("删除成功");
      GetGroupList({ current, pageSize }).then(
        (res) => {
          setDataSource(res.data.data);
          setTotal(res.data.total);
        } // setTotal(res.data.total)
      );
    });
  };
  const eidt = (row) => {
    setVisibile2(true);
    formEdit.setFieldValue("title", row.title);
    formEdit.setFieldValue("content", row.content);
    formEdit.setFieldValue("categoryId", row.categoryId);
    setArticleId(+row.id);
  };
  const updateOne = () => {
    updateArticle({ ...formEdit.getFieldsValue(), id: articleId }).then(
      (res) => {
        message.success("更新成功");
        GetGroupList({ current, pageSize }).then((res) =>
          setDataSource(res.data.data)
        );
        setVisibile2(false);
      }
    );
  };
  const info = useSelector((state) => state.userInfoList.info);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    // AddOneGroup().then(res=>console.log(res))
    GetGroupList({ current, pageSize }).then((res) => {
      setDataSource(res.data.data);
      setTotal(res.data.total);
    });
    getPullCategoryList({ id: info.id }).then((res) => {
      setPullList(res.data);
    });
  }, []);
  const addOne = () => {
    setVisibile(true);
  };
  const handleData = () => {
    console.log(formEdit.getFieldsValue());
    AddOneArticle(formEdit.getFieldsValue())
      .then((res) => {
        message.success("创建成功");
        // console.log("---------------------");
        // console.log(res);
        setVisibile(false);
        formEdit.setFieldsValue({
          title: "",
          content: "",
          categoryId: "",
        });
        getArticleList({ current, pageSize }).then((res) => {
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
    querySearch(val).then((res) => {
      setDataSource(res.data.data);
      setTotal(res.data.total)
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
          <Form.Item label="分类" name={"categoryId"}>
            <Select>
              {(pullList || []).map((item, index) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
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
          <Form.Item label="分类" name={"categoryId"}>
            <Select>
              {(pullList || []).map((item, index) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="标题" name={"title"}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="内容" name="content">
            <TextArea></TextArea>
          </Form.Item>
          {/* {false&& <Form.Item label="文章id"></Form.Item>} */}
        </Form>
      </Modal>
    </div>
  );
});

export default GroupManage;
