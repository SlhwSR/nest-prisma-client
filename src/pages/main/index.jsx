import {
  DatePicker,
  Col,
  Image,
  Layout,
  Button,
  Row,
  Avatar,
  Menu,
} from "antd";
import React, { memo, Suspense, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import longLogo from "@/assets/img/longLogo.png";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const { Header, Content, Sider } = Layout;
const Main = memo(() => {
  const navigate = useNavigate();
  const mapList=useSelector((state)=>state.MenuList.mapList)
  useEffect(() => {
    navigate("/index");
  }, []);
  const Controlbread = (item, key, value) => {
    console.log(item + "---" + key + "-----" + value);
    navigate(`/${key}`);
    //setbread(key);
  };
  return (
    <Layout>
      <Header style={{ background: "#fff" }}>
        <Row gutter={24}>
          <Col span={2}>
            <Image
              src={longLogo}
              preview={false}
              width={120}
              className="ml-0"
              height={22}
            ></Image>
          </Col>
          <Col>
            <Button
              //    onClick={() => setCollapsed(!collapsed)}
              type="text"
              size="large"
            >
              {<MenuFoldOutlined />}
            </Button>
          </Col>
          <Col span={20}></Col>
          <Col>
            <Avatar
              alt="用户头像"
              icon={<UserOutlined />}
              style={{ marginLeft: "95%", cursor: "pointer" }}
            ></Avatar>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={200} style={{ overflow: "hidden" }}>
          <Menu
            mode="inline"
            theme={"dark"}
            defaultSelectedKeys={["plan"]}
            defaultOpenKeys={["bed"]}
            style={{
              borderRight: 0,
            }}
            onClick={({ item, key, keypath }) =>
              Controlbread(item, key, keypath)
            }
            items={mapList}
          ></Menu>
        </Sider>
        <Layout
          style={{
            padding: "24px 24px 24px",
            minHeight: "1000px",
          }}
        >
          <Content
            style={{
              padding: "24px 24px",
              minHeight: "780px",
              overflow: "auto",
              backgroundColor: "#fff",
            }}
          >
            <Suspense
              fallback={<h1>loading....</h1>}
              style={{ overflow: "auto" }}
            >
              <Outlet></Outlet>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
});
export default Main;
