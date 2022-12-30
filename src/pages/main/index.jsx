import {
  DatePicker,
  Col,
  Image,
  Layout,
  Button,
  Row,
  Avatar,
  Menu,
  Popover,
  List,
  Space,
} from "antd";
import React, { memo, Suspense, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import longLogo from "@/assets/img/longLogo.png";
import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getPersonalInfo } from "@/service/modules/personal";
import { useState } from "react";
const { Header, Content, Sider } = Layout;
const Main = memo(() => {
  const navigate = useNavigate();
  const mapList = useSelector((state) => state.MenuList.mapList);
  const [info, setInfo] = useState();
  useEffect(() => {
    navigate("/index");
    getPersonalInfo().then((res) => {
      // console.log("email");
      // console.log(res.data?.email);
      setInfo(res.data);
    });
  }, []);
  const Controlbread = (item, key, value) => {
    console.log(item + "---" + key + "-----" + value);
    navigate(`/${key}`);
    //setbread(key);
  };
  const quitLogin = () => {
    window.localStorage.removeItem("blog-token");
    navigate("/login", { replace: "/login" });
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
          <Col span={18}></Col>
          <Col className="ml-7">
            <Space size={"small"}>
              <span className="-mr-8">{info?.email}</span>
              <Popover
                content={
                  <List>
                    <List.Item>
                      <span className="cursor-pointer" onClick={()=>navigate("/personal",{state:{personalId:info.id}})}>个人中心</span>
                    </List.Item>
                    <List.Item>
                      <span
                        className="cursor-pointer"
                        onClick={() => quitLogin()}
                      >
                        退出登录
                      </span>
                    </List.Item>
                  </List>
                }
              >
                <Avatar
                  alt="用户头像"
                  icon={<UserOutlined />}
                  style={{ marginLeft: "95%", cursor: "pointer" }}
                ></Avatar>
              </Popover>
            </Space>
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
